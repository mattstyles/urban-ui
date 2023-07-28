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
      entry: './src/button.tsx',
      formats: ['cjs', 'es'],
      // fileName: pkg.name,
      fileName: 'button',
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
    }),
    vanillaExtractPlugin(),
  ],
})
