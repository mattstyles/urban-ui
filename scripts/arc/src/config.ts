import { cosmiconfig } from "cosmiconfig";

export type Config<T = Record<string | number | symbol, unknown>> = T & {
	/**
	 * Array of globs to include for transformation
	 * @default ['src']
	 */
	include?: Array<string>;
	/**
	 * Output directory
	 * @default dist
	 */
	outDir?: string;
	/**
	 * Root directory.
	 * Loosely maps to strip-leading-paths from swc to generate the same folder structure in the output directory from the files from the include globs.
	 * Using tsconfig.compilerOptions.rootDir is often what you want as the dts generation will use this as an output path anyways.
	 * @example
	 * Allows mapping src/file.ts input to dist/file.js
	 * @default src
	 */
	rootDir?: string;
	/**
	 * Events
	 * @default {}
	 */
	events?: {
		complete: () => Promise<void>;
	};
};

function noop() {
	return Promise.resolve();
}

const defaultConfig: Required<Config> = {
	include: ["src"],
	outDir: "dist",
	rootDir: "src",
	events: {
		complete: noop,
	},
};

type ConfigOptions = {
	moduleName?: string;
	overrides?: Config;
};
export async function getConfig(
	options: ConfigOptions = {},
): Promise<Required<Config>> {
	const opts = merge({ moduleName: "arc", overrides: {} }, options);
	const explorer = cosmiconfig(opts.moduleName);
	const foundConfig = await explorer.search();

	if (foundConfig == null || foundConfig.isEmpty) {
		return defaultConfig;
	}

	const conf = foundConfig.config;

	return {
		...defaultConfig,
		...conf,
		// Only use default root directory if default include path is used
		// Trying to ascertain if include[0] is a valid directory name is tricky
		rootDir:
			conf?.include == null ? defaultConfig.rootDir : conf?.rootDir || "",
		...opts.overrides,
	};
}

function merge<T extends Record<string | number | symbol, unknown>>(
	def: Required<T>,
	...args: Array<Partial<T>>
): Required<T> {
	return args.reduce((record, arg) => {
		return Object.assign(record, arg);
		// return {
		// 	...record,
		// 	...arg,
		// };
	}, def) as Required<T>;
}
