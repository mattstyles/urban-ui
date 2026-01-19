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

const includePaths = [
  // '@stylexjs/open-props',
  // '@stylexswc/design-system',
  '@internal/container',
  '@internal/item',
  '@urban-ui/test',
  '@urban-ui/test2',
  '@urban-ui/theme',
].flatMap((packageName) =>
  getPackageIncludePaths(packageName, [
    path.join(projectRoot, 'node_modules'),
    path.join(monorepoRoot, 'node_modules'),
  ]),
)

export default {
  plugins: {
    '@stylexswc/postcss-plugin': {
      include: [
        'app/**/*.{js,jsx,ts,tsx}',
        'components/**/*.{js,jsx,ts,tsx}',
        ...includePaths,
      ],
      useCSSLayers: true,
      rsOptions: {
        aliases: {
          '@/*': [path.join(projectRoot, '*')],
        },
        unstable_moduleResolution: {
          type: 'commonJS',
        },
        dev: process.env.NODE_ENV === 'development',
        treeshakeCompensation: true,
        styleResolution: 'application-order',
        enableDebugClassNames: process.env.NODE_ENV === 'development',
      },
    },
    autoprefixer: {},
  },
}
