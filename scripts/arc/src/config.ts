import { cosmiconfig } from 'cosmiconfig'
import type { Recursive } from 'type-fest/source/multidimensional-readonly-array'

interface Wop<T> extends Array<T | Wop<T>> {}
type WatchmanQuery = Wop<string>

export type Config<T = Record<string | number | symbol, unknown>> = T & {
  /**
   * Array of globs to include for transformation
   * @default ['src', '!**\/*.test.ts*']
   */
  include?: Array<string>
  /**
   * Query to pass to watchman.
   * Ideally we would pass the glob to watchman but the watchman query is a lot more powerful than a glob.
   * @default [
   *   'allof',
   *   ['match', `${opts.rootDir}\/**\/*`, 'wholename'],
   *   ['suffix', ['ts', 'tsx', 'js', 'jsx']],
   *   ['not', ['suffix', ['test.ts', 'test.tsx']]],
   * ]
   */
  watchQuery?: WatchmanQuery
  /**
   * Output directory
   * @default dist
   */
  outDir?: string
  /**
   * Root directory.
   * Loosely maps to strip-leading-paths from swc to generate the same folder structure in the output directory from the files from the include globs.
   * Using tsconfig.compilerOptions.rootDir is often what you want as the dts generation will use this as an output path anyways.
   * @example
   * Allows mapping src/file.ts input to dist/file.js
   * @default src
   */
  rootDir?: string
  /**
   * Options for swc.
   * @default {
   *   minify: false,
   *   sourceMaps: true,
   * }
   */
  swc?: {
    minify: boolean
    sourceMaps: boolean
  }
  /**
   * Events
   * @default {}
   */
  events?: {
    /**
     * Run when the build is complete.
     * Will not be run in watch mode.
     */
    complete: () => Promise<void>
  }
}

function noop() {
  return Promise.resolve()
}

const defaultConfig: Required<Config> = {
  include: ['src', '!**/*.test.ts*'],
  watchQuery: [
    'allof',
    ['match', 'src/**/*', 'wholename'],
    ['suffix', ['ts', 'tsx', 'js', 'jsx']],
    ['not', ['suffix', ['test.ts', 'test.tsx']]],
  ],
  outDir: 'dist',
  rootDir: 'src',
  swc: {
    minify: true,
    sourceMaps: true,
  },
  events: {
    complete: noop,
  },
}

type ConfigOptions = {
  moduleName?: string
  overrides?: Config
}
export async function getConfig(
  options: ConfigOptions = {},
): Promise<Required<Config>> {
  const opts = merge({ moduleName: 'arc', overrides: {} }, options)
  const explorer = cosmiconfig(opts.moduleName)
  const foundConfig = await explorer.search()

  if (foundConfig == null || foundConfig.isEmpty) {
    return defaultConfig
  }

  const conf = foundConfig.config

  return {
    ...defaultConfig,
    ...conf,
    // Only use default root directory if default include path is used
    // Trying to ascertain if include[0] is a valid directory name is tricky
    rootDir:
      conf?.include == null ? defaultConfig.rootDir : conf?.rootDir || '',
    ...opts.overrides,
  }
}

function merge<T extends Record<string | number | symbol, unknown>>(
  def: Required<T>,
  ...args: Array<Partial<T>>
): Required<T> {
  return args.reduce((record, arg) => {
    return Object.assign(record, arg)
    // return {
    // 	...record,
    // 	...arg,
    // };
  }, def) as Required<T>
}
