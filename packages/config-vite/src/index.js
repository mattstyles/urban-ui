import {fileURLToPath} from 'node:url'

import path from 'node:path'
import process from 'node:process'
/// <reference types="vitest" />
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import preserveDirectives from 'rollup-plugin-preserve-directives'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function externals(list) {
  if (list.length === 0) {
    return () => false
  }

  const re = new RegExp(`^(${list.join('|')})($|/)`)
  return (id) => re.test(id)
}

export function createLibraryConfig({entry, pkg}) {
  return defineConfig({
    build: {
      outDir: 'dist',
      sourcemap: true,
      lib: {
        entry: entry,
        formats: ['cjs', 'es'],
        fileName: 'index',
      },
      rollupOptions: {
        external: externals([
          ...Object.keys(pkg.dependencies ?? {}),
          ...Object.keys(pkg.peerDependencies ?? {}),
        ]),
        plugins: [preserveDirectives()],
        output: {
          preserveModules: true,
        },
      },
    },
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        // rollupTypes: true,
        tsconfigPath: process.cwd() + '/tsconfig.json',
      }),
      vanillaExtractPlugin(),
    ],
    test: {
      environment: 'jsdom',
      // setupFiles: path.resolve(__dirname, './src/setupTests.ts'),
    },
  })
}
