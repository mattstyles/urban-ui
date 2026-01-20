# Text

Typography component for rendering text.

## Basic Usage

```tsx
import { Text } from '@urban-ui/text'

<Text size="lg">Hello world</Text>
```

## Size Scale

Sizes set font-size, line-height, and letter-spacing together:

| Size | Use |
|------|-----|
| `xxs` | Fine print |
| `xs` | Captions |
| `sm` | Secondary text |
| `md` | Body text (default) |
| `lg` | Subheadings |
| `xl` | Section headings |
| `xxl` | Page titles |

```tsx
<Text size="xxl">Page Title</Text>
<Text size="lg">Section heading</Text>
<Text size="md">Body text</Text>
<Text size="sm">Secondary info</Text>
```

## asChild

Use `asChild` to apply Text styles to a child element instead of rendering a wrapper `span`:

```tsx
// Apply text styles to a heading
<Text size="xxl" weight="bold" asChild>
  <h1>Page Title</h1>
</Text>

// Apply text styles to a link
<Text size="sm" color="lo" asChild>
  <a href="/about">Learn more</a>
</Text>
```

The child element receives all Text styling props while preserving its semantic meaning.

## Tonal Colors

Text responds to themes. Wrap text in a theme to change its color:

```tsx
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'

<div {...stylex.props(themes.critical)}>
  <Text color="hi">Error message</Text>
</div>

<div {...stylex.props(themes.positive)}>
  <Text color="hi">Success message</Text>
</div>
```

The `color` prop selects which tonal foreground to use:
- `hi` - High contrast foreground
- `lo` - Low contrast foreground
- `onBlock` - For text on solid backgrounds

### Inline Emphasis

Use `asChild` with a theme to emphasize a word within a sentence:

```tsx
<Text size="md">
  Build interfaces with{' '}
  <Text asChild color="hi" style={themes.accent}>
    <span>accessibility</span>
  </Text>{' '}
  built in.
</Text>
```

## Manual Styling

Apply text styles directly to elements without the Text component:

```tsx
import * as stylex from '@stylexjs/stylex'
import { styles, sizes, weights, fontColors } from '@urban-ui/styles/text'

<h1 {...stylex.props(styles.base, sizes.xxl, weights.bold, fontColors.hi)}>
  Styled heading
</h1>
```

Available style objects:
- `styles` - Base text styles
- `sizes` - Font size scale (`xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `inherit`)
- `weights` - Font weights (`light`, `normal`, `medium`, `semibold`, `bold`)
- `fontFamilies` - Font families (`display`, `body`, `mono`)
- `fontColors` - Text colors (`current`, `hi`, `lo`, `onBlock`, `transparent`)
- `tracking` - Letter spacing (`tighter`, `tight`, `normal`, `wide`, `wider`, `widest`)
- `textBox` - Text box trimming (`alphabetic`, `auto`, `none`)
