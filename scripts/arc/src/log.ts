import type { ChalkInstance } from 'chalk'

import chalk from 'chalk'
import createDebugger from 'debug'

export { createDebugger }

export const debug = {
  rk: createDebugger('rk'),
}

export const log = {
  arc: createLogger('arc', chalk.yellow),
  transform: createLogger('arc-swc', chalk.cyan),
  definition: createLogger('arc-dts', chalk.magenta),
}

type LogParams = Parameters<typeof console.log>

/**
 * Creates a new log interface for a natural grouping.
 * Output to stdout is determined by env vars.
 *
 * @example
 *
 *
 * @param namespace identifier for this log output
 * @param colour colour for this log output
 */
export function createLogger(namespace: string, colour: ChalkInstance) {
  function log(...args: LogParams) {
    console.log(
      `${chalk.dim.bold('[')}${colour.bold(namespace)}${chalk.dim.bold(']')}`,
      ...args,
    )
  }

  return log
}

export function padRight(str: string, min: number) {
  const diff = min - str.length
  if (diff <= 0) {
    return str
  }

  return str + Array.from({ length: diff }).join(' ')
}
