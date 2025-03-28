import { fileURLToPath } from 'node:url'

import path from 'node:path'
import process from 'node:process'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import preserveDirectives from 'rollup-plugin-preserve-directives'
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function isTestEnv() {
  return (
    process.env.NODE_ENV === 'test' ||
    process.env.VITEST === 'true' ||
    process.env.TEST === 'true'
  )
}

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

export function createLibraryConfig({ entry, pkg }) {
  const config = defineConfig({
    build: {
      outDir: 'dist',
      sourcemap: true,
      lib: {
        entry: forceArray(entry),
        formats: ['cjs', 'es'],
        // formats: ['es'],
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
          // exports: 'named',
        },

        // preserveEntrySignatures: 'strict',
        // preserveDirectives: true,
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
    ],
    test: {
      environment: 'jsdom',
      // setupFiles: path.resolve(__dirname, './src/setupTests.ts'),
    },
  })

  return config
}

function styleXCompiler() {
  return {
    name: 'stylex-compiler',
    resolveId(source) {
      console.log('-- Source')
      console.log(source)
      return source
    },
    async transform(inputCode, id, { ssr: isSSR } = {}) {
      if (id.includes('stylex')) {
        console.log('-- id')
        console.log(id)
        console.log('-- inputCode')
        console.log(inputCode)
        return {
          code: 'export const sizes = 12; export const anatomy = 23;',
          map: undefined,
          meta: { styleX: true },
        }
      }
      // console.log('-- id')
      // console.log(id)
      // console.log('-- inputCode')
      // console.log(inputCode)
      // return false
    },
  }
}
