---
created: 2026-01-19
acceptedOn: 2026-01-19
status: implemented
authors:
  - Matt Styles
---

# ADR: Style Compilation for Transient Dependencies

## Problem Space

Ensuring that all StyleX styles are fully transpiled and output to the page when consuming components with transient dependencies.

## Dependency Model

### Code Dependencies

```
App (pkg-rslib)
  └── Container (@internal/container)
        └── Item (@internal/item)
              └── Theme (@urban-ui/theme)
```

**Components:**

- **Container** - Depends on Item, renders Item internally
- **Item** - Leaf node component, only depends on theme tokens

**Goal:** App imports and uses `<Container>`. Both Container's styles AND Item's styles (transient dependency) must be properly compiled and output to the application.

### Installed Dependencies (Bun 1.3.6 Isolated Installs)

Bun uses isolated installs by default. Each package gets its own `node_modules` with its dependencies, rather than hoisting everything to the root.

**App's package.json declares:**
```json
{
  "dependencies": {
    "@internal/container": "workspace:*",
    "@urban-ui/theme": "workspace:*"
  }
}
```

**Resulting node_modules structure:**
```
apps/pkg-rslib/
  node_modules/
    @internal/
      container/              ← Direct dependency (symlink to packages/internal/container)
        node_modules/
          @internal/
            item/             ← Transient dependency (nested, NOT hoisted)
    @urban-ui/
      theme/                  ← Direct dependency
```

Key observation: `@internal/item` is **not** at `apps/pkg-rslib/node_modules/@internal/item`. It only exists nested inside container's node_modules.

## How PostCSS Finds Source Files

The postcss config (`apps/pkg-rslib/postcss.config.js`) uses a helper function to resolve package paths:

```javascript
function getPackageIncludePaths(packageName, nodeModulePaths) {
  for (const nodeModulePath of nodeModulePaths) {
    const packageJsonPath = path.resolve(nodeModulePath, packageName, 'package.json')
    if (fs.existsSync(packageJsonPath)) {
      return path.dirname(packageJsonPath)
    }
  }
  throw new Error(`Could not find package ${packageName}`)
}

// Searches these locations:
getPackageIncludePaths(packageName, [
  path.join(projectRoot, 'node_modules'),    // apps/pkg-rslib/node_modules
  path.join(monorepoRoot, 'node_modules'),   // urban-ui/node_modules (root)
])
```

The StyleX postcss plugin then operates over all files matching the resolved paths.

## Why Transient Dependencies Fail

When we try to include `@internal/item` in the postcss config:

```javascript
const includePaths = [
  '@internal/container',  // ✓ Found at apps/pkg-rslib/node_modules/@internal/container
  '@internal/item',       // ✗ NOT FOUND - not in app's or root's node_modules
  '@urban-ui/theme',      // ✓ Found (direct dependency)
]
```

**Resolution attempts:**
1. `apps/pkg-rslib/node_modules/@internal/item/package.json` → **does not exist**
2. `urban-ui/node_modules/@internal/item/package.json` → **does not exist**

The package only exists at:
- `apps/pkg-rslib/node_modules/@internal/container/node_modules/@internal/item`

**Build error:**
```
Error: Could not find package @internal/item
```

## Options Considered

### Option 1: Change package resolution

Make postcss search nested node_modules recursively to find transient dependencies.

**Verdict:** ACCEPTED

### Option 2: Change install behavior

Use bun's hoisting options or switch package managers to hoist all dependencies to the root.

**Verdict:** REJECTED

Not a viable solution for all consumers. We cannot dictate package manager choice or configuration to downstream users.

### Option 3: Explicit direct dependencies

Require apps to declare all StyleX packages as direct dependencies, not just the packages they directly import.

**Verdict:** REJECTED

Manually managing the dependency graph is painful and error-prone. Consumers would need to know the full transitive dependency tree of every component they use.

### Option 4: Monorepo symlink approach

Leverage that workspace packages symlink to source locations, allowing resolution via monorepo paths rather than node_modules.

**Verdict:** REJECTED

This would require consumers to have even more tooling to manage workspace symlinks. It shifts the problem to a different configuration burden.

### Option 5: Compile CSS at library build time

Instead of deferring StyleX compilation to the app, compile CSS during library builds and ship pre-compiled styles.

**Verdict:** REJECTED

Not viable. A key value of StyleX is smaller bundles through deduplication and atomic CSS. Compiling CSS individually per library would result in CSS duplication and defeat the purpose of using StyleX.

## Conclusion

**Decision:** Implement Option 1 via `@urban-ui/postcss-plugin`.

The plugin recursively discovers all packages matching configured scopes (e.g., `@urban-ui`) by traversing nested `node_modules` directories. It reads each package's dependencies and peer dependencies to build the complete transitive dependency graph, then generates glob patterns for PostCSS to include.

This approach:
- Works with any package manager's install behavior (hoisted or isolated)
- Requires no manual dependency tracking from consumers
- Automatically adapts as component dependencies change

### Example Usage

```javascript
// postcss.config.js
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { urbanui } from '@urban-ui/postcss-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = __dirname
const monorepoRoot = path.join(projectRoot, '../..')

// Find all @urban-ui packages (including transitive deps)
const urbanUiPaths = urbanui.paths({
  appRoot: projectRoot,
  monorepoRoot: monorepoRoot,
  scopes: ['@urban-ui'],
})

export default {
  plugins: {
    '@stylexswc/postcss-plugin': {
      include: [
        'src/app/**/*.{js,jsx,ts,tsx}',
        'src/components/**/*.{js,jsx,ts,tsx}',
        ...urbanUiPaths,
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
```
