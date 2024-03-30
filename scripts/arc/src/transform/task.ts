import type {PipelineContext} from './context.ts'

export type ParameterDefinition<K extends string | number | symbol, V> =
  | Record<K, V>
  | Array<Record<K, V>>

export type TaskDefinition = {
  id: string
  inputs: ParameterDefinition<string, unknown>
  outputs?: Promise<ParameterDefinition<string, unknown>>
}

export type TaskInputParameters<T extends Task<any, any, any>> = Parameters<
  T['run']
>[1]
export type TaskReturnType<T extends Task<any, any, any>> = ReturnType<T['run']>

export type Task<
  TInput extends TaskDefinition['inputs'],
  TOutput extends TaskDefinition['outputs'],
  C extends Record<string, unknown> = Record<string, unknown>,
> = {
  id: TaskDefinition['id']
  run: (ctx: PipelineContext<C>, inputs: TInput) => TOutput
}

export function createTask<
  TInput extends TaskDefinition['inputs'],
  TOutput extends TaskDefinition['outputs'],
  C extends Record<string, unknown> = Record<string, unknown>,
>(id: string, fn: Task<TInput, TOutput, C>['run']): Task<TInput, TOutput, C> {
  return {
    id: id,
    run: fn,
  }
}
