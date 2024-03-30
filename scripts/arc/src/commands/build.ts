import type {CommandModule} from 'yargs'
import type {Config} from '../config'

import prettyBytes from 'pretty-bytes'
import prettyTime from 'pretty-time'
import chalk from 'chalk'
import {globby as glob} from 'globby'
import {generateOptions} from '../arguments'
import {createDebugger, padRight} from '../log'
import {transformFiles} from '../transform'
import {generateDefinitions} from '../definition'

import {testPipeline} from '../transform/pipeline.example.ts'

const debug = createDebugger('rk::build')

type CommandOptions = Required<Config>

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
        rootDir: argv.rootDir,
      }
    },
    /**
     * esm and cjs
     * [x] read file
     * [x] transform file with swc
     * [x] write file and map with correct extensions to correct output directory
     * dts
     * [x] run tsc type generation
     */
    async (opts) => {
      const stats = await transformFiles(opts.include, {
        outDir: opts.outDir,
        rootDir: opts.rootDir,
      })
      const dtsStats = await generateDefinitions(opts.include, {
        outDir: opts.outDir,
      })
      // console.log(dtsStats)

      /**
       * Individual file task times are not super accurate
       */
      // console.log(stats)

      const maxFilenameLength = Object.keys(stats.file).reduce(
        (total, next) => {
          if (next.length >= total) {
            return next.length
          }

          return total
        },
        0,
      )
      for (const [filename, file] of Object.entries(stats.file)) {
        console.log(
          padRight(filename, maxFilenameLength + 1),
          chalk.dim(formatCompileTargets(file)),
        )
      }

      console.log('')
      console.log(
        chalk.green('✔︎ DTS pipeline successful'),
        chalk.dim(
          `(${prettyFullRuntime(getFullPipelineRuntime(dtsStats.pipeline))})`,
        ),
      )
      console.log(
        chalk.green('✔︎ Compile pipeline successful'),
        chalk.dim(
          `(${prettyFullRuntime(getFullPipelineRuntime(stats.pipeline))})`,
        ),
      )

      // This is tempting but ends up yielding execution and screwing up the metrics, probably would be _less_ of a problem if TS wasn't synchronous, but, still would muck with a pipeline output
      // const out = await Promise.all([
      //   transformFiles(opts.include, {
      //     outDir: opts.outDir,
      //   }),
      //   generateDefinitions(opts.include, {
      //     outDir: opts.outDir,
      //   }),
      // ])
    },
  ),
}

type FileStats = Awaited<ReturnType<typeof transformFiles>>['file'][string]
function formatCompileTargets(stats: FileStats): string {
  return Object.entries(stats.sizes).reduce((output, [key, value]) => {
    return `${output} | ${key}: ${formatSummaryCompileTargetSize(value)}`
  }, '')
}

function getFullPipelineRuntime(stats: Record<string, number>): number {
  return Object.entries(stats).reduce((output, [_key, value]) => {
    return output + value
  }, 0)
}

/**
 * PrettyTime is expected to work against hrtime timestamps, but we are working in milliseconds. Convert to nanoseconds and strip any remaining fractional precision.
 */
function prettyFullRuntime(n: number) {
  return prettyTime((n * 1e6) | 0)
}

function formatSummaryCompileTargetSize(n: number) {
  // return prettyBytes(n, {minimumFractionDigits: 2, maximumFractionDigits: 2})
  return (n / 1000).toFixed(2) + ' kB'
}

// @TODO bun test on pipeline etc (see if this will also work in packages for ui testing, although stylex might be the issue)
