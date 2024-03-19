export type PipelineContext<C> = C & {
  pipelineId: string
}

export type TaskDefinition = {
  id: string
  inputs: Record<string, any>
  outputs: Record<string, any>
}

export type Task<
  T extends TaskDefinition,
  C extends Record<string, unknown>,
> = {
  id: T['id']
  definition: T
  run: (ctx: PipelineContext<C>, inputs: T['inputs']) => Promise<T['outputs']>
}

export const Schema = {
  number: 0,
  string: 'string',
  boolean: true,
}
