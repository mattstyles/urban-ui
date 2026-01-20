# Link

Navigation component for navigating between pages or to external resources.

## Basic Usage

```tsx
import { Link } from '@urban-ui/link'

<Link href="/about">About us</Link>
```

## Variants

Links have three display variants:

| Variant | Use |
|---------|-----|
| `text` | Inline text links with underline (default) |
| `solid` | Colored text without underline |
| `clear` | Inherits all styles from parent |

```tsx
<Link href="/docs" variant="text">Documentation</Link>
<Link href="/docs" variant="solid">Documentation</Link>
<Link href="/docs" variant="clear">Documentation</Link>
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
<Link href="/help" tone="info">Help</Link>
<Link href="/delete" tone="critical">Delete account</Link>
```

## Display as Button

Use `display="button"` to render a link with button styling:

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
- `size`: `sm`, `md`, `lg`
- `shape`: `square`, `rounded`, `pill`

## asChild

Use `asChild` to apply Link styles to a custom link element. This is essential for framework-specific routing:

```tsx
// With Tanstack Router
import { Link as RouterLink } from '@tanstack/react-router'
import { Link } from '@urban-ui/link'

<Link asChild>
  <RouterLink to="/dashboard">Dashboard</RouterLink>
</Link>

// With Next.js
import NextLink from 'next/link'

<Link asChild>
  <NextLink href="/dashboard">Dashboard</NextLink>
</Link>
```

The child element receives Link styling while using its native navigation behavior.

## Inline Links

Links work naturally within Text components:

```tsx
import { Link } from '@urban-ui/link'
import { Text } from '@urban-ui/text'

<Text>
  Read our <Link href="/privacy">privacy policy</Link> for more information.
</Text>
```

## Disabled State

```tsx
<Link href="/unavailable" isDisabled>
  Currently unavailable
</Link>
```

## Accessibility

- Built on React Aria's Link component
- Keyboard navigation support
- Focus ring on keyboard focus
- Proper link semantics
