import * as stylex from '@stylexjs/stylex'
// import { themes } from '@urban-ui/theme'
import {
  borderStyles,
  borderWidths,
  radii,
} from '@urban-ui/theme/borders.stylex'
import { base, disabled, tone } from '@urban-ui/theme/colors.stylex'
import { focusVars } from '@urban-ui/theme/focus.stylex'
import { control, space } from '@urban-ui/theme/layout.stylex'
import { fontSizes, fontWeights } from '@urban-ui/theme/type.stylex'

export const styles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: space[0],
    borderColor: base.transparent,
    borderStyle: borderStyles.solid,
    borderWidth: borderWidths.md,
    textDecoration: 'none',
    fontWeight: fontWeights.semibold,
    fontSize: fontSizes.md,
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
  disabled: {
    ':is(:disabled, [data-disabled])': {
      backgroundColor: disabled.background,
      color: disabled.fg,
      borderColor: base.transparent,
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    ':is(:disabled, [data-disabled]):hover': {
      backgroundColor: disabled.background,
      color: disabled.fg,
    },
    ':is(:disabled, [data-disabled]):active': {
      transform: 'scale(1)',
    },
  },
})

export const content = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s',
    opacity: 1,
  },
  hidden: {
    transition: 'opacity 0s',
    opacity: 0,
  },
  md: {
    gap: space['100'],
    paddingInline: space['200'],
    paddingBlock: space['25'],
  },
  lg: {
    gap: space['100'],
    paddingInline: space['300'],
    paddingBlock: space['50'],
  },
  'md-equal': {
    gap: space[0],
    paddingInline: space['50'],
    paddingBlock: space['50'],
  },
  'lg-equal': {
    gap: space[0],
    paddingInline: space['100'],
    paddingBlock: space['100'],
  },
  clear: {
    paddingBlock: space[0],
    gap: space[0],
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
    // gap: space['100'],
    // paddingInline: space['200'],
    // paddingBlock: space['50'],
    minHeight: control.md,
  },
  lg: {
    fontSize: fontSizes.md,
    lineHeight: fontSizes.lg,
    // gap: space['100'],
    // paddingInline: space['300'],
    // paddingBlock: space['100'],
    minHeight: control.lg,
  },
  'md-equal': {
    // paddingInline: space['50'],
    // paddingBlock: space['50'],
    minHeight: control.md,
    minWidth: control.md,
  },
  'lg-equal': {
    // paddingInline: space['100'],
    // paddingBlock: space['100'],
    minHeight: control.lg,
    minWidth: control.lg,
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
