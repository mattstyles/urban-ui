import path from 'node:path'
import { fileURLToPath } from 'node:url'
import createAnalyzerPlugin from '@next/bundle-analyzer'
// import remarkGfm from 'remark-gfm'
// import createMDX from '@next/mdx'
import createStyleXPlugin from '@stylexswc/nextjs-plugin'
import type { NextConfig } from 'next'

// const createStyleXPlugin = require('@stylexswc/nextjs-plugin')
// // const remarkGfm = require('remark-gfm')
// const createMDX = require('@next/mdx')
// const { fileURLToPath } = require('node:url')
// const path = require('node:path')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: NextConfig = {
  //
}

// const withMDX = createMDX({
//   options: {
//     // extension: /\.mdx?$/,
//     // remarkPlugins: [remarkGfm],
//     rehypePlugins: [],
//     // If you use `MDXProvider`, uncomment the following line.
//     providerImportSource: '@mdx-js/react',
//   },
// })

const withStyleX = createStyleXPlugin({
  // Add any StyleX options here
  rsOptions: {
    aliases: {
      '@/*': [path.join(__dirname, '*')],
    },
    unstable_moduleResolution: {
      type: 'commonJS',
    },
    runtimeInjection: false,
    treeshakeCompensation: true,
    styleResolution: 'application-order',
    enableDebugClassNames: process.env.NODE_ENV === 'development',
  },
  useCSSLayers: true,
  extractCSS: false,
  stylexImports: ['stylex', '@stylexjs/stylex'],
})

const withBundleAnalyzer = createAnalyzerPlugin({
  enabled: process.env.ANALYZE === 'true',
})

// module.exports = withStyleXPlugin(withMDX(config))
// module.exports = withMDX(config)
// export default withStyleXPlugin(withVanillaExtract(withMDX(config)))
// export default withVanillaExtract(withMDX(config))

export default withBundleAnalyzer(withStyleX(config))
// export default withMDX(withStyleX(config))
// module.exports = withMDX(withStyleX(config))
// module.exports = withStyleX(config)
