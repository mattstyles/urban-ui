import type {Task, TaskDefinition, PipelineContext} from './shared.ts'

import {createTask, createTaskDefinition} from './task.ts'
import {Pipeline} from './pipeline.ts'
import {Schema} from './shared.ts'

const def = createTaskDefinition({
  id: 'id',
  inputs: {
    foo: Schema.number,
  },
  outputs: {
    bar: Schema.number,
  },
})
const testTask = createTask(def, async (ctx, {foo}) => {
  console.log('test1', ctx)
  ctx.additionalProp = 'foobarbaz'
  return {
    bar: 100 + foo,
  }
})

const test2Task = createTask(
  createTaskDefinition({
    id: 'test2',
    inputs: def.outputs,
    outputs: {out: Schema.string},
  }),
  async (ctx, {bar}) => {
    console.log('test2 ctx', ctx)
    return {
      out: bar > 100 ? 'over' : 'under',
    }
  },
)

/**
 * Basic test for typings for task inputs and outputs
 * @param num
 */
export async function testPipeline(num: number) {
  const ctx = {}
  // const out1 = await testTask.run(ctx, {foo: num})
  // const out2 = await test2Task.run(ctx, out1)

  // console.log(out2)

  /**
   * So this looping over works but typings get proper screwy
   */
  // const pipeline = [testTask, test2Task]
  // let input = {foo: num}
  // for (let task of pipeline) {
  //   input = task.run(input)
  // }
  // console.log(input)

  // console.log(pipeline[1].run(pipeline[0].run({foo: num})))

  // Can't be awaited
  // console.log(flow(testTask.run, test2Task.run)({foo: num}))

  // const fns = pipeline.map((t) => t.run)
  // console.log(flow(fns[0], fns[1])({foo: num}))

  // can't be awaited and errors anyway
  // @ts-ignore
  // const foo = pipe({foo: num}, ...pipeline.map((t) => t.run))
  // console.log(num, foo)

  // const bar = pipeline.reduce(
  //   (prev, task) => {
  //     return task.run(prev)
  //   },
  //   {foo: num},
  // )
  // console.log('reduce', bar)

  const pl = new Pipeline({suppliedProp: 'foo'})
  pl.addStep(testTask)
  pl.addStep(test2Task)
  console.log('pl', num, await pl.run({foo: num}))
}
