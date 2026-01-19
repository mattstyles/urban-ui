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
  trackingLabel: {
    fontSize: fontSizes.sm,
    color: tone.fgLo,
    marginInlineEnd: space[200],
    width: '5rem',
    flexShrink: 0,
  },
  textContent: {
    maxWidth: '48rem',
  },
})

export function TextTracking() {
  return (
    <Flex direction="v" gap="200">
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.trackingLabel)}>tighter</span>
          <div {...stylex.props(styles.textContent)}>
            <Text size="lg" tracking="tighter" asChild>
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
          <span {...stylex.props(styles.trackingLabel)}>tight</span>
          <div {...stylex.props(styles.textContent)}>
            <Text size="lg" tracking="tight" asChild>
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
          <span {...stylex.props(styles.trackingLabel)}>normal</span>
          <div {...stylex.props(styles.textContent)}>
            <Text size="lg" tracking="normal" asChild>
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
          <span {...stylex.props(styles.trackingLabel)}>wide</span>
          <div {...stylex.props(styles.textContent)}>
            <Text size="lg" tracking="wide" asChild>
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
          <span {...stylex.props(styles.trackingLabel)}>wider</span>
          <div {...stylex.props(styles.textContent)}>
            <Text size="lg" tracking="wider" asChild>
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
          <span {...stylex.props(styles.trackingLabel)}>widest</span>
          <div {...stylex.props(styles.textContent)}>
            <Text size="lg" tracking="widest" asChild>
              <p>
                The quick brown fox jumps over the lazy dog. Pack my box with
                five dozen liquor jugs.
              </p>
            </Text>
          </div>
        </Flex>
      </div>
    </Flex>
  )
}
