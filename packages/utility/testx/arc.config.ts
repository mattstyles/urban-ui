import type {Config} from '@urban-ui/arc'
import tsconfig from './tsconfig.json'

// const config: Config = {
//   include: [tsconfig.compilerOptions.rootDir], // this is the default
//   outDir: 'dist',
//   rootDir: tsconfig.compilerOptions.rootDir, // this is the default
// }

const config: Config = {
  include: ['src'], // this is the default
  outDir: 'dist',
  rootDir: 'src', // this is the default
}

export default config
