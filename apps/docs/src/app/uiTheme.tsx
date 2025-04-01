'use client'

import * as stylex from '@stylexjs/stylex'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { tone } from '@urban-ui/theme/colors.stylex'

const styles = stylex.create({
  container: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    padding: 20,
  },
  p: {
    color: tone.fgHi,
  },
})

export function UIThemeContent() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1>Urban UI themed content</h1>
      <p {...stylex.props(styles.p)}>Styled with Urban UI theme.</p>
      <p {...stylex.props(styles.p, themes.accent)}>
        Styled with Urban UI accent theme.
      </p>
    </div>
  )
}
