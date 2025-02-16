import stylex from '@stylexjs/stylex'

import { fontSizes, fontWeights } from '@urban-ui/theme/type.stylex'
import { grays } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { TextExamples } from './textExamples'
import { TextWeights } from './textWeights'

const styles = stylex.create({
  title: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    color: grays[900],
    marginBlockEnd: space[200],
  },
  description: {
    fontSize: fontSizes.md,
    color: grays[700],
    marginBlockEnd: space[400],
  },
  container: {
    padding: space[200],
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    color: grays[800],
    marginBlockEnd: space[200],
    marginBlockStart: space[400],
  },
})

export default function TextPage() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.title)}>Text Component</h1>
      <p {...stylex.props(styles.description)}>
        The Text component is a foundational building block for typography in
        the Urban UI design system. It provides consistent text styling with
        support for different sizes, weights, and colors while maintaining the
        design system&apos;s typographic scale.
      </p>
      <p {...stylex.props(styles.description)}>
        Urban UI text uses a fluid scale that adapts to the viewport width. Each
        size includes appropriate line height and letter spacing optimizations,
        with &apos;md&apos; serving as the baseline size.
      </p>

      <h2 {...stylex.props(styles.sectionTitle)}>Text Sizes</h2>
      <TextExamples />

      <h2 {...stylex.props(styles.sectionTitle)}>Font Weights</h2>
      <TextWeights />
    </div>
  )
}
