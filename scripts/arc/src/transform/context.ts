import { Trace } from "../trace.ts";
import { FileTracker } from "./instrument.ts";

export type PipelineContext<C> = C & {
	pipelineId: string;
	tron: Trace;
	ftrace: FileTracker;
};

export function createContext<C>(id: string, ctx: C): PipelineContext<C> {
	return {
		...ctx,
		pipelineId: id,
		tron: new Trace({ id: id }),
		ftrace: new FileTracker({ id: id }),
	};
}
