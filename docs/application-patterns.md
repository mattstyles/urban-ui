# Application Patterns

Cross-component composition patterns for urban-ui applications.

## Root Layout

```tsx
import * as stylex from '@stylexjs/stylex'
import { themes, presets } from '@urban-ui/theme'
import { surface } from '@urban-ui/theme/colors.stylex'

const styles = stylex.create({
  root: {
    minHeight: '100vh',
    backgroundColor: surface.base,
  },
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body {...stylex.props(styles.root, presets.body, themes.neutral)}>
        {children}
      </body>
    </html>
  )
}
```

## Themed Sections

Apply themes to color entire sections:

```tsx
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { tone } from '@urban-ui/theme/colors.stylex'

const styles = stylex.create({
  banner: {
    backgroundColor: tone.surface,
    padding: space['300'],
    borderRadius: radii.lg,
  },
})

// Success banner
<Flex style={[styles.banner, themes.positive]} direction="column" gap="100">
  <Text weight="semibold">Payment successful</Text>
  <Text color="lo">Your order has been confirmed.</Text>
</Flex>

// Error banner
<Flex style={[styles.banner, themes.critical]} direction="column" gap="100">
  <Text weight="semibold">Error occurred</Text>
  <Text color="lo">Please try again.</Text>
</Flex>
```

## Common Layouts

### Page with constrained content

```tsx
import { Flex } from '@urban-ui/flex'
import { sizes, space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  page: {
    minHeight: '100vh',
    paddingBlock: space['400'],
    paddingInline: space['200'],
  },
  content: {
    maxWidth: sizes.contentWide,
    marginInline: 'auto',
    width: sizes.full,
  },
})

<Flex direction="column" style={styles.page}>
  <Flex direction="column" gap="400" style={styles.content}>
    {children}
  </Flex>
</Flex>
```

### Header with navigation

```tsx
<Flex justify="space-between" align="center">
  <Text size="lg" weight="bold">Logo</Text>
  <Flex gap="300">
    <Link href="/features">Features</Link>
    <Link href="/docs">Docs</Link>
  </Flex>
  <Flex gap="100">
    <Button variant="ghost" tone="neutral">Sign in</Button>
    <Button tone="primary">Get started</Button>
  </Flex>
</Flex>
```

### Card

```tsx
const styles = stylex.create({
  card: {
    backgroundColor: tone.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tone.borderMuted,
    padding: space['300'],
  },
})

<Flex direction="column" gap="200" style={styles.card}>
  <Text size="lg" weight="semibold">{title}</Text>
  <Text color="lo">{description}</Text>
</Flex>
```

### Action bar

```tsx
<Flex justify="flex-end" gap="100">
  <Button variant="ghost" tone="neutral">Cancel</Button>
  <Button tone="primary">Save</Button>
</Flex>
```

## Responsive Patterns

```tsx
const styles = stylex.create({
  container: {
    flexDirection: {
      default: 'column',
      '@media (min-width: 768px)': 'row',
    },
    padding: {
      default: space['200'],
      '@media (min-width: 768px)': space['400'],
    },
  },
})
```
