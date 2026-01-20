import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import styleXRSPlugin from '@stylexswc/unplugin/rspack'
import { tanstackRouter } from '@tanstack/router-plugin/rspack'

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './src/main.tsx',
    },
    include: [/[\\/]node_modules[\\/]@urban-ui[\\/]/],
  },
  html: {
    template: './index.html',
  },
  tools: {
    rspack: {
      plugins: [
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: true,
        }),
        styleXRSPlugin({
          useCSSLayers: true,
          useCssPlaceholder: true,
          rsOptions: {
            dev: true,
            treeshakeCompensation: true,
          },
        }),
      ],
    },
  },
})
