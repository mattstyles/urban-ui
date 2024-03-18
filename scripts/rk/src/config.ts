import {cosmiconfig} from 'cosmiconfig'

export type Config<T = {}> = T & {
  /**
   * Array of globs to include for transformation
   */
  include: Array<string>
  /**
   * Output directory
   */
  outDir: string
}

const defaultConfig: Config = {
  include: [],
  outDir: '.',
}

export async function getConfig(): Promise<Config> {
  const explorer = cosmiconfig('rk')
  const foundConfig = await explorer.search()

  if (foundConfig == null || foundConfig.isEmpty) {
    return defaultConfig
  }

  const {include, outDir} = foundConfig.config

  return {...defaultConfig, include, outDir}
}
