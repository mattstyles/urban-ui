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
  surface: {
    backgroundColor: tone.surface,
  },
  // surfaceSubtle: {
  //   backgroundColor: tone.surfaceSubtle,
  // },
  // surfaceEmphasis: {
  //   backgroundColor: tone.surfaceEmphasis,
  // },
  component: {
    backgroundColor: tone.component,
  },
  componentHover: {
    backgroundColor: tone.componentHover,
  },
  componentActive: {
    backgroundColor: tone.componentActive,
  },
  // elementMutedSelected: {
  //   backgroundColor: tone.elementMutedSelected,
  // },

  borderMuted: {
    backgroundColor: tone.borderMuted,
  },
  border: {
    backgroundColor: tone.border,
  },
  // borderSubtle: {
  //   backgroundColor: tone.borderSubtle,
  // },
  // borderEmphasis: {
  //   backgroundColor: tone.borderEmphasis,
  // },

  solid: {
    backgroundColor: tone.solid,
  },
  solidHover: {
    backgroundColor: tone.solidHover,
  },
  solidActive: {
    backgroundColor: tone.solidActive,
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
        <ColorBlock colorStyle="surface" />
        {/* <ColorBlock colorStyle="surfaceSubtle" />
        <ColorBlock colorStyle="surfaceEmphasis" /> */}
      </Flex>

      <Flex direction="v" gap="100">
        <ColorBlock colorStyle="component" />
        <ColorBlock colorStyle="componentHover" />
        <ColorBlock colorStyle="componentActive" />
        {/* <ColorBlock colorStyle="componentSelected" /> */}
      </Flex>

      <Flex direction="v" gap="100">
        <ColorBlock colorStyle="borderMuted" />
        <ColorBlock colorStyle="border" />
        {/* <ColorBlock colorStyle="borderSubtle" />
        <ColorBlock colorStyle="borderEmphasis" /> */}
      </Flex>

      <Flex direction="v" gap="100">
        <ColorBlock colorStyle="solid" />
        <ColorBlock colorStyle="solidHover" />
        <ColorBlock colorStyle="solidActive" />
        {/* <ColorBlock colorStyle="elementEmphasisSelected" /> */}
      </Flex>
    </Flex>
  )
}
