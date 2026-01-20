# Layout

Layout components for structuring pages and features.

## Flex

The `Flex` component handles most layout requirements. It provides a declarative API for CSS flexbox.

```tsx
import { Flex } from '@urban-ui/flex'

<Flex direction="column" gap="200">
  <Header />
  <Main />
  <Footer />
</Flex>
```

### Direction

Use `direction` to control flow. Supports aliases for convenience:

```tsx
<Flex direction="row">...</Flex>      // horizontal (default)
<Flex direction="column">...</Flex>   // vertical
<Flex direction="h">...</Flex>        // alias for row
<Flex direction="v">...</Flex>        // alias for column
```

### Gap

Gap values use the space scale (`0`-`900`):

```tsx
<Flex gap="200">...</Flex>
<Flex columnGap="100" rowGap="300">...</Flex>
```

### Alignment

```tsx
<Flex align="center" justify="space-between">...</Flex>
```

### Custom Styles

Pass additional StyleX styles via the `style` prop:

```tsx
import * as stylex from '@stylexjs/stylex'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  container: { padding: space[400] },
})

<Flex style={styles.container}>...</Flex>
```

### asChild

Use `asChild` to apply Flex styles to a semantic element instead of a `div`:

```tsx
<Flex asChild direction="column" gap="200">
  <main>
    <article>...</article>
    <article>...</article>
  </main>
</Flex>

<Flex asChild direction="row" gap="100">
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</Flex>
```

The child element receives all Flex layout styles while preserving its semantic meaning.
