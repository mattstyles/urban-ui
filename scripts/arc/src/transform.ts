import type { Options, Output as SwcOutput } from "@swc/core";
import type { Plugin } from "./configs/plugins";
import type { PipelineContext } from "./transform/context.ts";
import type { TaskInputParameters, TaskReturnType } from "./transform/task.ts";

import fs from "node:fs/promises";
import path from "node:path";
import { PerformanceObserver, performance } from "node:perf_hooks";
import { promisify } from "node:util";
import zlib from "node:zlib";
import swc from "@swc/core";
import chalk from "chalk";

import { jscOps } from "./configs/jsc.ts";
import { minify } from "./configs/minify.ts";
import { transformImports } from "./configs/plugins.ts";
import { createDebugger, log } from "./log";
import { traceFn } from "./trace.ts";
import { fileEvents, measure } from "./transform/analytics.ts";
import { Pipeline } from "./transform/pipeline.ts";
import { createTask } from "./transform/task.ts";

const gzip = promisify(zlib.gzip);
const debug = createDebugger("rk::transform");

type TransformContext = {
	outDir: string;
	rootDir: string;
};

/**
 * Reads the input files, maps to cjs and esm formats, writes code and map files to output directory with correct extensions.
 */
export async function transformFiles(
	files: Array<string>,
	options: {
		outDir: string;
		rootDir: string;
	},
) {
	const pipeline = new Pipeline<
		TransformContext,
		TaskInputParameters<typeof parse>,
		TaskReturnType<typeof write>
	>("transform", {
		outDir: options.outDir,
		rootDir: options.rootDir,
	});
	pipeline.addStep(parse);
	pipeline.addStep(compile);
	pipeline.addStep(write);

	// Add file tracker
	for (const filepath of files) {
		pipeline.ctx.ftrace.register(filepath);
	}

	log.transform("Starting transform pipeline");
	debug("Running transform pipeline");
	const output = await pipeline.run({ files });

	log.transform(chalk.green("✔︎"), "Completed transform pipeline");
	// Generate pipeline analytics
	return pipeline.generateStatistics();
}

const parse = createTask(
	"parse",
	async (ctx, { files }: { files: Array<string> }) => {
		const measurement = measure(fileEvents.parse);
		return await Promise.all(
			files.map((filepath) => {
				ctx.ftrace.getTrace(filepath).track(measurement.start);
				const file = readFile(filepath);
				ctx.ftrace.getTrace(filepath).track(measurement.end);
				return file;
			}),
		);
	},
);

const compile = createTask(
	"compile",
	async (ctx, files: Awaited<TaskReturnType<typeof parse>>) => {
		const mCompile = measure(fileEvents.compile);
		/**
		 * Attempting to run in parallel (for what is probably a synchronous task) nukes individual timings
		 */
		return await Promise.all(
			files.map(async ({ file, filepath }) => {
				log.transform(`Compiling ${chalk.magenta(filepath)}`);
				debug("Compiling", filepath);
				ctx.ftrace.getTrace(filepath).track(mCompile.start);

				const codeBlocks = await Promise.all([
					traceFn(
						fileEvents["compile::esm"],
						ctx.ftrace.getTrace(filepath),
						async () => {
							return await transformFile({
								code: file,
								filename: filepath,
								overrides: {
									module: {
										type: "es6",
									},
								},
								plugins: [transformImports("js")],
							});
						},
					),
					traceFn(
						fileEvents["compile::cjs"],
						ctx.ftrace.getTrace(filepath),
						async () => {
							return await transformFile({
								code: file,
								filename: filepath,
								overrides: {
									module: {
										type: "commonjs",
									},
								},
								plugins: [transformImports("cjs")],
							});
						},
					),
				]);

				ctx.ftrace.getTrace(filepath).track(mCompile.end);

				return {
					filepath: filepath,
					files: {
						esm: codeBlocks[0],
						cjs: codeBlocks[1],
					},
				};
			}),
		);
	},
);

