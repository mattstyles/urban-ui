import path from 'node:path'
import { fileURLToPath } from 'node:url'
import createStyleXPlugin from '@stylexswc/nextjs-plugin'
import type { NextConfig } from 'next'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  transpilePackages: [
    '@urban-ui/theme',
    '@urban-ui/text',
    '@urban-ui/flex',
    '@urban-ui/test',
    '@urban-ui/tag',
  ],
}

const withStyleX = createStyleXPlugin({
  // Add any StyleX options here
  rsOptions: {
    aliases: {
      '@/*': [path.join(__dirname, '*')],
    },
    unstable_moduleResolution: {
      type: 'commonJS',
    },
    dev: process.env.NODE_ENV === 'development',
    genConditionalClasses: true,
    treeshakeCompensation: false,
  },
  useCSSLayers: true,
  extractCSS: false,
})

export default withStyleX(nextConfig)
