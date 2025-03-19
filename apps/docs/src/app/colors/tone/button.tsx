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
    borderColor: tone.border,
    borderRadius: radii.lg,
  },
  solid: {
    color: tone.fgOnBlock,
    background: tone.solid,
    ':hover': {
      background: tone.solidHover,
    },
    ':active': {
      background: tone.solidActive,
    },
  },
  transparent: {
    background: base.transparent,
    color: tone.fgHi,
  },
  borderInteractive: {
    borderColor: tone.border,
    ':hover': {
      borderColor: tone.borderMuted,
      background: tone.componentHover,
    },
    ':active': {
      borderColor: tone.border,
      background: tone.componentActive,
    },
  },
  shape: {
    paddingLeft: space['300'],
    paddingRight: space['300'],
    paddingTop: space['100'],
    paddingBottom: space['100'],
  },
})
