
# Theme

## Tokens

Individual tokens are defined in their respective tokens files. These are always mapped to css variables.

```ts
import { space } from '@urban-ui/theme/layout.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'

// Usage
const styles = stylex.create({
  container: {
    margin: space[100],
    color: tone.fgHi,
    backgroundColor: tone.surfaceBase
  },
})

<div {...stylex.props(styles.container)}></div>
```

## Themes

Colours are defined as a collection of tokens called a tone. These collections are exported as individual tokens and also as a theme.

Themes can override a set value; where you want to have contextual values use tokens from the `tone` colour space.

```ts
import { tone } from '@urban-ui/theme/colors.stylex'

// Usage
const styles = stylex.create({
  container: {
    color: tone.fgHi,
    backgroundColor: tone.surfaceBase
  },
})

export function ContextAwareColours() {
  return <div {...stylex.props(styles.container)}></div>
}
```

Use theme variables to provide contextual values.

```ts
import { tone } from '@urban-ui/theme/colors.stylex'
import { primary } from '@urban-ui/theme' 

// Usage - will render primary foreground and surface colours
<div {...stylex.props(primary)}>
  <ContextAwareColours />
</div>
```

You can mix and match between individual tokens from a given tone and the contextual tone variables.

```ts
import { tone, primary as primaryTokens } from '@urban-ui/theme/colors.stylex'
import { primary } from '@urban-ui/theme

// Usage
const styles = stylex.create({
  container: {
    color: primaryTokens.fgHi,
    backgroundColor: tone.surfaceBase
  },
})

// First element will render using the primary foreground and default background colours.
// Second element will render using the primary foreground and background colours.
export function Component() {
  return (
    <>
      <div {...stylex.props(styles.container)}></div>
      <div {...stylex.props(styles.container, primary)}></div>
    </>
  )
}
```



## Extensions / TODO

### Token and theme generation

Stylex compiler normally wants to work against raw values, e.g. it can struggle when style values are defined in a separate object (I think it wants set keys to work against so as long as you specifically use static keys you can have values from elsewhere).

This can lead to duplication where we want to define a tonal scale and be able to apply that as a theme or use individual entries as tokens.

We should generate tokens and themes from source data files which define the colours that we want to use. This way we have a canonical reference and de-risk divergence from having multiple data structures which must remain synchronised.
