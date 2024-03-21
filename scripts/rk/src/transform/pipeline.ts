import type {PipelineContext} from './context.ts'
import type {Task, TaskDefinition} from './task.ts'
export type {TaskDefinition, Task, PipelineContext}

import {createContext} from './context.ts'
import {measure, fileEvents} from './analytics.ts'

/**
 * Defines a definition of a collection of sequential tasks
 */
export class Pipeline<
  C extends Record<string, unknown>,
  TInput extends TaskDefinition['inputs'],
  TOutput extends TaskDefinition['outputs'],
> {
  tasks: Array<Task<TaskDefinition['inputs'], TaskDefinition['outputs'], any>>
  ctx: PipelineContext<C>

  constructor(id: string, ctx: C = {} as C) {
    this.tasks = []
    this.ctx = createContext<C>(id, ctx)
  }

  addStep<
    TInput extends TaskDefinition['inputs'],
    TOutput extends TaskDefinition['outputs'],
  >(task: Task<TInput, TOutput, C>) {
    this.tasks.push(task as unknown as Task<any, any, C>)
  }

  // @TODO addSteps (can we chain inputs and outputs? i.e. <A, B> = B = (A) => B)

  async run(input: TInput): Promise<TOutput> {
    this.ctx.tron.on()
    let work = null

    for await (const task of this.tasks) {
      const measurement = measure(task.id)
      this.ctx.tron.track(measurement.start)
      work = await task.run(this.ctx, (work ?? input) as unknown as TInput)
      this.ctx.tron.track(measurement.end)
    }
    return work as TOutput
  }

  generateStatistics() {
    // Generate pipeline stats
    const pipelineStats = this.tasks.reduce<Record<string, number>>(
      (stats, task) => {
        const measurement = this.ctx.tron.measure(measure(task.id))
        stats[task.id] = measurement.duration
        return stats
      },
      {},
    )

    // Generate statistics per file
    const fileStats: Record<
      string,
      Record<keyof typeof fileEvents, number>
    > = {}
    for (let [id, trace] of this.ctx.ftrace.files) {
      fileStats[id] = Object.keys(fileEvents).reduce<
        Record<(keyof typeof fileEvents)[number], number>
      >(
        (stats, event) => {
          // @TODO trace.measure can throw, we should omit stats if it does throw, currently it'll just crash
          const measurement = trace.measure(measure(event))
          stats[event] = measurement.duration
          return stats
        },
        {} as Record<keyof typeof fileEvents, number>,
      )
    }

    return {
      id: this.ctx.pipelineId,
      pipeline: pipelineStats,
      file: fileStats,
    }
  }
}
