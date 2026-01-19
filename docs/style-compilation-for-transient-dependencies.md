# Style Compilation for Transient Dependencies

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

## Current State

The build currently **fails** because postcss cannot resolve transient StyleX dependencies with bun's isolated install structure.

## Solutions Explored

TODO: Document approaches tried and their results
