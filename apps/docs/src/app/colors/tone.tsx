import * as stylex from '@stylexjs/stylex'
import type { Theme } from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import { Text } from '@urban-ui/text'
import { primary, tone } from '@urban-ui/theme/colors.stylex'

const styles = stylex.create({
  block: {
    width: '100%',
    height: '64px',
  },
  fgHi: {
    backgroundColor: tone.fgHi,
  },
  fgLo: {
    backgroundColor: tone.fgLo,
  },
  fgOnBlock: {
    backgroundColor: tone.fgOnBlock,
  },
  // fgInvertHi: {
  //   backgroundColor: tone.fgInvertHi,
  // },
  // fgInvertLo: {
  //   backgroundColor: tone.fgInvertLo,
  // },
  surfaceMuted: {
    backgroundColor: tone.surfaceMuted,
  },
  surfaceBase: {
    backgroundColor: tone.surfaceBase,
  },
  surfaceSubtle: {
    backgroundColor: tone.surfaceSubtle,
  },
  surfaceEmphasis: {
    backgroundColor: tone.surfaceEmphasis,
  },
  elementMutedBase: {
    backgroundColor: tone.elementMutedBase,
  },
  elementMutedHover: {
    backgroundColor: tone.elementMutedHover,
  },
  elementMutedPress: {
    backgroundColor: tone.elementMutedPress,
  },
  elementMutedSelected: {
    backgroundColor: tone.elementMutedSelected,
  },
  elementEmphasisBase: {
    backgroundColor: tone.elementEmphasisBase,
  },
  elementEmphasisHover: {
    backgroundColor: tone.elementEmphasisHover,
  },
  elementEmphasisPress: {
    backgroundColor: tone.elementEmphasisPress,
  },
  elementEmphasisSelected: {
    backgroundColor: tone.elementEmphasisSelected,
  },
  borderMuted: {
    backgroundColor: tone.borderMuted,
  },
  borderBase: {
    backgroundColor: tone.borderBase,
  },
  borderSubtle: {
    backgroundColor: tone.borderSubtle,
  },
  borderEmphasis: {
    backgroundColor: tone.borderEmphasis,
  },
})

type ColorBlockProps = {
  colorStyle: keyof typeof styles
}

function ColorBlock({ colorStyle }: ColorBlockProps) {
  return (
    <Flex direction="column" gap="100">
      <Text size="sm">{colorStyle.toString()}</Text>
      <div {...stylex.props(styles.block, styles[colorStyle])} />
    </Flex>
  )
}

type ToneBlockProps = {
  theme?: Theme<typeof tone>
}

export function ToneBlock({ theme }: ToneBlockProps) {
  return (
    <Flex direction="column" gap="300" style={theme}>
      <ColorBlock colorStyle="fgHi" />
      <ColorBlock colorStyle="fgLo" />
      <ColorBlock colorStyle="fgOnBlock" />
      {/* <ColorBlock colorStyle="fgInvertHi" />
      <ColorBlock colorStyle="fgInvertLo" /> */}
      <ColorBlock colorStyle="surfaceMuted" />
      <ColorBlock colorStyle="surfaceBase" />
      <ColorBlock colorStyle="surfaceSubtle" />
      <ColorBlock colorStyle="surfaceEmphasis" />
      <ColorBlock colorStyle="elementMutedBase" />
      <ColorBlock colorStyle="elementMutedHover" />
      <ColorBlock colorStyle="elementMutedPress" />
      <ColorBlock colorStyle="elementMutedSelected" />
      <ColorBlock colorStyle="elementEmphasisBase" />
      <ColorBlock colorStyle="elementEmphasisHover" />
      <ColorBlock colorStyle="elementEmphasisPress" />
      <ColorBlock colorStyle="elementEmphasisSelected" />
      <ColorBlock colorStyle="borderMuted" />
      <ColorBlock colorStyle="borderBase" />
      <ColorBlock colorStyle="borderSubtle" />
      <ColorBlock colorStyle="borderEmphasis" />
    </Flex>
  )
}
