# Link

Enriches elements with link behavior for navigation. Primarily used within Text to create inline links.

## Basic Usage

Link should be placed within Text to inherit typography styling:

```tsx
import { Link } from '@urban-ui/link'
import { Text } from '@urban-ui/text'

// Inline link within text
<Text>
  Read our <Link href="/about">about page</Link> for more information.
</Text>

// Standalone link
<Text>
  <Link href="/about">About us</Link>
</Text>
```

Using Link bare (outside Text) will not have correct text styling. The exception is `display="button"` which provides its own styling.

## Variants

Links have three display variants:

| Variant | Use |
|---------|-----|
| `text` | Inline text links with underline (default) |
| `solid` | Colored text without underline |
| `clear` | Inherits all styles from parent |

```tsx
<Text>
  <Link href="/docs" variant="text">Documentation</Link>
</Text>
<Text>
  <Link href="/docs" variant="solid">Documentation</Link>
</Text>
<Text>
  <Link href="/docs" variant="clear">Documentation</Link>
</Text>
```

## Tones

Color tones for semantic meaning:

| Tone | Use |
|------|-----|
| `info` | Default link color |
| `neutral` | Subtle, blends with text |
| `primary` | Brand emphasis |
| `accent` | Secondary brand |
| `positive` | Success actions |
| `warning` | Caution actions |
| `critical` | Destructive actions |

```tsx
<Text>
  <Link href="/help" tone="info">Help</Link>
</Text>
<Text>
  <Link href="/delete" tone="critical">Delete account</Link>
</Text>
```

## Display as Button

Use `display="button"` to render a link with button styling. This does not require Text wrapping:

```tsx
<Link href="/signup" display="button" variant="solid" tone="primary">
  Get started
</Link>

<Link href="/login" display="button" variant="ghost" tone="neutral">
  Sign in
</Link>
```

When `display="button"`, these props are available:
- `variant`: `solid`, `ghost`, `outline`, `muted` (button variants)
- `size`: `md`, `lg`
- `shape`: `square`, `rounded`, `pill`

## asChild

Use `asChild` on Link to apply styles to a custom link element. This is essential for framework-specific routing:

```tsx
// With Tanstack Router
import { Link as RouterLink } from '@tanstack/react-router'
import { Link } from '@urban-ui/link'
import { Text } from '@urban-ui/text'

<Text>
  <Link asChild>
    <RouterLink to="/dashboard">Dashboard</RouterLink>
  </Link>
</Text>

// With Next.js
import NextLink from 'next/link'

<Text>
  <Link asChild>
    <NextLink href="/dashboard">Dashboard</NextLink>
  </Link>
</Text>
```

The child element receives Link styling while using its native navigation behavior.

## Disabled State

```tsx
<Text>
  <Link href="/unavailable" isDisabled>
    Currently unavailable
  </Link>
</Text>
```

## Custom Styling for Navigation

Use `variant="clear"` to strip default link styles and apply fully custom styling via the `style` prop. This is useful for site navigation elements like icon bars or custom nav items.

```tsx
import { Link as RouterLink } from '@tanstack/react-router'
import { Link } from '@urban-ui/link'

// Simplified nav item with custom hover states
<Link asChild variant="clear" style={[styles.navItem, stylex.defaultMarker()]}>
  <RouterLink to="/home" aria-label="Home">
    <HomeIcon />
  </RouterLink>
</Link>
```

Style the nav item with StyleX pseudo-selectors for hover and active states:

```tsx
// styles.navItem (simplified)
{
  backgroundColor: {
    default: 'transparent',
    ':hover': tone.solidHover,
    ':active': tone.solidActive,
  },
}
```

For child elements that respond to parent hover state, use `stylex.when.ancestor(':hover')` with `stylex.defaultMarker()` on the parent:

```tsx
// Parent element must include stylex.defaultMarker() in its style array
<Link style={[styles.navItem, stylex.defaultMarker()]}>...</Link>

// Child style using ancestor selector
{
  width: {
    default: 0,
    [stylex.when.ancestor(':hover')]: 24,
  },
}
```

See `apps/tanstack/src/routes/patterns/link/nav-item.tsx` for a complete implementation with hover accent bar animation.

## Accessibility

- Built on React Aria's Link component
- Keyboard navigation support
- Focus ring on keyboard focus
- Proper link semantics
