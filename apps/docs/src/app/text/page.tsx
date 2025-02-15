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
    width: '100%',
  },
  sizeLabel: {
    fontSize: fontSizes.sm,
    color: grays[500],
    marginInlineEnd: space[200],
    width: '3rem',
  },
})

const custom = stylex.create({
  textBlockIndicator: {
    // background: grays[200],
    background: 'hotpink',
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

      <Flex direction="v" gap="200">
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>xxs</span>
            <Text
              size="xxs"
              // style={stylex.props(custom.textBlockIndicator).style}
              style={custom.textBlockIndicator}
            >
              Extra extra small text with optimized letter spacing for
              readability
            </Text>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>xs</span>
            <Text size="xs">
              Extra small text with enhanced spacing for small sizes
            </Text>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>sm</span>
            <Text size="sm">Small text with comfortable reading metrics</Text>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>md</span>
            <Text size="md">
              Medium text (default) with optimal reading line height
            </Text>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>lg</span>
            <Text size="lg">
              Large text with adjusted spacing for headlines
            </Text>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>xl</span>
            <Text size="xl">Extra large text with tighter letter spacing</Text>
          </Flex>
        </div>
        <div {...stylex.props(styles.textContainer)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.sizeLabel)}>xxl</span>
            <Text size="xxl">Extra extra large text optimized for display</Text>
          </Flex>
        </div>
      </Flex>
    </div>
  )
}
