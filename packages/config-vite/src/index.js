// import path from 'path'
import {fileURLToPath} from 'url'
// import {defineConfig} from 'vite'
// import dts from 'vite-plugin-dts'
// import react from '@vitejs/plugin-react'

import path from 'node:path'
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
        // @ts-expect-error module does export types for nodenext as expected
        plugins: [preserveDirectives()],
        output: {
          preserveModules: true,
        },
      },
    },
    plugins: [
      // @ts-expect-error module does export types for nodenext as expected
      react(),
      dts({
        insertTypesEntry: true,
      }),
      vanillaExtractPlugin(),
    ],
    test: {
      environment: 'jsdom',
      setupFiles: path.resolve(__dirname, './src/setupTests.ts'),
    },
  })
  // return defineConfig({
  //   build: {
  //     outDir: 'dist',
  //     sourcemap: true,
  //     lib: {
  //       entry: entry,
  //       name: pkg.name,
  //       formats: ['cjs', 'es'],
  //       fileName: pkg.name,
  //     },
  //     rollupOptions: {
  //       // We will probably need to supply this
  //       external: externals([
  //         ...Object.keys(pkg.dependencies ?? {}),
  //         ...Object.keys(pkg.peerDependencies ?? {}),
  //       ]),
  //     },
  //   },
  //   plugins: [
  //     react(),
  //     dts({
  //       insertTypesEntry: true,
  //     }),
  //   ],
  //   test: {
  //     environment: 'jsdom',
  //     setupFiles: path.resolve(__dirname, './src/setupTests.ts'),
  //   },
  // })
}
