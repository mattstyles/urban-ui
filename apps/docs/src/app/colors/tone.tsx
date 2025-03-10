import * as stylex from '@stylexjs/stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { Flex } from '@urban-ui/flex'

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
  fgInvertHi: {
    backgroundColor: tone.fgInvertHi,
  },
  fgInvertLo: {
    backgroundColor: tone.fgInvertLo,
  },
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
  return <div {...stylex.props(styles.block, styles[colorStyle])} />
}

export function ToneBlock() {
  return (
    <Flex direction="column" gap="100">
      <ColorBlock colorStyle="fgHi" />
      <ColorBlock colorStyle="fgLo" />
      <ColorBlock colorStyle="fgInvertHi" />
      <ColorBlock colorStyle="fgInvertLo" />
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
