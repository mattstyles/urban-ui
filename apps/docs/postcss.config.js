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
    // '!' + path.join(packagePath, 'node_modules/**/*.{js,mjs}'),
    `!${path.join(packagePath, 'node_modules/**/*.{js,mjs}')}`,
  ]
}

const openPropsIncludePaths = getPackageIncludePaths('@stylexjs/open-props', [
  // path.join(projectRoot, 'node_modules'),
  path.join(monorepoRoot, 'node_modules'),
])

const urbanThemeIncludePaths = getPackageIncludePaths('@urban-ui/theme', [
  path.join(projectRoot, 'node_modules'),
  path.join(monorepoRoot, 'node_modules'),
])
const urbanTextIncludePaths = getPackageIncludePaths('@urban-ui/text', [
  path.join(projectRoot, 'node_modules'),
  path.join(monorepoRoot, 'node_modules'),
])
const urbanFlexIncludePaths = getPackageIncludePaths('@urban-ui/flex', [
  path.join(projectRoot, 'node_modules'),
  path.join(monorepoRoot, 'node_modules'),
])

const urbanRelativePathIncludes = [
  '../../node_modules/@urban-ui/flex/**/*.{js,mjs}',
  '../../node_modules/@urban-ui/text/**/*.{js,mjs}',
  '../../node_modules/@urban-ui/theme/**/*.{js,mjs}',
  '../../node_modules/@stylexjs/open-props/**/*.{js,mjs}',
]

console.log({
  __dirname,
  __filename,
  projectRoot,
  monorepoRoot,
  isDev: process.env.NODE_ENV === 'development',
})
// console.log({ urbanThemeIncludePaths, urbanTextIncludePaths })
// console.log(openPropsIncludePaths)

const externalImportPaths = [
  // ...urbanFlexIncludePaths,
  ...urbanThemeIncludePaths,
  ...urbanTextIncludePaths,
  ...openPropsIncludePaths,
  // ...urbanRelativePathIncludes,
]

console.log('Importing')
console.log(externalImportPaths)

// CJS or ESM makes no difference to the paths
export default {
  // module.exports = {
  plugins: {
    '@stylexswc/postcss-plugin': {
      include: [
        'src/app/**/*.{js,jsx,ts,tsx}',
        'app/**/*.{js,jsx,ts,tsx}',
        'components/**/*.{js,jsx,ts,tsx}',
        // ...urbanThemeIncludePaths,
        // ...urbanTextIncludePaths,
        // ...openPropsIncludePaths,
        // ...urbanRelativePathIncludes,
        ...externalImportPaths,
      ],
      useCSSLayers: true,
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
        treeshakeCompensation: true,
      },
    },
    autoprefixer: {},
  },
}
