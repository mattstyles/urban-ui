const fs = require('node:fs')
const path = require('node:path')

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
    '!' + path.join(packagePath, 'node_modules/**/*.{js,mjs}'),
  ]
}

const openPropsIncludePaths = getPackageIncludePaths('@stylexjs/open-props', [
  path.join(projectRoot, 'node_modules'),
  path.join(monorepoRoot, 'node_modules'),
])

// Manually telling the resolver where to get the package is muchos success.
// In the dev case this will be within the repo itself (i.e. the symlink position) but for external consumers it will be within node_modules (in which case this custom configuration is probably unnecessary).
// const themeIncludes = getPackageIncludePaths('@urban-ui/fr-theme', [
//   path.join(projectRoot, 'node_modules'),
//   path.join(monorepoRoot, 'node_modules'),
// ])
// const themeIncludes = getPackageIncludePaths('@urban-ui/fr-theme', [
//   // path.join(projectRoot, 'node_modules'),
//   path.join(monorepoRoot, 'packages/fr/theme'),
// ])
const themeIncludes = [
  '/Users/mattstyles/projects/urban/urban-ui/packages/fr/theme/**/*.{js,mjs}',
]

const tagIncludes = getPackageIncludePaths('@urban-ui/fr-tag', [
  path.join(projectRoot, 'node_modules'),
  path.join(monorepoRoot, 'node_modules'),
])

const customPaths = [...openPropsIncludePaths, ...themeIncludes, ...tagIncludes]

console.log(customPaths)

module.exports = {
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: [
        'src/app/**/*.{js,jsx,ts,tsx}',
        'app/**/*.{js,jsx,ts,tsx}',
        'components/**/*.{js,jsx,ts,tsx}',
        ...customPaths,
      ],
      useCSSLayers: true,
    },
    autoprefixer: {},
  },
}
