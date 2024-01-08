import {createLibraryConfig} from 'config-vite'
import pkg from './package.json' assert {type: 'json'}

export default createLibraryConfig({
  entry: [
    './src/index.tsx',
    './src/atoms.entry.ts',
    './src/base.entry.ts',
    './src/reset.entry.ts',
    './src/system.entry.ts',
  ],
  pkg: pkg,
})
