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
      // Note: @stylexswc/unplugin specifies vite v7 as a direct dependency,
      // but @playwright/experimental-ct-react tops out at vite v6.
      // This causes a type mismatch on the plugins array but has no runtime effect.
      // Tracking as external dependency issue - no action required.
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
      resolve: {
        alias: [
          {
            find: /^@urban-ui\/test-utils\/(.+)$/,
            replacement: path.resolve(
              dirname,
              '../../utility/test-utils/src/$1/index.ts',
            ),
          },
          {
            find: '@urban-ui/test-utils',
            replacement: path.resolve(
              dirname,
              '../../utility/test-utils/src/index.ts',
            ),
          },
        ],
      },
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
