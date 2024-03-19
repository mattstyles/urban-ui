import type {Task, TaskDefinition, PipelineContext} from './shared.ts'

/**
 *
 */
export class Pipeline<C extends Record<string, unknown>> {
  tasks: Array<Task<TaskDefinition, C>>
  ctx: PipelineContext<C>
  constructor(ctx: C) {
    this.tasks = []
    this.ctx = {
      ...ctx,
      pipelineId: 'foobarbaz',
    }
  }

  addStep<T extends TaskDefinition>(task: Task<T, C>) {
    this.tasks.push(task as unknown as Task<TaskDefinition, C>)
  }

  async run(input: TaskDefinition['inputs']) {
    console.log('running')
    console.log(this.ctx)
    for await (const task of this.tasks) {
      input = await task.run(this.ctx, input)
    }
    return input
  }
}
