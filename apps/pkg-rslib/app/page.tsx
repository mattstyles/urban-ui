import * as stylex from '@stylexjs/stylex'
import { Test } from '@urban-ui/test'

const styles = stylex.create({
  page: {
    padding: '1rem',
    color: 'hotpink',
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