const write = createTask(
	"write",
	async (
		ctx: PipelineContext<TransformContext>,
		files: Awaited<TaskReturnType<typeof compile>>,
	) => {
		if (!(await fs.exists(ctx.outDir))) {
			await fs.mkdir(ctx.outDir as string);
		}

		const measurement = measure(fileEvents.write);

		await Promise.all(
			files.map(async ({ filepath, files }) => {
				const esmFilepath = generateOutputPath(files.esm.filepath, "js", {
					strip: ctx.rootDir,
					outDir: ctx.outDir,
				});

				const cjsFilepath = generateOutputPath(files.cjs.filepath, "cjs", {
					strip: ctx.rootDir,
					outDir: ctx.outDir,
				});

				ctx.ftrace.getTrace(filepath).track(measurement.start);
				await Promise.all([
					pipe(
						async () => await writeFile(esmFilepath, files.esm.code),
						async (opts) => {
							ctx.ftrace.getSizes(filepath).esm = opts.size;
							return opts;
						},
					),
					files.esm.map &&
						pipe(
							async () =>
								await writeFile(`${esmFilepath}.map`, files.esm.map as string),
							async (file) => {
								ctx.ftrace.getSizes(filepath)["esm::map"] = file.size;
								return file;
							},
						),
					pipe(
						async () => await writeFile(cjsFilepath, files.cjs.code),
						async (opts) => {
							ctx.ftrace.getSizes(filepath).cjs = opts.size;
							return opts;
						},
					),
					files.cjs.map &&
						pipe(
							async () =>
								await writeFile(`${cjsFilepath}.map`, files.cjs.map as string),
							async (file) => {
								ctx.ftrace.getSizes(filepath)["cjs::map"] = file.size;
								return file;
							},
						),
				]);
				ctx.ftrace.getTrace(filepath).track(measurement.end);
			}),
		);

		return files;
	},
);

async function pipe<A, B>(
	fn: () => Promise<A>,
	fn2: (a: Awaited<A>) => B,
): Promise<B> {
	const value = await fn();
	return await fn2(value);
}

async function readFile(filepath: string) {
	const file = Bun.file(filepath);
	const content = await file.text();
	return {
		file: content,
		filepath: filepath,
	};
}

async function writeFile(filepath: string, content: string) {
	const bytes = await Bun.write(filepath, content);
	debug("Writing file:", filepath, bytes);

	// gzip is not free, increases time by ~50%.
	// @TODO add option to output gzipped weight.
	// const l = await gzip(Buffer.from(content))
	return {
		filepath: filepath,
		size: bytes,
	};
}

function generateOutputPath(
	filepath: string,
	ext: string,
	opts: {
		strip: string;
		outDir: string;
	},
): string {
	const strippedFilepath = stripFilepath(filepath, opts.strip);
	const baseFilename = path.basename(
		strippedFilepath,
		path.extname(strippedFilepath),
	);
	return path.format({
		name: baseFilename,
		ext: ext,
		dir: path.join(opts.outDir, path.dirname(strippedFilepath)),
	});
}

function stripFilepath(filepath: string, strip: string) {
	return path.relative(strip, filepath);
}

type TransformFileOpts = {
	code: string;
	filename: string;
	overrides?: Partial<Options>;
	plugins?: Array<Plugin>;
};
type TransformFileOutput = SwcOutput & {
	filepath: string;
};
async function transformFile({
	code,
	filename,
	overrides = {},
	plugins = [],
}: TransformFileOpts): Promise<TransformFileOutput> {
	const output = await swc.transform(code, {
		filename,
		module: {
			type: "es6",
		},
		isModule: true,
		sourceMaps: true,
		minify: true,
		jsc: {
			...jscOps,
			minify,
			experimental: {
				plugins: plugins,
			},
		},
		...overrides,
	});

	return {
		filepath: filename,
		code: output.code,
		map: output.map,
	};
}