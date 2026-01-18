import * as stylex from '@stylexjs/stylex'
import { Test } from '@urban-ui/test'
import { Test2 } from '@urban-ui/test2'
import { accent } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

import { vars } from './vars.stylex'

const styles = stylex.create({
  page: {
    padding: space.md,
    color: accent.fgHi,
  },

  container: {
    backgroundColor: vars.bgPrimary,
  },
})

export default function Home() {
  return (
    <div {...stylex.props(styles.page)}>
      <h1>Hello World</h1>
      <Test variant="violet">Test</Test>
      <Test variant="gray">Test</Test>
      <hr style={{ marginBlock: 20 }} />
      <div {...stylex.props(styles.container)}>Hello world</div>
      <hr style={{ marginBlock: 20 }} />
      <h2>Test2 - Tonal Variants</h2>
      <Test2 tone="neutral">Neutral</Test2>
      <Test2 tone="primary">Primary</Test2>
      <Test2 tone="accent">Accent</Test2>
      <Test2 tone="positive">Positive</Test2>
      <Test2 tone="warning">Warning</Test2>
      <Test2 tone="critical">Critical</Test2>
      <Test2 tone="info">Info</Test2>
    </div>
  )
}
