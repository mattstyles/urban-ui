import * as stylex from '@stylexjs/stylex'
import type { Theme } from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { critical, neutral, primary } from '@urban-ui/theme'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

const styles = stylex.create({
  container: {
    borderRadius: radii.md,
    borderWidth: borderWidths.sm,
    borderStyle: 'solid',
    borderColor: tone.borderMuted,
    paddingLeft: space[400],
    paddingRight: space[400],
    paddingTop: space[100],
    paddingBottom: space[100],
  },
  surface: {
    backgroundColor: tone.surfaceBase,
  },
  element: {
    backgroundColor: tone.elementMutedBase,
  },
  block: {
    backgroundColor: tone.elementEmphasisBase,
    paddingLeft: space[400],
    paddingRight: space[400],
    paddingTop: space[200],
    paddingBottom: space[200],
    borderRadius: radii.sm,
  },
})

export function TextExample() {
  return (
    <Flex direction="v" gap="200">
      <Flex direction="v" gap="400">
        <Text size="lg" weight="semibold">
          Text colour examples
        </Text>
        <Text asChild>
          <p>
            Not all text contrast colours must work on all background colours,
            but this will depend on your restrictions and requirements.
          </p>
        </Text>
      </Flex>
      <TextContrast theme={neutral} />
      <TextContrast theme={primary} />
      <TextContrast theme={critical} />
    </Flex>
  )
}

function TextContrast({ theme = neutral }: { theme?: Theme<typeof tone> }) {
  return (
    <Flex direction="v" gap="200" style={theme}>
      <Flex direction="h" gap="200" align="center" style={[styles.container]}>
        <TextContrastColors />
      </Flex>
      <Flex
        direction="h"
        gap="200"
        align="center"
        style={[styles.container, styles.surface]}
      >
        <TextContrastColors />
      </Flex>
      <Flex
        direction="h"
        gap="200"
        align="center"
        style={[styles.container, styles.element]}
      >
        <TextContrastColors />
      </Flex>
    </Flex>
  )
}

function TextContrastColors() {
  return (
    <>
      <Text size="md" weight="semibold" color="hi">
        High contrast
      </Text>
      <Text size="md" weight="semibold" color="lo">
        Low contrast
      </Text>
      <div {...stylex.props(styles.block)}>
        <Text size="md" weight="semibold" color="onBlock">
          On block
        </Text>
      </div>
    </>
  )
}
