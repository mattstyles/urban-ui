import type { Task, TaskInputParameters, TaskReturnType } from "./task.ts";

import { createTask } from "./task.ts";
import { Pipeline, type PipelineContext } from "./pipeline.ts";

type ExampleContext = {
	suppliedProp: string;
} & Record<string, any>;

const testTask = createTask(
	"task1",
	async (ctx: PipelineContext<ExampleContext>, { foo }: { foo: number }) => {
		console.log("test1", ctx, ctx.suppliedProp);
		ctx.additionalProp = "foobarbaz";
		return {
			bar: 100 + foo,
		};
	},
);

type Task2Def = Task<{ bar: number }, Promise<{ out: string }>>;
const test2Task = createTask<
	TaskInputParameters<Task2Def>,
	TaskReturnType<Task2Def>
>("id_task2", async (ctx, { bar }) => {
	console.log("test2 ctx", ctx, ctx.suppliedProp, ctx.additionalProp);
	return {
		out: bar > 100 ? "over" : "under",
	};
});

/**
 * Basic test for typings for task inputs and outputs
 * @param num
 */
export async function testPipeline(num: number) {
	const pl = new Pipeline("test_pipeline", { suppliedProp: "foo" });
	pl.addStep(testTask);
	pl.addStep(test2Task);
	console.log("pl", num, await pl.run({ foo: num }));
}
