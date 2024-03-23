import {cosmiconfig} from 'cosmiconfig'

export type Config<T = {}> = T & {
  /**
   * Array of globs to include for transformation
   * @default ['src']
   */
  include?: Array<string>
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
}

const defaultConfig: Required<Config> = {
  include: ['src'],
  outDir: 'dist',
  rootDir: 'src',
}

export async function getConfig(): Promise<Required<Config>> {
  const explorer = cosmiconfig('rk')
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
  }
}
