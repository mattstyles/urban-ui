import * as stylex from '@stylexjs/stylex'
// import { themes } from '@urban-ui/theme'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import { base, disabled, tone } from '@urban-ui/theme/colors.stylex'
import { focusVars } from '@urban-ui/theme/focus.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import { fontSizes, fontWeights } from '@urban-ui/theme/type.stylex'

export const styles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: base.transparent,
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.md,
    textDecoration: 'none',
    transition:
      'background 0.2s, border-color 0.2s, color 0.2s, transform 0.1s ease-out',
    ':is([data-pressed], :active)': {
      transform: 'scale(0.98)',
    },
    // @TODO this will appear behind other elements and should be fixed properly to always be in front
    ':is(:focus-visible, [data-focus-visible])': {
      outlineColor: focusVars.outlineColor,
      outlineOffset: focusVars.outlineOffset,
      outlineStyle: focusVars.outlineStyle,
      outlineWidth: focusVars.outlineSize,
      boxShadow: `0 0 0 ${focusVars.outlineSize} ${base.white}`,
      zIndex: 1,
    },
  },
  content: {
    fontWeight: fontWeights.semibold,
    fontSize: fontSizes.md,
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

/**
 * Buttons are sized by using a defined line height which matches the expected size of the icon at that size (which, in turn, is a font size). Text supplied to buttons as content can be plain strings, or set textbox to none for Text components.
 * Buttons are sized by their content and can handle overflow or differing content.
 */
export const sizes = stylex.create({
  md: {
    fontSize: fontSizes.sm,
    // This is to provide a consistent height as we do not enforce cap heights for controls
    lineHeight: fontSizes.md,
    gap: space['100'],
    paddingInline: space['200'],
    paddingBlock: space['50'],
    minHeight: `calc(${fontSizes.md} + ((${space['50']} + ${borderWidths.md})  * 2))`,
  },
  lg: {
    fontSize: fontSizes.md,
    lineHeight: fontSizes.lg,
    gap: space['100'],
    paddingInline: space['300'],
    paddingBlock: space['100'],
    minHeight: `calc(${fontSizes.lg} + ((${space['100']} + ${borderWidths.md})  * 2))`,
  },
  'md-equal': {
    paddingInline: space['50'],
    paddingBlock: space['50'],
    minHeight: `calc(${fontSizes.md} + ((${space['50']} + ${borderWidths.md})  * 2))`,
    minWidth: `calc(${fontSizes.md} + ((${space['50']} + ${borderWidths.md})  * 2))`,
  },
  'lg-equal': {
    paddingInline: space['100'],
    paddingBlock: space['100'],
    minHeight: `calc(${fontSizes.lg} + ((${space['100']} + ${borderWidths.md})  * 2))`,
    minWidth: `calc(${fontSizes.lg} + ((${space['100']} + ${borderWidths.md})  * 2))`,
  },
})

export const shapes = stylex.create({
  pill: {
    borderRadius: radii.full,
  },
  rounded: {
    borderRadius: radii.lg,
  },
  square: {
    borderRadius: radii.none,
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
    color: tone.fgHi,
    borderColor: tone.border,
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.md,
    // @TODO probably alpha scale is better here, maybe?
    ':is([data-hovered], :hover)': {
      backgroundColor: tone.componentHover,
    },
    ':is([data-pressed], :active)': {
      backgroundColor: tone.componentActive,
    },
  },
  ghost: {
    backgroundColor: base.transparent,
    color: tone.fgHi,
    borderColor: base.transparent,
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.md,
    // @TODO probably alpha scale is better here, maybe?
    ':is([data-hovered], :hover)': {
      backgroundColor: tone.componentHover,
    },
    ':is([data-pressed], :active)': {
      backgroundColor: tone.componentActive,
    },
  },
})
