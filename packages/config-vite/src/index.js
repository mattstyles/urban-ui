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

function forceArray(src) {
  if (Array.isArray(src)) {
    return src
  }
  return [src]
}

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
        entry: forceArray(entry),
        formats: ['cjs', 'es'],
        // fileName: 'index',
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
        // Creates type entry files based on package (also type map files)
        insertTypesEntry: true,

        // Slower, and wraps declarations into a single file, which nukes map files
        // rollupTypes: true,

        // Need to exclude tests from output, but keep them in the tsconfig for type support in test files
        exclude: ['**/*.test.ts*'],
      }),
      // Removing VE plugin as a default. Build is now effectively redundant and default export will require a VE plugin to work.
      // vanillaExtractPlugin(),
    ],
    test: {
      environment: 'jsdom',
      // setupFiles: path.resolve(__dirname, './src/setupTests.ts'),
    },
  })
}
