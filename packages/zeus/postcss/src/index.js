import fs from 'node:fs'
import path from 'node:path'

/**
 * @typedef {Object} PathsOptions
 * @property {string} appRoot - The root directory of the consuming app
 * @property {string} [monorepoRoot] - The root directory of the monorepo (for hoisted dependencies)
 * @property {string[]} [scopes] - Package scopes to include (default: ['@urban-ui'])
 */

/**
 * @typedef {Object} UrbanUIPlugin
 * @property {(options: PathsOptions) => string[]} paths - Get include paths for all urban-ui packages
 */

/**
 * Resolve a package's actual location, following symlinks
 * @param {string} packageName
 * @param {string} fromDir - Directory to start resolution from
 * @returns {string | null}
 */
function resolvePackagePath(packageName, fromDir) {
  // Check in the directory's node_modules
  const nodeModulesPath = path.join(fromDir, 'node_modules', packageName)
  const packageJsonPath = path.join(nodeModulesPath, 'package.json')

  if (fs.existsSync(packageJsonPath)) {
    // Resolve symlinks to get the real path
    return fs.realpathSync(nodeModulesPath)
  }

  return null
}

/**
 * Read dependencies from a package.json
 * @param {string} packagePath
 * @returns {{ dependencies: Record<string, string>, peerDependencies: Record<string, string> }}
 */
function readPackageDeps(packagePath) {
  const packageJsonPath = path.join(packagePath, 'package.json')

  if (!fs.existsSync(packageJsonPath)) {
    return { dependencies: {}, peerDependencies: {} }
  }

  const content = fs.readFileSync(packageJsonPath, 'utf-8')
  const pkg = JSON.parse(content)

  return {
    dependencies: pkg.dependencies || {},
    peerDependencies: pkg.peerDependencies || {},
  }
}

/**
 * Check if a package name matches any of the target scopes
 * @param {string} packageName
 * @param {string[]} scopes
 * @returns {boolean}
 */
function matchesScope(packageName, scopes) {
  return scopes.some((scope) => packageName.startsWith(`${scope}/`))
}

/**
 * Scan a node_modules directory for packages matching the given scopes
 * @param {string} rootDir - Directory containing node_modules
 * @param {string[]} scopes - Package scopes to look for
 * @returns {string[]} Array of package names found
 */
function scanForScopedPackages(rootDir, scopes) {
  const nodeModulesPath = path.join(rootDir, 'node_modules')
  const packages = []

  if (!fs.existsSync(nodeModulesPath)) {
    return packages
  }

  for (const scope of scopes) {
    const scopeDir = path.join(nodeModulesPath, scope)

    if (fs.existsSync(scopeDir) && fs.statSync(scopeDir).isDirectory()) {
      const scopePackages = fs.readdirSync(scopeDir)

      for (const pkg of scopePackages) {
        packages.push(`${scope}/${pkg}`)
      }
    }
  }

  return packages
}

/**
 * Find all packages matching scopes, traversing transitive dependencies
 * @param {string[]} searchRoots - Directories to search for packages (appRoot, monorepoRoot)
 * @param {string[]} scopes
 * @returns {Map<string, string>} Map of package name to resolved path
 */
function findAllPackages(searchRoots, scopes) {
  /** @type {Map<string, string>} */
  const found = new Map()

  /** @type {Set<string>} */
  const visited = new Set()

  /** @type {Array<{ packageName: string, searchFrom: string }>} */
  const queue = []

  // Scan all search roots for matching scoped packages
  for (const root of searchRoots) {
    const packages = scanForScopedPackages(root, scopes)

    for (const packageName of packages) {
      queue.push({ packageName, searchFrom: root })
    }
  }

  if (queue.length === 0) {
    console.warn(`[urban-ui/postcss] No packages found matching scopes: ${scopes.join(', ')}`)
    return found
  }

  // Process queue with BFS
  while (queue.length > 0) {
    const { packageName, searchFrom } = queue.shift()

    // Skip if already visited
    if (visited.has(packageName)) {
      continue
    }
    visited.add(packageName)

    // Resolve the package location
    const packagePath = resolvePackagePath(packageName, searchFrom)

    if (!packagePath) {
      // Package not found from this location, skip
      continue
    }

    // Add to found packages
    found.set(packageName, packagePath)

    // Read this package's dependencies and queue matching ones
    const { dependencies, peerDependencies } = readPackageDeps(packagePath)
    const allDeps = { ...dependencies, ...peerDependencies }

    for (const depName of Object.keys(allDeps)) {
      if (matchesScope(depName, scopes) && !visited.has(depName)) {
        // Search from the current package's directory (for nested node_modules)
        queue.push({ packageName: depName, searchFrom: packagePath })
        // Also search from all configured roots (for hoisted deps)
        for (const root of searchRoots) {
          queue.push({ packageName: depName, searchFrom: root })
        }
      }
    }
  }

  return found
}

/**
 * Convert package paths to postcss include patterns
 * @param {Map<string, string>} packages
 * @returns {string[]}
 */
function toIncludePaths(packages) {
  const paths = []

  for (const [, packagePath] of packages) {
    // Include all JS files, exclude nested node_modules
    paths.push(path.join(packagePath, '**/*.{js,mjs}'))
    paths.push(`!${path.join(packagePath, 'node_modules/**/*.{js,mjs}')}`)
  }

  return paths
}

/**
 * @type {UrbanUIPlugin}
 */
export const urbanui = {
  /**
   * Get postcss include paths for all urban-ui packages (including transitive deps)
   * @param {PathsOptions} options
   * @returns {string[]}
   */
  paths(options) {
    const { appRoot, monorepoRoot, scopes = ['@urban-ui'] } = options

    if (!appRoot) {
      throw new Error('[urban-ui/postcss] appRoot is required')
    }

    const searchRoots = [path.resolve(appRoot)]

    if (monorepoRoot) {
      searchRoots.push(path.resolve(monorepoRoot))
    }

    const packages = findAllPackages(searchRoots, scopes)

    return toIncludePaths(packages)
  },
}
