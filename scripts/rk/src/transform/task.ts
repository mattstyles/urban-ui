import type {TaskDefinition, Task} from './shared'

// Necessary to apply typings to inputs and outputs
export function createTaskDefinition<T extends TaskDefinition>(def: T) {
  return def
}

/**
 * Create a task from a definition and a task running function
 */
export function createTask<
  T extends TaskDefinition,
  C extends Record<string, unknown> = Record<string, any>,
>(definition: T, fn: Task<T, C>['run']): Task<T, C> {
  return {
    id: definition.id,
    definition: definition,
    run: fn,
  }
}
