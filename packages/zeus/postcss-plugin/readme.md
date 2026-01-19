# @urban-ui/postcss-plugin

Automatically discovers all `@urban-ui/*` packages (including transitive dependencies) and generates include paths for PostCSS StyleX compilation.

## Installation

```bash
bun add -D @urban-ui/postcss-plugin
```

## Usage

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
  monorepoRoot: monorepoRoot,  // Optional: for hoisted dependencies
  scopes: ['@urban-ui'],       // Optional: defaults to ['@urban-ui']
})

export default {
  plugins: {
    '@stylexswc/postcss-plugin': {
      include: [
        'app/**/*.{js,jsx,ts,tsx}',
        'components/**/*.{js,jsx,ts,tsx}',
        ...urbanUiPaths,
      ],
      // ... other options
    },
  },
}
```

## Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `appRoot` | `string` | Yes | The root directory of the consuming app |
| `monorepoRoot` | `string` | No | The monorepo root directory (for hoisted dependencies with npm/yarn/pnpm) |
| `scopes` | `string[]` | No | Package scopes to include. Defaults to `['@urban-ui']` |

## How it works

1. Scans `node_modules` in the configured roots for packages matching the specified scopes
2. For each package found, reads its `package.json` to find dependencies
3. Recursively traverses transitive dependencies (handling both nested and hoisted installs)
4. Returns glob patterns for PostCSS to include all discovered packages

This handles both:
- **Bun isolated installs** - nested `node_modules` traversal
- **Hoisted installs (npm/yarn/pnpm)** - packages at monorepo root
