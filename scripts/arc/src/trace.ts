import { v4 as uuid } from "uuid";

export type TraceID = string;
export type TraceItem = {
	id: TraceID;
	detail: string | null;
	timestamp: number;
};
export type MeasureItem = {
	duration: number;
	start: number;
	end: number;
};

export class Trace {
	data: Map<TraceID, TraceItem>;
	spatialIndex: Array<TraceID>;
	tracerId: string;
	isActive = false;

	constructor({ id }: { id?: string } = {}) {
		this.data = new Map();
		this.spatialIndex = [];
		this.tracerId = id || uuid();
	}

	#track(item: TraceItem) {
		this.data.set(item.id, item);
		this.spatialIndex.push(item.id);
	}

	#getStartId() {
		return `${this.tracerId}_start`;
	}

	// @todo add a callback here which gets called whenever an action is tracked
	on() {
		if (this.isActive) {
			console.log("Tracer already activated");
			return this;
		}

		this.isActive = true;
		this.#track({
			id: this.#getStartId(),
			detail: "start",
			timestamp: performance.now(),
		});

		return this;
	}

	off() {
		this.isActive = false;
		this.#track({
			id: uuid(),
			detail: "stop",
			timestamp: performance.now(),
		});
	}

	track(opts: Partial<Pick<TraceItem, "detail" | "id">>): void;
	track(id: string): void;
	track(opts: Partial<Pick<TraceItem, "detail" | "id">> | string) {
		if (!this.isActive) {
			return;
		}

		const options = typeof opts === "string" ? { id: opts } : opts;

		this.#track({
			id: options.id || uuid(),
			detail: options.detail || null,
			timestamp: performance.now(),
		});
	}

	measure({ start, end }: { start?: TraceID; end: TraceID }): MeasureItem {
		const startItem = this.data.get(start || this.#getStartId());
		const endItem = this.data.get(end);

		if (startItem == null || endItem == null) {
			throw new Error("Trace:: can not find tracking point");
		}

		const measure = {
			start: startItem.timestamp,
			end: endItem.timestamp,
			duration: endItem.timestamp - startItem.timestamp,
		};

		return measure;
	}
}

export async function traceFn<T>(
	event: string,
	tron: Trace,
	cb: () => T,
): Promise<T> {
	tron.track(`${event}::start`);
	const output = await cb();
	tron.track(`${event}::end`);
	return output;
}
