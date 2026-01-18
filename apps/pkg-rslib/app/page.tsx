import * as stylex from '@stylexjs/stylex'
import { Test } from '@urban-ui/test'
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
    </div>
  )
}
