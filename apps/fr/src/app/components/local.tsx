import stylex from '@stylexjs/stylex'
import { tokens } from './local.stylex'
import { Section } from './section'

const styles = stylex.create({
  fg: {
    color: tokens.col,
  },
})

export function Local() {
  return (
    <Section>
      <h3 {...stylex.props(styles.fg)}>Local stylex file import.</h3>
      <p>Heading above should be hotpink colour.</p>
      <p>Colour comes from a token declared locally.</p>
    </Section>
  )
}
