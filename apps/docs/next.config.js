/** @type {import('next').NextConfig} */

import path from 'node:path'
import { fileURLToPath } from 'node:url'
// import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import createStyleXPlugin from '@stylexswc/nextjs-plugin'

// const createStyleXPlugin = require('@stylexswc/nextjs-plugin')
// // const remarkGfm = require('remark-gfm')
// const createMDX = require('@next/mdx')
// const { fileURLToPath } = require('node:url')
// const path = require('node:path')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config = {
  // experimental: {
  //   // appDir: true,
  //   mdxRs: true,
  // },
  // reactStrictMode: true,
  // Transpilation is for app/components i.e. reaching in to packages looking for mdx files
  transpilePackages: [
    '@stylexjs/open-props',
    '@urban-ui/theme',
    '@urban-ui/text',
    '@urban-ui/flex',
    '@urban-ui/test',
    '@urban-ui/tag',
  ],
  // webpack(config) {
  //   config.resolve.extensionAlias = {
  //     '.js': ['.js', '.ts'],
  //     '.jsx': ['.jsx', '.tsx'],
  //   }
  //   return config
  // },
}

const withMDX = createMDX({
  options: {
    extension: /\.mdx?$/,
    // remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: '@mdx-js/react',
  },
})

const withStyleX = createStyleXPlugin({
  // Add any StyleX options here
  rsOptions: {
    aliases: {
      '@/*': [path.join(__dirname, '*')],
    },
    unstable_moduleResolution: {
      type: 'commonJS',
    },
    isDev: process.env.NODE_ENV === 'development',
    genConditionalClasses: true,
    treeshakeCompensation: true,
  },
  extractCSS: false,
})

// module.exports = withStyleXPlugin(withMDX(config))
// module.exports = withMDX(config)
// export default withStyleXPlugin(withVanillaExtract(withMDX(config)))
// export default withVanillaExtract(withMDX(config))

export default withStyleX(config)
// export default withMDX(withStyleX(config))
// module.exports = withMDX(withStyleX(config))
// module.exports = withStyleX(config)
