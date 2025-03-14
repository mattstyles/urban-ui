'use client'

import * as stylex from '@stylexjs/stylex'
import { Flex } from '@urban-ui/flex'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'

import { Container } from './container'

export function ButtonExample() {
  return (
    <Container>
      <button {...stylex.props(styles.border, styles.solid, styles.shape)}>
        Bordered + solid
      </button>
      <button
        {...stylex.props(
          styles.border,
          styles.transparent,
          styles.shape,
          styles.borderInteractive,
        )}
      >
        Bordered + transparent
      </button>
    </Container>
  )
}

const styles = stylex.create({
  border: {
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.md,
    borderColor: tone.borderBase,
    borderRadius: radii.lg,
  },
  solid: {
    color: tone.fgOnBlock,
    background: tone.elementEmphasisBase,
    ':hover': {
      background: tone.elementEmphasisHover,
    },
    ':active': {
      background: tone.elementEmphasisPress,
    },
  },
  transparent: {
    background: base.transparent,
    color: tone.fgHi,
  },
  borderInteractive: {
    borderColor: tone.borderBase,
    ':hover': {
      borderColor: tone.borderSubtle,
      background: tone.elementMutedHover,
    },
    ':active': {
      borderColor: tone.borderEmphasis,
      background: tone.elementMutedPress,
    },
  },
  shape: {
    paddingLeft: space['300'],
    paddingRight: space['300'],
    paddingTop: space['100'],
    paddingBottom: space['100'],
  },
})
