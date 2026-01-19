import path from 'node:path'
import createStylexPlugin from '@stylexswc/nextjs-plugin/turbopack'
import type { NextConfig } from 'next'

const withStylexPlugin = createStylexPlugin({
  rsOptions: {
    aliases: {
      '@/*': [path.join(__dirname, '/src/*')],
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

const nextConfig: NextConfig = {
  //
}

export default withStylexPlugin(nextConfig)
