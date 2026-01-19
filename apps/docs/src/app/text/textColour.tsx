import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { themes } from '@urban-ui/theme'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes } from '@urban-ui/theme/type.stylex'

const styles = stylex.create({
  container: {
    backgroundColor: tone.surface,
    padding: space[100],
    width: '100%',
  },
  colorLabel: {
    fontSize: fontSizes.sm,
    color: tone.fgLo,
    marginInlineEnd: space[200],
    width: '5rem',
    flexShrink: 0,
  },
  textContent: {
    maxWidth: '48rem',
  },
  onBlockContainer: {
    backgroundColor: tone.solid,
    padding: space[100],
    width: '100%',
  },
})

export function TextColour() {
  return (
    <Flex direction="v" gap="300">
      <Flex direction="v" gap="200">
        <div {...stylex.props(styles.container)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.colorLabel)}>current</span>
            <div {...stylex.props(styles.textContent)}>
              <Text size="lg" color="current" asChild>
                <p>
                  The quick brown fox jumps over the lazy dog. Pack my box with
                  five dozen liquor jugs.
                </p>
              </Text>
            </div>
          </Flex>
        </div>
        <div {...stylex.props(styles.container)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.colorLabel)}>tone</span>
            <div {...stylex.props(styles.textContent)}>
              <Text size="lg" asChild>
                <p>
                  The quick brown fox jumps over the lazy dog. Pack my box with
                  five dozen liquor jugs.
                </p>
              </Text>
            </div>
          </Flex>
        </div>
        <div {...stylex.props(styles.container)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.colorLabel)}>hi</span>
            <div {...stylex.props(styles.textContent)}>
              <Text size="lg" color="hi" asChild>
                <p>
                  The quick brown fox jumps over the lazy dog. Pack my box with
                  five dozen liquor jugs.
                </p>
              </Text>
            </div>
          </Flex>
        </div>
        <div {...stylex.props(styles.container)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.colorLabel)}>lo</span>
            <div {...stylex.props(styles.textContent)}>
              <Text size="lg" color="lo" asChild>
                <p>
                  The quick brown fox jumps over the lazy dog. Pack my box with
                  five dozen liquor jugs.
                </p>
              </Text>
            </div>
          </Flex>
        </div>
        <div {...stylex.props(styles.container)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.colorLabel)}>primary</span>
            <div {...stylex.props(styles.textContent)}>
              <Text size="lg" asChild>
                <p>
                  The quick brown fox jumps over the lazy dog. Pack my box with
                  five dozen liquor jugs.
                </p>
              </Text>
            </div>
          </Flex>
        </div>
        <div {...stylex.props(styles.onBlockContainer)}>
          <Flex gap="100" align="center">
            <Text size="sm" color="onBlock" asChild>
              <span {...stylex.props(styles.colorLabel)}>onBlock</span>
            </Text>
            <div {...stylex.props(styles.textContent)}>
              <Text size="lg" color="onBlock" asChild>
                <p>
                  The quick brown fox jumps over the lazy dog. Pack my box with
                  five dozen liquor jugs.
                </p>
              </Text>
            </div>
          </Flex>
        </div>
      </Flex>
      <Text size="lg" weight="semibold">
        With theme
      </Text>
      <Flex direction="v" gap="200" style={themes.accent}>
        <div {...stylex.props(styles.container)}>
          <Flex gap="100" align="center">
            <span {...stylex.props(styles.colorLabel)}>tone</span>
            <div {...stylex.props(styles.textContent)}>
              <Text size="lg" color="hi" asChild>
                <p>
                  The quick brown fox jumps over the lazy dog. Pack my box with
                  five dozen liquor jugs.
                </p>
              </Text>
            </div>
          </Flex>
        </div>
        <div {...stylex.props(styles.onBlockContainer)}>
          <Flex gap="100" align="center">
            <Text size="sm" color="onBlock" asChild>
              <span {...stylex.props(styles.colorLabel)}>onBlock</span>
            </Text>
            <div {...stylex.props(styles.textContent)}>
              <Text size="lg" color="onBlock" asChild>
                <p>
                  The quick brown fox jumps over the lazy dog. Pack my box with
                  five dozen liquor jugs.
                </p>
              </Text>
            </div>
          </Flex>
        </div>
      </Flex>
    </Flex>
  )
}
