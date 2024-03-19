import type {CommandModule} from 'yargs'
import type {Config} from '../config'

import {globby as glob} from 'globby'
import {generateOptions} from '../arguments'
import {createDebugger} from '../log'
import {transformFiles} from '../transform'
import {generateDefinitions} from '../definition'

import {testPipeline} from '../transform/pipeline.example.ts'

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
      // [x] read file
      // [x] transform file with swc
      // [x] write file and map with correct extensions to correct outDir directory
      // [x] run tsc type generation
      // For esm, cjs, and dts
      // await transformFiles(opts.include, {outDir: opts.outDir})
      // await generateDefinitions(opts.include, {outDir: opts.outDir})

      await testPipeline(12)
      await testPipeline(-50)
    },
  ),
}
