import type { ChalkInstance } from "chalk";

import chalk from "chalk";
import createDebugger from "debug";

export { createDebugger };

export const debug = {
	rk: createDebugger("rk"),
};

export const log = {
	arc: createLogger("arc", chalk.yellow),
	transform: createLogger("arc-swc", chalk.cyan),
	definition: createLogger("arc-dts", chalk.magenta),
};

export function createLogger(namespace: string, colour: ChalkInstance) {
	// biome-ignore lint/suspicious/noExplicitAny: matches console.log API
	function log(...args: any[]) {
		console.log(
			`${chalk.dim.bold("[")}${colour.bold(namespace)}${chalk.dim.bold("]")}`,
			...args,
		);
	}

	return log;
}

export function padRight(str: string, min: number) {
	const diff = min - str.length;
	if (diff <= 0) {
		return str;
	}

	return str + Array.from({ length: diff }).join(" ");
}
