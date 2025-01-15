import path from 'node:path'
import { fileURLToPath } from 'node:url'

import stylexPlugin from '@stylexswc/nextjs-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDir = path.join(__dirname, '../../')

const withStyleXPlugin = stylexPlugin({
  // Add any StyleX options here
  rsOptions: {
    rootDir: rootDir,
    // dev: process.env.NODE_ENV !== 'production',
    dev: true,
    // useRemForFontSize: true,
    // aliases: {
    //   // '@/*': [path.join(__dirname, '*')],
    //   '@/*': [path.join('../../', '*')],
    // },
    unstable_moduleResolution: {
      type: 'commonJS',
      // rootDir: __dirname,
      // rootDir: '../../',
      rootDir: rootDir,
    },
  },
  // stylexImports: ['@stylexjs/stylex', { from: './theme', as: 'tokens' }],
  useCSSLayers: true,
  // transformCss: async (css) => {
  //   const postcss = require('postcss')
  //   const result = await postcss([require('autoprefixer')]).process(css)
  //   return result.css
  // },
})

const config = {
  // swcMinify: true,
  transpilePackages: [
    '@urban-ui/fr-theme',
    '@urban-ui/fr-tag',
    '@stylexjs/open-props',
  ],
}

export default withStyleXPlugin(config)
