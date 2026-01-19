---
created: 2026-01-19
status: exploring
authors:
  - Matt Styles
---

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

### 1. Change package resolution

Make postcss search nested node_modules recursively to find transient dependencies.

**Status:** DONE

Added `@urban-ui/postcss-plugin` to recursively look for all `@urban-ui` (configurable) workspace items to add to the postcss includes list.

### 2. Change install behavior

Use bun's hoisting options or switch package managers to hoist all dependencies to the root.

**Status:** REJECTED

Not a viable solution for all consumers. We cannot dictate package manager choice or configuration to downstream users.

> Note: We should validate that the problem does not exist when dependencies ARE hoisted, to confirm this is specifically an isolated install issue.

### 3. Explicit direct dependencies

Require apps to declare all StyleX packages as direct dependencies, not just the packages they directly import.

1. add `@urban-ui/item` to postcss rules
2. add `@urban-ui/item` to package.json specifically as a direct dependencies

**Status:** IN-PROGRESS (but undesirable)

Manually managing the dependency graph is painful and error-prone. Consumers would need to know the full transitive dependency tree of every component they use.

An alternative to giving clues to manually manage the dependency tree:
* Packages specify internal deps using peer dependencies, giving clues to consumers that each one should be installed (rather than handled automatically via dependencies).
* This does mean that the entire collection of components always needs to be versioned together. This is probably acceptable.

An alternative approach: ship a single package containing the entire design system. Consumers take everything and rely on tree shaking. However, given the complexity of modern toolchains, this would still result (in some cases) in excessive file-system scanning and potentially parsing and processing even for unused components.

### 4. Monorepo symlink approach

Leverage that workspace packages symlink to source locations, allowing resolution via monorepo paths rather than node_modules.

**Status:** REJECTED

This would require consumers to have even more tooling to manage workspace symlinks. It feels too similar to changing the install behavior - we're just shifting the problem to a different configuration burden.

### 5. Compile CSS at library build time

Instead of deferring StyleX compilation to the app, compile CSS during library builds and ship pre-compiled styles.

**Status:** REJECTED

Not viable. A key value of StyleX is smaller bundles through deduplication and atomic CSS. Compiling CSS individually per library would result in:

1. CSS duplication across packages (shared tokens, common patterns)
2. Duplicate class definitions that would need a consumer-level post-process to deduplicate
3. Classname references in JavaScript/HTML that may conflict or require reconciliation

This defeats the purpose of using StyleX in the first place.
