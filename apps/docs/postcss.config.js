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
    // `!${path.join(packagePath, 'node_modules/**/*.{js,mjs}')}`,
  ]
}

const pkgs = [
  '@urban-ui/theme',
  '@urban-ui/styles',
  '@urban-ui/flex',
  '@urban-ui/text',
  '@urban-ui/test',
  '@urban-ui/tag',
  '@urban-ui/button',
  '@urban-ui/link',
  '@urban-ui/icon',
]

const pkgIncludePaths = pkgs.flatMap((pkg) =>
  getPackageIncludePaths(pkg, [
    path.join(projectRoot, 'node_modules'),
    path.join(monorepoRoot, 'node_modules'),
  ]),
)

console.log('Importing')
console.log(pkgIncludePaths)

export default {
  plugins: {
    '@stylexswc/postcss-plugin': {
      include: ['src/app/**/*.{js,jsx,ts,tsx}', ...pkgIncludePaths],
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
        enableDebugClassNames: process.env.NODE_ENV === 'development',
      },
    },
    autoprefixer: {},
  },
}
