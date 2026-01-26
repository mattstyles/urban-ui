import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/experimental-ct-react'
import stylexPlugin from '@stylexswc/unplugin/vite'
import react from '@vitejs/plugin-react'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.visual.test.tsx',

  snapshotDir: './__snapshots__',
  snapshotPathTemplate: '{snapshotDir}/{arg}{ext}',

  timeout: 10_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 50,
    },
  },

  use: {
    trace: 'on-first-retry',
    ctPort: 3100,
    ctViteConfig: {
      plugins: [
        react(),
        stylexPlugin({
          useCSSLayers: true,
          useCssPlaceholder: true,
          rsOptions: {
            dev: true,
            treeshakeCompensation: true,
          },
        }),
      ],
      // resolve: {
      //   alias: [
      //     {
      //       find: /^@urban-ui\/styles\/(.+)$/,
      //       replacement: path.resolve(dirname, '../../core/styles/src/$1.ts'),
      //     },
      //     {
      //       find: '@urban-ui/styles',
      //       replacement: path.resolve(
      //         dirname,
      //         '../../core/styles/src/index.ts',
      //       ),
      //     },
      //     {
      //       find: /^@urban-ui\/theme\/(.+\.stylex)$/,
      //       replacement: path.resolve(
      //         dirname,
      //         '../../core/theme/src/tokens/$1.ts',
      //       ),
      //     },
      //     {
      //       find: /^@urban-ui\/theme\/(.+)$/,
      //       replacement: path.resolve(dirname, '../../core/theme/src/$1.ts'),
      //     },
      //     {
      //       find: '@urban-ui/theme',
      //       replacement: path.resolve(dirname, '../../core/theme/src/index.ts'),
      //     },
      //     {
      //       find: '@urban-ui/text',
      //       replacement: path.resolve(
      //         dirname,
      //         '../../typography/text/src/index.ts',
      //       ),
      //     },
      //   ],
      // },
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
