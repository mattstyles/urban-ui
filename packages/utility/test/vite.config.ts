import {defineConfig} from 'vite'
import {createLibraryConfig} from 'config-vite/createLibraryConfig.ts'
import pkg from './package.json' assert {type: 'json'}

export default createLibraryConfig({
  entry: './src/index.tsx',
  pkg: pkg,
})
