import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import preserveDirectives from 'rollup-plugin-preserve-directives'
import pkg from './package.json'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

function externals(list: Array<string>) {
  if (list.length === 0) {
    return () => false
  }

  const re = new RegExp(`^(${list.join('|')})($|/)`)
  return (id: string) => re.test(id)
}

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: './src/index.tsx',
      formats: ['cjs', 'es'],
      // fileName: pkg.name,
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
    react(),
    dts({
      insertTypesEntry: true,
    }),
    vanillaExtractPlugin(),
  ],
  test: {
    environment: 'jsdom',
  },
})
