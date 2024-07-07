import path from 'node:path'
import createStylexPlugin from 'bun-plugin-stylex'

/**
 * Example using bun-plugin-stylex to generate css
 *
 * The main problem is that this also generates the tokens, which makes sense as it needs those css variables
 */

const [stylexPlugin, generateCSS] = createStylexPlugin({
  dev: false,
  useCSSLayers: true,
})

await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist2',
  minify: false,
  plugins: [stylexPlugin],
  external: ['@stylexjs/stylex', 'react'],
})

const generatedCSS = await generateCSS()

if (generatedCSS) {
  await Bun.write(path.resolve(__dirname, 'dist2/styles.css'), generatedCSS)
}
