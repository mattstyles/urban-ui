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
  // surfaceSubtle: {
  //   backgroundColor: tone.surfaceSubtle,
  // },
  // surfaceEmphasis: {
  //   backgroundColor: tone.surfaceEmphasis,
  // },
  componentBase: {
    backgroundColor: tone.componentBase,
  },
  componentHover: {
    backgroundColor: tone.componentHover,
  },
  componentPress: {
    backgroundColor: tone.componentPress,
  },
  // elementMutedSelected: {
  //   backgroundColor: tone.elementMutedSelected,
  // },

  borderMuted: {
    backgroundColor: tone.borderMuted,
  },
  borderBase: {
    backgroundColor: tone.borderBase,
  },
  // borderSubtle: {
  //   backgroundColor: tone.borderSubtle,
  // },
  // borderEmphasis: {
  //   backgroundColor: tone.borderEmphasis,
  // },

  solidBase: {
    backgroundColor: tone.solidBase,
  },
  solidHover: {
    backgroundColor: tone.solidHover,
  },
  solidPress: {
    backgroundColor: tone.solidPress,
  },
  // elementEmphasisSelected: {
  //   backgroundColor: tone.elementEmphasisSelected,
  // }
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
    <Flex direction="column" gap="500" style={theme}>
      <Flex direction="v" gap="100">
        <ColorBlock colorStyle="fgHi" />
        <ColorBlock colorStyle="fgLo" />
        <ColorBlock colorStyle="fgOnBlock" />
        {/* <ColorBlock colorStyle="fgInvertHi" />
      <ColorBlock colorStyle="fgInvertLo" /> */}
      </Flex>

      <Flex direction="v" gap="100">
        <ColorBlock colorStyle="surfaceMuted" />
        <ColorBlock colorStyle="surfaceBase" />
        {/* <ColorBlock colorStyle="surfaceSubtle" />
        <ColorBlock colorStyle="surfaceEmphasis" /> */}
      </Flex>

      <Flex direction="v" gap="100">
        <ColorBlock colorStyle="componentBase" />
        <ColorBlock colorStyle="componentHover" />
        <ColorBlock colorStyle="componentPress" />
        {/* <ColorBlock colorStyle="componentSelected" /> */}
      </Flex>

      <Flex direction="v" gap="100">
        <ColorBlock colorStyle="borderMuted" />
        <ColorBlock colorStyle="borderBase" />
        {/* <ColorBlock colorStyle="borderSubtle" />
        <ColorBlock colorStyle="borderEmphasis" /> */}
      </Flex>

      <Flex direction="v" gap="100">
        <ColorBlock colorStyle="solidBase" />
        <ColorBlock colorStyle="solidHover" />
        <ColorBlock colorStyle="solidPress" />
        {/* <ColorBlock colorStyle="elementEmphasisSelected" /> */}
      </Flex>
    </Flex>
  )
}
