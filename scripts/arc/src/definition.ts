import type { TaskInputParameters, TaskReturnType } from "./transform/task.ts";

import path from "node:path";
import chalk from "chalk";
import { parse } from "tsconfck";
import ts from "typescript";

import { createDebugger, log } from "./log";
import { Pipeline } from "./transform/pipeline.ts";
import { createTask } from "./transform/task.ts";

const debug = createDebugger("rk::definition");

type FilesDts = Record<string, string>;

/**
 * Grabs the tsconfig file and writes ts definition files to disk
 */
export async function generateDefinitions(
	/**
	 * @TODO a single entrypoint is faster, add config item to be able to specify a different set of entrypoints for dts than for compilation phase
	 */
	files: Array<string>,
	options: {
		outDir: string;
	},
) {
	const pipeline = new Pipeline<
		// biome-ignore lint/suspicious/noExplicitAny: type gets mapped anyways by the pipeline
		any,
		TaskInputParameters<typeof readConfig>,
		TaskReturnType<typeof write>
	>("dts");
	pipeline.addStep(readConfig);
	pipeline.addStep(
		compile(files, {
			noEmit: false,
			declaration: true,
			emitDeclarationOnly: true,
			declarationMap: true,
			outDir: options.outDir,
		}),
	);
	pipeline.addStep(write);

	// Pipeline starts are hard-linked currently to definition files, rather than being generic enough to use right now. @TODO.
	// for (const filepath of files) {
	// 	pipeline.ctx.ftrace.register(filepath);
	// }

	log.definition("Starting dts pipeline");
	debug("Running dts pipeline");
	const output = await pipeline.run({
		searchPath: "./",
		filename: "tsconfig.json",
	});

	log.definition(chalk.green("✔︎"), "Completed dts pipeline");
	return pipeline.generateStatistics();
}

const readConfig = createTask(
	"readConfig",
	async (
		ctx,
		opts: { searchPath: string; filename: string },
	): Promise<{ config: ts.ParsedCommandLine }> => {
		const configPath = ts.findConfigFile(
			opts.searchPath,
			ts.sys.fileExists,
			opts.filename,
		);
		if (configPath == null) {
			throw new Error("can not read config path");
		}

		log.definition(`Using tsconfig: ${chalk.magenta(configPath)}`);

		const conf = await parseFullConfigck(configPath);

		if (conf.errors && conf.errors.length > 0) {
			console.log("Errors parsing tsconfig");
			for (const err of conf.errors) {
				console.log(err.messageText);
				debug(err);
			}
		}

		return { config: conf };
	},
);

const compile = (files: Array<string>, overrides: ts.CompilerOptions) =>
	createTask(
		"compile",
		async (ctx, opts: Awaited<TaskReturnType<typeof readConfig>>) => {
			const options = {
				...opts.config.options,
				...overrides,
			};

			for (const filepath of files) {
				log.definition(`Generating definition for ${chalk.magenta(filepath)}`);
			}

			debug("Using tsconfig compiler options: %o", options);

			const createdFiles: FilesDts = {};
			const host = ts.createIncrementalCompilerHost(options);
			// const host = ts.createCompilerHost(options);
			host.writeFile = (filename: string, contents: string) => {
				debug("Host: writeFile:", filename);
				createdFiles[filename] = contents;
				return contents;
			};

			// Prepare and emit the d.ts files
			// const program = ts.createProgram(files, options, host);
			const program = ts.createIncrementalProgram({
				rootNames: files,
				options,
				host,
			});
			program.emit();

			return { files: createdFiles };
		},
	);

const write = createTask(
	"write",
	async (
		ctx,
		{ files }: Awaited<TaskReturnType<ReturnType<typeof compile>>>,
	) => {
		await Promise.all(
			Object.entries(files).map(async ([filepath, content]) => {
				const report = await writeFile(filepath, content);
				// ctx.ftrace.getSizes(report.filepath).dts = report.size;
				// return writeFile(filepath, content);
			}),
		);

		return files;
	},
);

async function writeFile(filepath: string, content: string) {
	const bytes = await Bun.write(filepath, content);
	debug("Writing file:", filepath, bytes);
	return {
		filepath: filepath,
		size: bytes,
	};
}

/**
 * Using ts method to get the full ts config, including extends from a monorepo/workspace.
 * ~3x slower than tsconfck with parsing
 */
async function parseFullConfig(configPath: string) {
	// @ts-ignore we're not using this so I'm not investing in working out the API ts wants to be happy
	const conf = ts.getParsedCommandLineOfConfigFile(configPath, {}, ts.sys);

	if (conf == null) {
		throw new Error("Can not parse tsconfig");
	}

	return conf;
}

async function parseFullConfigck(configPath: string) {
	const output = await parse(configPath);
	// Nuke extends, to avoid unnecessary errors from ts parsing the config file
	output.tsconfig.extends = undefined;

	// Need to parse with ts convert i.e. {react: 'jsx'} to {react: 4}, which is needed to pass to the host/compiler.
	const conf = ts.parseJsonConfigFileContent(
		output.tsconfig,
		ts.sys,
		path.dirname(configPath),
		{},
		configPath,
	);
	return conf;
}
