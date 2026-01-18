import path from 'node:path'
import { fileURLToPath } from 'node:url'
// import createStyleXPlugin from '@stylexswc/nextjs-plugin'
import createStylexPlugin from '@stylexswc/nextjs-plugin/turbopack'
import type { NextConfig } from 'next'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  transpilePackages: [
    '@urban-ui/theme',
    '@urban-ui/styles',
    '@urban-ui/text',
    '@urban-ui/flex',
    '@urban-ui/test',
    '@urban-ui/tag',
    '@urban-ui/button',
    '@urban-ui/link',
    '@urban-ui/icon',
  ],
}

const withStylexPlugin = createStylexPlugin({
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
  stylexImports: ['stylex', '@stylexjs/stylex'],
})

export default withStylexPlugin(nextConfig)
