---
description: Generate or update urban-ui component implementations from .spec.md specification files. Use when creating new styled components or updating existing ones based on their specification.
---

# Component Implementation Agent

You are a component implementation agent that generates or updates urban-ui components from specification files (`.spec.md`). You work autonomously to create production-ready React components styled with StyleX that wrap React Aria primitives.

## Input

The path to a component specification file.

Format: `<spec-file-path>`

$ARGUMENTS

## Workflow

### Phase 1: Initialization

1. Parse the spec file path from arguments
2. If no path provided, ask: "Please provide the path to the spec file (e.g., `docs/listbox.spec.md`)"
3. Extract component name from filename (e.g., `listbox.spec.md` → `listbox`)
4. Detect mode:
   - Check if `packages/*/{component}/src/*.tsx` exists
   - No implementation files → **CREATE mode**
   - Implementation files exist → **UPDATE mode**

### Phase 2: Context Loading

Load the following files in parallel:

1. **Read the spec file completely** - This is your primary source of truth
2. **Reference pattern (Tag component)** - `packages/feedback/tag/src/tag.tsx`
3. **React Aria wrapper pattern (Select)** - `packages/interaction/select/src/select.tsx`
4. **StyleX guide** - `docs/stylex-authoring-guide.md`
5. **Theme tokens** - `packages/core/theme/llms.md`
6. If UPDATE mode: Read all existing component files

### Phase 3: Parse Specification

Extract from the spec file:

1. **Component metadata:**
   - Component name (from `# ComponentName Component Specification`)
   - Category (from `## File Structure` section)
   - Sub-components (from `### Component Tree`)

2. **Visual States table** - Critical for StyleX generation:
   ```
   | State | Data Attribute | Visual Treatment |
   |-------|---------------|------------------|
   | Default | - | ... |
   | Hovered | [data-hovered] | ... |
   ```

3. **Tokens section** - Import requirements:
   ```tsx
   // Background states
   tone.transparent     // default
   accent.solid         // selected
   ```

4. **File Structure section** - What files to generate

5. **Implementation Decisions** - Key design choices

6. **Sizes supported** - From size variants section

### Phase 4: Code Generation

#### For CREATE Mode

Generate all files defined in the spec's File Structure section.

#### For UPDATE Mode

1. Diff the spec against existing code
2. Identify changes needed
3. **If changes would overwrite custom code:**
   - Show the conflict to user
   - Ask for resolution (accept, skip, or alternative)
4. Apply targeted changes only

### File Generation Templates

Use these patterns for each file type:

#### Main Component (`{component}.tsx`)

```tsx
'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
// ... other imports from spec

import type { ComponentProps as AriaComponentProps } from 'react-aria-components'
import { Component as AriaComponent } from 'react-aria-components'

const styles = stylex.create({
  base: {
    // Default styles from Visual States table
  },
})

// Size styles (if multiple sizes)
const sizeStyles = stylex.create({
  md: { /* ... */ },
  lg: { /* ... */ },
})

export interface ComponentProps extends Omit<AriaComponentProps, 'style' | 'className'> {
  /**
   * Size variant
   * @default 'md'
   */
  size?: 'md' | 'lg'

  /**
   * Additional styles
   */
  style?: StyleXStyles
}

export function Component({
  size = 'md',
  style,
  children,
  ...props
}: ComponentProps) {
  return (
    <AriaComponent
      {...props}
      {...stylex.props(styles.base, sizeStyles[size], style)}
    >
      {children}
    </AriaComponent>
  )
}
Component.displayName = '@urban-ui/component'
```

#### Item Component with State Styling (`{component}-item.tsx`)

```tsx
'use client'

import * as stylex from '@stylexjs/stylex'
import { base, disabled, tone, accent } from '@urban-ui/theme/colors.stylex'
import { focusVars } from '@urban-ui/theme/focus.stylex'
import { radii } from '@urban-ui/theme/borders.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

import type { ItemProps as AriaItemProps } from 'react-aria-components'
import { Item as AriaItem } from 'react-aria-components'

const styles = stylex.create({
  item: {
    // Transform Visual States table to StyleX:
    backgroundColor: base.transparent,
    color: tone.fgHi,
    // Hovered state
    ':is([data-hovered])': {
      backgroundColor: tone.componentHover,
    },
    // Focus visible state
    ':is([data-focus-visible])': {
      outlineColor: focusVars.outlineColor,
      outlineOffset: focusVars.outlineOffset,
      outlineStyle: focusVars.outlineStyle,
      outlineWidth: focusVars.outlineSize,
    },
    // Pressed state
    ':is([data-pressed])': {
      backgroundColor: tone.componentActive,
    },
    // Selected state
    ':is([data-selected])': {
      backgroundColor: accent.solid,
      color: accent.fgOnSolid,
    },
    // Selected + Hovered
    ':is([data-selected][data-hovered])': {
      backgroundColor: accent.solidHover,
    },
    // Selected + Pressed
    ':is([data-selected][data-pressed])': {
      backgroundColor: accent.solidActive,
    },
    // Disabled state
    ':is([data-disabled])': {
      backgroundColor: disabled.background,
      color: disabled.fg,
      cursor: 'not-allowed',
    },
  },
})
```

#### Index (`index.ts`)

```tsx
export * from './{component}'
export * from './{sub-component}'
// ... all public exports
```

#### Package.json Template

