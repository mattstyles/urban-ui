import stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { grays } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes, fontWeights } from '@urban-ui/theme/type.stylex'

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
  textContainer: {
    background: grays[100],
    padding: space[100],
  },
  sizeLabel: {
    fontSize: fontSizes.sm,
    color: grays[500],
    marginInlineEnd: space[200],
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
        Urban UI text uses a fluid scale that will adapt to the global screen
        width.
      </p>

      <Flex direction="v" gap="200">
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>xs</span>
            <Text size="xs">Extra small text with consistent line height</Text>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>sm</span>
            <Text size="sm">Small text with consistent line height</Text>
          </Flex>
        </div>
        {/* <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>md</span>
            <Text size="md">Medium text with consistent line height</Text>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>lg</span>
            <Text size="lg">Large text with consistent line height</Text>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>xl</span>
            <Text size="xl">Extra large text with consistent line height</Text>
          </Flex>
        </div> */}
      </Flex>
    </div>
  )
}
