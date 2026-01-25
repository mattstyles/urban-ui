import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'

export default defineConfig({
  plugins: [pluginReact()],
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: true,
      bundle: false,
    },
  ],
  output: {
    target: 'web',
  },
  source: {
    entry: {
      main: [
        './src/**',
        '!./src/**/*.test.ts',
        '!./src/**/*.test.tsx',
        '!./src/**/*.stories.tsx',
        '!./src/**/*.spec.md',
        '!./src/**/*.example.tsx',
      ],
    },
  },
})
