import type { ChalkInstance } from 'chalk'
import chalk from 'chalk'
import createDebugger from 'debug'

type LogLevel = 'debug' | 'verbose' | 'log' | 'warning' | 'error'
const level: Record<LogLevel, number> = {
  /**
   * Debug logs are only shown when DEBUG=namespace or DEBUG=* is present in the environment
   */
  debug: 10,
  verbose: 20,
  log: 30,
  /**
   * Warnings are always shown
   */
  warning: 0,
  /**
   * Errors are always shown
   */
  error: 0,
}

/**
 * Uses LOGLEVEL, LOG_LEVEL, DEBUG, and CI from the environment.
 * LOGLEVEL takes precendence over LOG_LEVEL, and defaults to log. It overrides CI.
 * CI takes precendence as always sets the global level to log.
 * DEBUG determines whether debug logs are shown.
 */
function getGlobalLevel(def: LogLevel = 'log'): number {
  const gLevel: string | undefined = process.env.LOG_LEVEL
  if (level[gLevel?.toLowerCase() as LogLevel] != null) {
    return level[gLevel?.toLowerCase() as LogLevel]
  }

  if (process.env.CI != null && process.env.CI?.toLowerCase() === 'true') {
    return level.log
  }

  return level[def]
}

type LogFnParams = Parameters<Console['log']>
type ConsoleLevel = Pick<Console, 'log' | 'debug' | 'warn' | 'error'>
type LoggerInstanceOptions = {
  prefix: string
  consoleLevel: keyof ConsoleLevel
}

function createInstance(opts: LoggerInstanceOptions) {
  return function write(...args: LogFnParams) {
    console[opts.consoleLevel](opts.prefix, ...args)
  }
}

function noop(...args: LogFnParams) {
  return
}

export type ArcLogFn = (...args: LogFnParams) => void
export type ArcLogger = {
  debug: createDebugger.Debugger
  verbose: ArcLogFn
  log: ArcLogFn
  warn: ArcLogFn
  error: ArcLogFn
}

export function createLogger(
  namespace: string,
  colour: ChalkInstance,
): ArcLogger {
  const globalLevel = getGlobalLevel()
  const prefix = `${chalk.dim.bold('[')}${colour.bold(
    namespace,
  )}${chalk.dim.bold(']')}`

  return {
    debug: createDebugger(namespace),
    verbose:
      globalLevel <= level.verbose
        ? createInstance({
            prefix: prefix,
            consoleLevel: 'log',
          })
        : noop,
    log:
      globalLevel <= level.log
        ? createInstance({
            prefix: prefix,
            consoleLevel: 'log',
          })
        : noop,
    warn: createInstance({
      prefix: `${prefix} ⚠️`,
      consoleLevel: 'warn',
    }),
    error: createInstance({
      prefix: `${prefix} ❗️`,
      consoleLevel: 'error',
    }),
  }
}
