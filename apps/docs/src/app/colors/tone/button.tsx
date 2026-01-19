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
import { fontWeights } from '@urban-ui/theme/type.stylex'

import { Container } from './container'

export function ButtonExample() {
  return (
    <Container>
      <button {...stylex.props(styles.solid, styles.shape)}>Solid</button>
      <button {...stylex.props(styles.component, styles.shape)}>
        Bordered + component
      </button>
      <button {...stylex.props(styles.transparent, styles.shape)}>
        Bordered + transparent
      </button>
    </Container>
  )
}

const styles = stylex.create({
  solid: {
    color: tone.fgOnBlock,
    backgroundColor: tone.solid,
    borderRadius: radii.lg,
    borderStyle: borderStyles.none,
    fontWeight: fontWeights.medium,
    ':hover': {
      backgroundColor: tone.solidHover,
    },
    ':active': {
      backgroundColor: tone.solidActive,
    },
  },
  component: {
    color: tone.fgHi,
    backgroundColor: tone.component,
    borderRadius: radii.lg,
    borderColor: tone.borderMuted,
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.md,
    ':hover': {
      backgroundColor: tone.componentHover,
    },
    ':active': {
      backgroundColor: tone.componentActive,
    },
  },
  transparent: {
    backgroundColor: base.transparent,
    color: tone.fgHi,
    borderColor: tone.border,
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.md,
    borderRadius: radii.lg,
    ':hover': {
      backgroundColor: tone.componentHover,
    },
    ':active': {
      backgroundColor: tone.componentActive,
    },
  },
  shape: {
    paddingLeft: space['300'],
    paddingRight: space['300'],
    paddingTop: space['100'],
    paddingBottom: space['100'],
  },
})
