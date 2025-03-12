'use client'

import { Text } from '@urban-ui/text'
import * as stylex from '@stylexjs/stylex'
import { tone } from '@urban-ui/theme/colors.stylex'

import { TestTheme } from './testTheme'

const styles = stylex.create({
  container: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    padding: 20,
  },
  p: {
    color: 'aqua',
  },
})

export function Content() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1>Client content</h1>
      <p {...stylex.props(styles.p)}>
        Styled with stylex directly. Should be aqua.
      </p>
      <TestTheme>Background red, foreground purple</TestTheme>
    </div>
  )
}
