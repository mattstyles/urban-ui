'use client'

// import { colors } from '@stylexjs/open-props/lib/colors.stylex'
import stylex from '@stylexjs/stylex'
import { theme } from '@urban-ui/fr-theme/theme.stylex'
import { Section } from './components/section'

const styles = stylex.create({
  heading: {
    color: theme.primary,
  },
})

export function Content() {
  return (
    <Section>
      <h2 {...stylex.props(styles.heading)}>Content</h2>
      <p>Heading above should be purple.</p>
      <p>The colour comes from a token declared in an external package.</p>
    </Section>
  )
}
