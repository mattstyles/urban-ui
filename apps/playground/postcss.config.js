// const fs = require('node:fs')
// const path = require('node:path')
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = __dirname
const monorepoRoot = path.join(projectRoot, '../../')

function getPackageIncludePaths(packageName, nodeModulePaths) {
  let packagePath = null

  for (const nodeModulePath of nodeModulePaths) {
    const packageJsonPath = path.resolve(
      nodeModulePath,
      packageName,
      'package.json',
    )
    if (fs.existsSync(packageJsonPath)) {
      packagePath = path.dirname(packageJsonPath)
      break
    }
  }
  if (!packagePath) {
    throw new Error(`Could not find package ${packageName}`)
  }

  return [
    path.join(packagePath, '**/*.{js,mjs}'),
    `!${path.join(packagePath, 'node_modules/**/*.{js,mjs}')}`,
  ]
}

/**
 * Plugin will automatically include all of these variables, if you add @stylex/open-props then it will include those variables in the output and whilst classnames will not be generated the variables will be, even though they are unused.
 */
const pkgs = [
  '@urban-ui/theme',
  '@urban-ui/styles',
  '@urban-ui/flex',
  '@urban-ui/text',
  '@urban-ui/test',
  '@urban-ui/tag',
  '@urban-ui/button',
  '@urban-ui/link',

  '@stylexjs/open-props',
]

const externalImportPaths = pkgs.flatMap((pkg) =>
  getPackageIncludePaths(pkg, [
    path.join(projectRoot, 'node_modules'),
    path.join(monorepoRoot, 'node_modules'),
  ]),
)

// CJS or ESM makes no difference to the paths
export default {
  // module.exports = {
  plugins: {
    '@stylexswc/postcss-plugin': {
      include: ['src/app/**/*.{js,jsx,ts,tsx}', ...externalImportPaths],
      rsOptions: {
        aliases: {
          '@/*': [path.join(projectRoot, '*')],
        },
        unstable_moduleResolution: {
          type: 'commonJS',
          // rootDir: projectRoot,
        },
        dev: process.env.NODE_ENV === 'development',
        genConditionalClasses: true,
        treeshakeCompensation: false,
      },
      useCSSLayers: true,
      isDev: process.env.NODE_ENV === 'development',
    },
    autoprefixer: {},
  },
}
