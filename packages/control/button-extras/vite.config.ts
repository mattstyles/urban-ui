import path from 'path'
import {createLibraryConfig} from 'config-vite'
import pkg from './package.json'

export default createLibraryConfig({
  entry: path.resolve(__dirname, 'src/index.tsx'),
  pkg: pkg,
})
