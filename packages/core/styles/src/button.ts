import * as stylex from '@stylexjs/stylex'

import { themes } from '@urban-ui/theme'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import { base, disabled, tone } from '@urban-ui/theme/colors.stylex'
import { focus } from '@urban-ui/theme/focus.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes, fontWeights } from '@urban-ui/theme/type.stylex'

export const styles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space['100'],
    paddingInline: space['400'],
    paddingBlock: space['75'],
    borderRadius: radii.lg,
    borderColor: base.transparent,
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.md,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.md,
    textDecoration: 'none',
    transition:
      'background 0.2s, border-color 0.2s, color 0.2s, transform 0.1s ease-out',
    ':is([data-pressed], :active)': {
      transform: 'scale(0.98)',
    },
    // @TODO this will appear behind other elements and should be fixed properly to always be in front
    ':is(:focus-visible, [data-focus-visible])': {
      outlineColor: focus.outlineColor,
      outlineOffset: focus.outlineOffset,
      outlineStyle: focus.outlineStyle,
      outlineWidth: focus.outlineSize,
      boxShadow: `0 0 0 ${focus.outlineSize} ${base.white}`,
      zIndex: 1,
    },
  },
  disabled: {
    ':disabled': {
      backgroundColor: disabled.background,
      color: disabled.fg,
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    ':disabled:hover': {
      backgroundColor: disabled.background,
      color: disabled.fg,
    },
    ':disabled:active': {
      transform: 'scale(1)',
    },
  },
})

export const variants = stylex.create({
  clear: {
    backgroundColor: base.transparent,
    color: tone.fgHi,
    padding: space[0],
    gap: space[0],
  },
  solid: {
    backgroundColor: tone.solid,
    color: tone.fgOnBlock,
    ':is([data-hovered], :hover)': {
      backgroundColor: tone.solidHover,
    },
    ':is([data-pressed], :active)': {
      backgroundColor: tone.solidActive,
    },
  },
  muted: {
    backgroundColor: tone.component,
    color: tone.fgHi,
    ':is([data-hovered], :hover)': {
      backgroundColor: tone.componentHover,
    },
    ':is([data-pressed], :active)': {
      backgroundColor: tone.componentActive,
    },
  },
  outline: {
    backgroundColor: base.transparent,
    borderColor: tone.border,
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.md,
    color: tone.fgHi,
    // @TODO probably alpha scale is better here, maybe?
    ':is([data-hovered], :hover)': {
      backgroundColor: tone.componentHover,
    },
    ':is([data-pressed], :active)': {
      backgroundColor: tone.componentActive,
    },
  },
})
