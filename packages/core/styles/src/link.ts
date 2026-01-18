import * as stylex from '@stylexjs/stylex'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import { base, disabled, tone } from '@urban-ui/theme/colors.stylex'
import { focusVars } from '@urban-ui/theme/focus.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontWeights } from '@urban-ui/theme/type.stylex'

export const styles = stylex.create({
  base: {
    textDecoration: 'none',
    color: 'inherit',
    textBox: 'trim-both cap alphabetic',

    ':is(:focus-visible, [data-focus-visible])': {
      outlineColor: focusVars.outlineColor,
      outlineOffset: `calc(${focusVars.outlineOffset} * 1)`,
      outlineStyle: focusVars.outlineStyle,
      outlineWidth: focusVars.outlineSize,
      // boxShadow: `0 0 0 calc(${focusVars.outlineSize}* 2) ${base.white}`,
      zIndex: 1,
    },
  },
  disabled: {
    color: disabled.fg,
    cursor: 'not-allowed',
    opacity: 0.5,
    boxShadow: 'none',

    ':is([data-hovered], :hover)': {
      boxShadow: 'none',
      color: disabled.fg,
    },
    ':is([data-pressed], :active)': {
      boxShadow: 'none',
      color: disabled.fg,
    },
  },
})

export const variants = stylex.create({
  clear: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  solid: {
    color: tone.fgHi,
    fontWeight: fontWeights.medium,
    transition: 'color 200ms',

    ':is([data-hovered], :hover)': {
      color: tone.fgLo,
    },
    ':is([data-pressed], :active)': {
      color: tone.fgLo,
    },
  },
  text: {
    boxShadow: `0 1.5px 0 ${tone.solid}`,
    fontWeight: fontWeights.medium,
    transition: 'box-shadow 200ms, color 200ms',

    ':is([data-hovered], :hover)': {
      boxShadow: `0 1.5px 0 ${base.transparent}`,
    },
    ':is([data-pressed], :active)': {
      color: 'inherit',
    },
    ':visited': {
      background: 'hotpink',
    },
  },
})
