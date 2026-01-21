import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('jest').Config} */
export default {
  setupFilesAfterEnv: [path.join(rootDir, 'jest.setup.js')],
  testEnvironment: '@happy-dom/jest-environment',
  transform: {
    '^.+\\.(ts|tsx|js|jsx|mjs|cjs|html)$': [
      'jest-chain-transform',
      {
        transformers: [
          [
            '@stylexswc/jest',
            {
              rsOptions: {
                aliases: {
                  '@/*': [path.join(rootDir, '*')],
                },
                unstable_moduleResolution: {
                  type: 'commonJS',
                },
              },
            },
          ],
          [
            '@swc/jest',
            {
              $schema: 'https://json.schemastore.org/swcrc',
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  dynamicImport: true,
                  decorators: true,
                  dts: true,
                },
                transform: {
                  react: {
                    useBuiltins: true,
                    runtime: 'automatic',
                  },
                },
                target: 'esnext',
                loose: false,
                externalHelpers: false,
                keepClassNames: true,
                baseUrl: './',

                paths: {
                  '@/*': ['./*'],
                },
              },
              module: {
                type: 'es6',
              },
              minify: false,
            },
          ],
        ],
      },
    ],
  },
}
