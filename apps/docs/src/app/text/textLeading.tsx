import * as stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { tone } from '@urban-ui/theme/colors.stylex'
import { sizes, space } from '@urban-ui/theme/layout.stylex'
import { fontSizes } from '@urban-ui/theme/type.stylex'

const styles = stylex.create({
  container: {
    background: tone.surface,
    padding: space[100],
    width: '100%',
  },
  sizeLabel: {
    fontSize: fontSizes.sm,
    color: tone.fgLo,
    marginInlineEnd: space[200],
    width: '5rem',
    flexShrink: 0,
  },
  textContent: {
    maxWidth: sizes.contentWide,
  },
})

export function TextLeading() {
  return (
    <Flex direction="v" gap="200">
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.sizeLabel)}>xxs</span>
          <div {...stylex.props(styles.textContent)}>
            <Text size="xxs" asChild>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
                diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula
                ac quam viverra nec consectetur ante hendrerit.
              </p>
            </Text>
          </div>
        </Flex>
      </div>
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.sizeLabel)}>xs</span>
          <div {...stylex.props(styles.textContent)}>
            <Text size="xs" asChild>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
                diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula
                ac quam viverra nec consectetur ante hendrerit.
              </p>
            </Text>
          </div>
        </Flex>
      </div>
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.sizeLabel)}>sm</span>
          <div {...stylex.props(styles.textContent)}>
            <Text size="sm" asChild>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
                diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula
                ac quam viverra nec consectetur ante hendrerit.
              </p>
            </Text>
          </div>
        </Flex>
      </div>
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.sizeLabel)}>md</span>
          <div {...stylex.props(styles.textContent)}>
            <Text size="md" asChild>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
                diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula
                ac quam viverra nec consectetur ante hendrerit.
              </p>
            </Text>
          </div>
        </Flex>
      </div>
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.sizeLabel)}>lg</span>
          <div {...stylex.props(styles.textContent)}>
            <Text size="lg" asChild>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
                diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula
                ac quam viverra nec consectetur ante hendrerit.
              </p>
            </Text>
          </div>
        </Flex>
      </div>
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.sizeLabel)}>xl</span>
          <div {...stylex.props(styles.textContent)}>
            <Text size="xl" asChild>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
                diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula
                ac quam viverra nec consectetur ante hendrerit.
              </p>
            </Text>
          </div>
        </Flex>
      </div>
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.sizeLabel)}>xxl</span>
          <div {...stylex.props(styles.textContent)}>
            <Text size="xxl" asChild>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
                diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula
                ac quam viverra nec consectetur ante hendrerit.
              </p>
            </Text>
          </div>
        </Flex>
      </div>
    </Flex>
  )
}
