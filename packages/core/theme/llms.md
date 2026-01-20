# Theme Tokens

## Imports

```tsx
// Themes and presets
import { themes, presets } from '@urban-ui/theme'

// Token categories (for custom styles)
import { tone, surface, base, disabled } from '@urban-ui/theme/colors.stylex'
import { space, sizes } from '@urban-ui/theme/layout.stylex'
import { fontSizes, fontWeights, fonts, lineHeights, tracking } from '@urban-ui/theme/type.stylex'
import { radii, borderWidths } from '@urban-ui/theme/borders.stylex'
```

## Colors

### Categories

| Category | Purpose |
|----------|---------|
| `base` | Generic colors (transparent, current, black, white) |
| `disabled` | Disabled state colors, consistent across application |
| `surface` | Page-level backgrounds for top-level layouts |
| `tone` | Semantic colors that change with active theme |

### Tone System

A tone contains 14 colors grouped into 6 categories:

| Category | Tokens | Purpose |
|----------|--------|---------|
| **foreground** | `fgHi`, `fgLo`, `fgOnBlock` | Text and iconography, appears "above" everything |
| **surface** | `surface`, `surfaceMuted` | Backgrounds for elements within a page (cards, tiles) |
| **component** | `component`, `componentHover`, `componentActive` | Backgrounds for interactive elements, less emphasis than solid |
| **border** | `border`, `borderMuted` | Border colors |
| **solid** | `solid`, `solidHover`, `solidActive` | Most saturated backgrounds, for high-emphasis elements (CTAs) |
| **shadow** | `shadow` | Tonal shadow color |

### Visual Hierarchy (back to front)

1. **Page surface** (`surface.*`) - Application background
2. **Tone surface** (`tone.surface`) - Elements on the page (cards, tiles)
3. **Component** (`tone.component`) - Interactive elements on surfaces
4. **Solid** (`tone.solid`) - High-emphasis elements requiring attention
5. **Foreground** (`tone.fg*`) - Text and icons on top

### Foreground Colors

| Token | Use |
|-------|-----|
| `fgHi` | Primary text, use on `surface` and `component` backgrounds |
| `fgLo` | Secondary text, use on `surface` and `component` backgrounds |
| `fgOnBlock` | Text on `solid` backgrounds |

### Interactive States

Component and solid categories have hover and active modifiers:

```tsx
const styles = stylex.create({
  button: {
    backgroundColor: {
      default: tone.component,
      ':hover': tone.componentHover,
      ':active': tone.componentActive,
    },
  },
})
```

### Applying Themes

Themes set tone values for a subtree:

```tsx
import { themes } from '@urban-ui/theme'

// All descendants use critical tone colors
<div {...stylex.props(themes.critical)}>
  <Text color="hi">Error message</Text>  {/* Uses critical.fgHi */}
</div>
```

Available themes: `neutral`, `primary`, `accent`, `positive`, `warning`, `critical`, `info`

## Space

```tsx
import { space } from '@urban-ui/theme/layout.stylex'

// Numeric scale (fixed)
space['100']  // 8px
space['200']  // 16px
space['300']  // 24px

// Semantic scale (fluid, responsive)
space.sm   // ~8-10px
space.md   // ~16-20px
space.lg   // ~24-30px
```

## Typography

```tsx
import { fontSizes, fontWeights, fonts } from '@urban-ui/theme/type.stylex'

fontSizes.md     // ~16-20px (fluid)
fontWeights.semibold
fonts.body       // Uses --font-body CSS variable
```

## Borders

```tsx
import { radii, borderWidths } from '@urban-ui/theme/borders.stylex'

radii.lg    // 8px
radii.full  // 9999px (pill)
borderWidths.sm  // 1px
```

## Root Setup

```tsx
import { themes, presets } from '@urban-ui/theme'
import { surface } from '@urban-ui/theme/colors.stylex'

const styles = stylex.create({
  root: {
    backgroundColor: surface.base,
  },
})

<body {...stylex.props(styles.root, presets.body, themes.neutral)}>
```
