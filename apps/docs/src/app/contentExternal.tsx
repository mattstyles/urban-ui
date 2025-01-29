'use client'

import stylex from '@stylexjs/stylex'

import { Text } from '@urban-ui/text'
import { theme } from '@urban-ui/theme/theme.stylex'

const styles = stylex.create({
  container: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    padding: 20,
  },
  p: {
    color: theme.primary,
  },
})

export function ContentExternal() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1>Client content</h1>
      <p {...stylex.props(styles.p)}>
        Styled with external dependency and externally declared vars. Should be
        theme.primary colour.
      </p>
      <Text>Hello world</Text>
    </div>
  )
}
