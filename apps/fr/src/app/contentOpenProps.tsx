import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import stylex from '@stylexjs/stylex'
import { Section } from './components/section'

const styles = stylex.create({
  heading: {
    color: colors.orange7,
  },
})

export function ContentOpenProps() {
  return (
    <Section>
      <h2 {...stylex.props(styles.heading)}>Content</h2>
      <p>Heading above should be orange.</p>
      <p>The colour comes from a token declared in open-props.</p>
    </Section>
  )
}
