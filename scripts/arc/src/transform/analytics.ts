import type {Trace} from '../trace.ts'
import type {FileTracker} from './instrument.ts'

export function measure(
  key: string,
): Required<Parameters<Trace['measure']>[0]> {
  return {
    start: `${key}::start`,
    end: `${key}::end`,
  }
}

export const fileEvents = {
  parse: 'parse',
  compile: 'compile',
  'compile::esm': 'compile::esm',
  'compile::cjs': 'compile::cjs',
  // 'compile::umd': 'compile::umd',
  write: 'write',
}
