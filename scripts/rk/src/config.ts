import {cosmiconfig} from 'cosmiconfig'

export type Config<T = {}> = T & {
  /**
   * Array of globs to include for transformation
   */
  include: Array<string>
}

const defaultConfig: Config = {
  include: [],
}

export async function getConfig(): Promise<Config> {
  const explorer = cosmiconfig('rk')
  const foundConfig = await explorer.search()

  if (foundConfig == null || foundConfig.isEmpty) {
    return defaultConfig
  }

  return {...defaultConfig, include: foundConfig.config.include}
}
