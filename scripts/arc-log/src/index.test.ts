import {
  afterEach,
  beforeEach,
  describe,
  expect,
  mock,
  spyOn,
  test,
} from 'bun:test'
import chalk from 'chalk'

import { createLogger } from './index'

const globalLog = console.log
const globalWarn = console.warn
const globalError = console.error
beforeEach(() => {
  console.log = mock()
  console.warn = mock()
  console.error = mock()
})
afterEach(() => {
  console.log = globalLog
  console.warn = globalWarn
  console.error = globalError
})

describe('[createLogger] def log level', () => {
  const log = createLogger('test', chalk.cyan)

  test('log level should default to log output', () => {
    log.log('hello')
    expect(console.log).toHaveBeenCalled()
  })

  test('verbose should not output anything', () => {
    log.verbose('verbose')
    expect(console.log).not.toHaveBeenCalled()
  })

  test('debug should not output anything', () => {
    log.debug('debug')
    expect(console.log).not.toHaveBeenCalled()
  })

  test('warn should always output', () => {
    log.warn('warn')
    expect(console.log).not.toHaveBeenCalled()
    expect(console.warn).toHaveBeenCalled()
  })

  test('error should always output', () => {
    log.error('error')
    expect(console.log).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalled()
  })

  test('Output assertions', () => {
    const expected = {
      namespace: 'namespace',
      log: 'expected',
    }

    const spy = spyOn(console, 'log')
    const log = createLogger(expected.namespace, chalk.blue)
    log.log(expected.log)

    expect(spy.mock.calls[0][0]).toContain(expected.namespace)
    expect(spy.mock.calls[0][1]).toContain(expected.log)
  })
})

/**
 * Suite instantiates a logger in each test to ensure that the environment variable is set correctly
 */
describe('[createLogger] verbose log level', () => {
  beforeEach(() => {
    process.env.LOG_LEVEL = 'verbose'
  })
  afterEach(() => {
    process.env.LOG_LEVEL = undefined
  })

  test('log', () => {
    const log = createLogger('verbose', chalk.yellow)
    log.log('called')
    expect(console.log).toHaveBeenCalled()
  })

  test('verbose', () => {
    const log = createLogger('verbose', chalk.yellow)
    log.verbose('not called')
    expect(console.log).toHaveBeenCalled()
  })

  test('debug should not output anything', () => {
    const log = createLogger('verbose', chalk.yellow)
    log.debug('debug')
    expect(console.log).not.toHaveBeenCalled()
  })

  test('warn should always output', () => {
    const log = createLogger('verbose', chalk.yellow)
    log.warn('warn')
    expect(console.log).not.toHaveBeenCalled()
    expect(console.warn).toHaveBeenCalled()
  })

  test('error should always output', () => {
    const log = createLogger('verbose', chalk.yellow)
    log.error('error')
    expect(console.log).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalled()
  })
})

describe('[createLogger] CI log level', () => {
  beforeEach(() => {
    process.env.CI = 'true'
  })
  afterEach(() => {
    process.env.CI = undefined
  })

  test('log', () => {
    const log = createLogger('ci', chalk.yellow)
    log.log('called')
    expect(console.log).toHaveBeenCalled()
  })

  test('verbose', () => {
    const log = createLogger('ci', chalk.yellow)
    log.verbose('not called')
    expect(console.log).not.toHaveBeenCalled()
  })

  test('debug', () => {
    const log = createLogger('ci', chalk.yellow)
    log.debug('debug')
    expect(console.log).not.toHaveBeenCalled()
  })

  test('warn', () => {
    const log = createLogger('verbose', chalk.yellow)
    log.warn('warn')
    expect(console.log).not.toHaveBeenCalled()
    expect(console.warn).toHaveBeenCalled()
  })

  test('error', () => {
    const log = createLogger('verbose', chalk.yellow)
    log.error('error')
    expect(console.log).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalled()
  })
})
