import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import rspack from '@rspack/core'
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
  optimization: {
    minimize: true, // Ensure minification is enabled
    minimizer: [
      // If using a specific CSS minifier plugin
      new rspack.LightningCssMinimizerRspackPlugin({
        // options for cssnano or Lightning CSS
      }),
    ],
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
