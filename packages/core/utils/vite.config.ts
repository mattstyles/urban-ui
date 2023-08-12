import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import pkg from './package.json'

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
  ],
})