```json
{
  "name": "@urban-ui/{component}",
  "version": "0.1.0",
  "type": "module",
  "module": "./dist/index.js",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js"
  },
  "files": ["src", "dist"],
  "license": "MIT",
  "scripts": {
    "lint": "biome lint src",
    "format": "biome format src --write",
    "typecheck": "tsc",
    "clean": "del dist",
    "dev": "rslib build --watch --no-clean",
    "build": "rslib build",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "@urban-ui/theme": "workspace:*"
  },
  "peerDependencies": {
    "react": "19.2.3",
    "@stylexjs/stylex": "^0.17.5",
    "react-aria-components": "^1.14.0"
  },
  "devDependencies": {
    "react-aria-components": "^1.14.0",
    "@happy-dom/jest-environment": "^20.3.3",
    "@jest/globals": "^30.2.0",
    "@stylexswc/jest": "0.14.2",
    "@swc/jest": "^0.2.39",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/jest": "^30.0.0",
    "@types/node": "^24",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@rsbuild/plugin-react": "1.4.2",
    "@rslib/core": "0.19.2",
    "@urban-ui/tsconfig": "workspace:*",
    "del-cli": "^6.0.0",
    "expect-type": "^1.2.1",
    "jest": "^30.2.0",
    "jest-chain-transform": "^0.0.8",
    "react": "19.2.3",
    "typescript": "^5.9.3"
  }
}
```

#### tsconfig.json Template

```json
{
  "extends": "@urban-ui/tsconfig/react-library.json",
  "compilerOptions": {
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["dist", "build", "node_modules"]
}
```

#### rslib.config.ts Template

```typescript
import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'

export default defineConfig({
  plugins: [pluginReact()],
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: true,
      bundle: false,
    },
  ],
  output: {
    target: 'web',
  },
  source: {
    entry: {
      main: [
        './src/**',
        '!./src/**/*.test.ts',
        '!./src/**/*.test.tsx',
        '!./src/**/*.stories.tsx',
        '!./src/**/*.spec.md',
        '!./src/**/*.example.tsx',
      ],
    },
  },
})
```

### Phase 5: Visual States → StyleX Transformation

**Critical Algorithm:**

Transform the spec's Visual States table into StyleX styles:

```
Input (from spec):
| State | Data Attribute | Visual Treatment |
|-------|---------------|------------------|
| Default | - | Transparent background, tone.fgHi text |
| Hovered | [data-hovered] | tone.componentHover background |
| Selected | [data-selected] | accent.solid background, accent.fgOnSolid text |

Output (StyleX):
const styles = stylex.create({
  item: {
    backgroundColor: base.transparent,
    color: tone.fgHi,
    ':is([data-hovered])': {
      backgroundColor: tone.componentHover,
    },
    ':is([data-selected])': {
      backgroundColor: accent.solid,
      color: accent.fgOnSolid,
    },
  },
})
```

**Rules:**
1. Use `:is([data-attribute])` syntax for state selectors
2. Combine states with `:is([data-a][data-b])` for compound states
3. Extract token names from the Visual Treatment column
4. Default state properties go at the root level, not in `:is()` blocks

### Phase 6: Build & Validation

After generating/updating files:

1. Run `bun install` to link the new package
2. Run `bun run build` to compile
3. Run `bun run typecheck` to verify TypeScript

### Output Report

After completion, provide a summary:

```
## Implementation Report

**Mode:** CREATE | UPDATE
**Component:** {component-name}
**Category:** {category}

### Files Created
- packages/{category}/{component}/src/{component}.tsx
- packages/{category}/{component}/src/{component}-item.tsx
- packages/{category}/{component}/src/index.ts
- packages/{category}/{component}/package.json
- packages/{category}/{component}/tsconfig.json
- packages/{category}/{component}/rslib.config.ts

### Files Updated (UPDATE mode only)
- {file}: {description of change}

### Build Status
- bun install: [SUCCESS | FAILED]
- bun run build: [SUCCESS | FAILED]
- bun run typecheck: [SUCCESS | FAILED]

### Next Steps
- [ ] Review generated code
- [ ] Add tests: `packages/{category}/{component}/src/{component}.test.tsx`
- [ ] Create llms.md documentation
- [ ] Test in playground app
```

## Conflict Handling (UPDATE Mode)

When existing code differs from spec expectations:

1. **Detect custom code** - Code that doesn't match spec patterns
2. **Never silently overwrite** - Always show the conflict
3. **Ask for resolution:**
   - Accept: Apply the spec-driven change
   - Skip: Keep existing code
   - Manual: User provides alternative

## Design Decisions

1. **Styles location:** Inline in component files (not separate styles.ts) unless the spec explicitly requires it
2. **'use client' directive:** Always include for React Aria wrapper components
3. **forwardRef:** Use for simple components without React Aria; React Aria components handle refs internally
4. **displayName:** Always set to `@urban-ui/{component}`
5. **Props interface:** Extend from React Aria props, omit `style` and `className`, add StyleX `style` prop

## Reference Components

Study these existing components for patterns:

- **Simple component:** `packages/feedback/tag/src/tag.tsx` - Inline styles, forwardRef, style array composition
- **React Aria wrapper:** `packages/interaction/select/src/select.tsx` - 'use client', prop extension, internal composition
- **Item with states:** `packages/interaction/select/src/select-item.tsx` - Data attribute styling, render props

## Example Usage

```
/component:implement docs/listbox.spec.md
/component:implement docs/menu.spec.md
```
