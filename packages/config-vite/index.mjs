import path from 'path'
import {fileURLToPath} from 'url'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'

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
        name: pkg.name,
        formats: ['cjs', 'es'],
        fileName: pkg.name,
      },
      rollupOptions: {
        // We will probably need to supply this
        external: externals([
          ...Object.keys(pkg.dependencies ?? {}),
          ...Object.keys(pkg.peerDependencies ?? {}),
        ]),
      },
    },
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
      }),
    ],
    test: {
      environment: 'jsdom',
      setupFiles: path.resolve(__dirname, './src/setupTests.ts'),
      // We need css to we will enable it (but it is slow). Might need to conditionally enable it depending on how many packages need it. - stitches won't output CSS to jsdom anyway.
      // https://github.com/stitchesjs/stitches/issues/874
      // https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/vite.config.ts#L14-L16
      css: false,
    },
  })
}
