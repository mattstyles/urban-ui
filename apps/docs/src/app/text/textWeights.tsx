import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes } from '@urban-ui/theme/type.stylex'

const styles = stylex.create({
  container: {
    backgroundColor: tone.surface,
    padding: space[100],
    width: '100%',
  },
  weightLabel: {
    fontSize: fontSizes.sm,
    color: tone.fgLo,
    marginInlineEnd: space[200],
    width: '5rem',
  },
})

export function TextWeights() {
  return (
    <Flex direction="v" gap="200">
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.weightLabel)}>light</span>
          <Text weight="light">
            Light weight text with minimal visual emphasis
          </Text>
        </Flex>
      </div>
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.weightLabel)}>normal</span>
          <Text weight="normal">
            Normal weight text for standard body content
          </Text>
        </Flex>
      </div>
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.weightLabel)}>medium</span>
          <Text weight="medium">Medium weight text for subtle emphasis</Text>
        </Flex>
      </div>
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.weightLabel)}>semibold</span>
          <Text weight="semibold">
            Semi-bold weight text for strong emphasis
          </Text>
        </Flex>
      </div>
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.weightLabel)}>bold</span>
          <Text weight="bold">Bold weight text for maximum emphasis</Text>
        </Flex>
      </div>
    </Flex>
  )
}
