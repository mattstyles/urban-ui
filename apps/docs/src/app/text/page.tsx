import stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { background, foreground } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes, fontWeights } from '@urban-ui/theme/type.stylex'
import { TextExamples } from './textExamples'
import { TextWeights } from './textWeights'

const styles = stylex.create({
  title: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    color: foreground.neutral,
    marginBlockStart: space[200],
  },
  description: {
    fontSize: fontSizes.md,
    color: foreground.neutral,
    // marginBlockEnd: space[400],
  },
  container: {
    padding: space[200],
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    color: foreground.neutral,
    marginBlockEnd: space[200],
    marginBlockStart: space[400],
  },
})

export default function TextPage() {
  return (
    <Flex direction="v" gap="400" style={styles.container}>
      <Flex direction="v" gap="200">
        {/** These should use dedicated h1 and p elements, with specified line gaps for capsize to work correctly */}
        <Text weight="semibold" size="xl">
          Text component
        </Text>
        <Text size="md">
          The Text component is a foundational building block for typography in
          the Urban UI design system. It provides consistent text styling with
          support for different sizes, weights, and colors while maintaining the
          design system&apos;s typographic scale.
        </Text>
        <Text size="md">
          Urban UI text uses a fluid scale that adapts to the viewport width.
          Each size includes appropriate line height and letter spacing
          optimizations, with &apos;md&apos; serving as the baseline size.
        </Text>
      </Flex>

      <Flex direction="v" gap="200">
        <h2 {...stylex.props(styles.sectionTitle)}>Text Sizes</h2>
        <TextExamples />
      </Flex>

      <Flex direction="v" gap="200">
        <h2 {...stylex.props(styles.sectionTitle)}>Font Weights</h2>
        <TextWeights />
      </Flex>
    </Flex>
  )
}
