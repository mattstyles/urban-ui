import type {CommandModule} from 'yargs'
import type {Config} from '../config'

import {globby as glob} from 'globby'
import {generateOptions} from '../arguments'
import {createDebugger} from '../log'
import {transformFiles} from '../transform'

const debug = createDebugger('rk::build')

// type CommandOptions = Config<{entries: Array<string>}>
type CommandOptions = Config
export const buildCommand: CommandModule = {
  command: 'build',
  describe: 'Uses SWC to build every file from the includes',
  builder: (yargs) => {
    return yargs.option('include', {
      alias: 'i',
      description: 'List of globs of files to include in the transform',
      type: 'array',
    })
  },
  handler: generateOptions<CommandOptions>(
    async (argv) => {
      const files = await glob(argv.include)
      debug('Files to transform:', files)

      return {
        include: files,
        outDir: argv.outDir,
      }
    },
    async (opts) => {
      await transformFiles(opts.include)
    },
  ),
}
