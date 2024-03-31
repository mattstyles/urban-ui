import { Trace } from "../trace.ts";

export const compiledFileTypes = {
	cjs: "cjs",
	esm: "esm",
	"cjs::map": "cjs::map",
	"esm::map": "esm::map",
	dts: "dts",
};

export type File = {
	trace: Trace;
	sizes: Partial<Record<keyof typeof compiledFileTypes, number>>;
};

export class FileTracker {
	files: Map<string, File>;
	id: string;

	constructor(opts: { id: string }) {
		this.files = new Map();
		this.id = opts.id;
	}

	register(id: string): Trace {
		const tron = new Trace({ id }).on();
		this.files.set(id, {
			trace: tron,
			sizes: {},
		});
		return tron;
	}

	get(id: string): File {
		const file = this.files.get(id);
		if (file == null) {
			throw new Error(`${id} transform tracker not registered`);
		}
		return file;
	}

	getTrace(id: string): Trace {
		const file = this.files.get(id);

		if (file == null) {
			throw new Error(`${id} transform tracker not registered`);
		}

		return file.trace;
	}

	getSizes(id: string): File["sizes"] {
		const file = this.get(id);
		return file.sizes;
	}
}
