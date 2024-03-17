import type {CommandModule, ArgumentsCamelCase} from 'yargs'
import type {Config} from './config'

export function generateOptions<U = Config, T = Promise<Config>>(
  generate: (argv: ArgumentsCamelCase<U>) => T,
  handler: (opts: Awaited<T>) => void,
): CommandModule['handler'] {
  return async (argv) => {
    const options = await generate(argv as ArgumentsCamelCase<U>)
    handler(options)
  }
}
