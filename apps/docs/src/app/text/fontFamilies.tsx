import * as stylex from '@stylexjs/stylex'

import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { tone } from '@urban-ui/theme/colors.stylex'
import { sizes, space } from '@urban-ui/theme/layout.stylex'
import { fontSizes, fonts } from '@urban-ui/theme/type.stylex'

const styles = stylex.create({
  container: {
    background: tone.surfaceBase,
    padding: space[100],
    width: '100%',
  },
  fontLabel: {
    fontSize: fontSizes.sm,
    color: tone.fgLo,
    marginInlineEnd: space[200],
    width: '6rem',
    flexShrink: 0,
  },
  textContent: {
    maxWidth: sizes.contentWide,
  },
})

const fontFamilies = stylex.createTheme(fonts, {
  display: 'Roboto, system-ui, sans-serif',
  body: 'Roboto, system-ui, sans-serif',
  mono: 'monospace',
})

export function FontFamilies() {
  return (
    <Flex direction="v" gap="200" style={fontFamilies}>
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.fontLabel)}>display</span>
          <Flex gap="300" direction="v" style={styles.textContent}>
            <Text size="lg" font="display" asChild>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
                diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula
                ac quam viverra nec consectetur ante hendrerit.
              </p>
            </Text>
            <Text size="md" font="display" asChild>
              <p>
                Pellentesque nec nam aliquam sem et tortor consequat. Ultrices
                sagittis orci a scelerisque purus semper eget duis at.
              </p>
            </Text>
          </Flex>
        </Flex>
      </div>
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.fontLabel)}>body</span>
          <Flex gap="300" direction="v" style={styles.textContent}>
            <Text size="lg" font="body" asChild>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
                diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula
                ac quam viverra nec consectetur ante hendrerit.
              </p>
            </Text>
            <Text size="md" font="body" asChild>
              <p>
                Pellentesque nec nam aliquam sem et tortor consequat. Ultrices
                sagittis orci a scelerisque purus semper eget duis at.
              </p>
            </Text>
          </Flex>
        </Flex>
      </div>
      <div {...stylex.props(styles.container)}>
        <Flex gap="100" align="center">
          <span {...stylex.props(styles.fontLabel)}>mono</span>
          <Flex gap="300" direction="v" style={styles.textContent}>
            <Text size="lg" font="mono" asChild>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
                diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula
                ac quam viverra nec consectetur ante hendrerit.
              </p>
            </Text>
            <Text size="md" font="mono" asChild>
              <p>
                Pellentesque nec nam aliquam sem et tortor consequat. Ultrices
                sagittis orci a scelerisque purus semper eget duis at.
              </p>
            </Text>
          </Flex>
        </Flex>
      </div>
    </Flex>
  )
}
