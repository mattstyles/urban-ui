import createDebugger from "debug";

export { createDebugger };

export const debug = {
	rk: createDebugger("rk"),
};

export function padRight(str: string, min: number) {
	const diff = min - str.length;
	if (diff <= 0) {
		return str;
	}

	return str + Array.from({ length: diff }).join(" ");
}
