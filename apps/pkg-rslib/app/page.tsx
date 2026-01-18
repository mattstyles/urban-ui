import * as stylex from '@stylexjs/stylex'
import { Test } from '@urban-ui/test'
import { space } from '@urban-ui/theme/layout.stylex'
import { accent } from '@urban-ui/theme/colors.stylex'

const styles = stylex.create({
  page: {
    padding: space.md,
    color: accent.fgHi,
  },
})

export default function Home() {
  return (
    <div {...stylex.props(styles.page)}>
      <h1>Hello World</h1>
      <Test variant="violet">Test</Test>
      <Test variant="gray">Test</Test>
    </div>
  )
}
