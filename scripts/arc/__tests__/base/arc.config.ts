import type { Config } from '../../src/config'
import tsconfig from './tsconfig.json'

const config: Config = {
  include: [tsconfig.compilerOptions.rootDir], // this is the default
  outDir: '__dist__',
  rootDir: tsconfig.compilerOptions.rootDir, // this is the default
}

export default config
