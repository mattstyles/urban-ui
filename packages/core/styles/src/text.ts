import * as stylex from '@stylexjs/stylex'
import { base, tone } from '@urban-ui/theme/colors.stylex'
import {
  fontSizes,
  fonts,
  fontWeights,
  lineHeights,
  tracking as trackingTokens,
} from '@urban-ui/theme/type.stylex'

export const styles = stylex.create({
  base: {
    textBox: 'trim-both cap alphabetic',
  },
})

export const fontFamilies = stylex.create({
  display: {
    fontFamily: fonts.display,
  },
  body: {
    fontFamily: fonts.body,
  },
  mono: {
    fontFamily: fonts.mono,
  },
})

export const fontColors = stylex.create({
  current: {
    color: base.current,
  },
  hi: {
    color: tone.fgHi,
  },
  lo: {
    color: tone.fgLo,
  },
  onBlock: {
    color: tone.fgOnBlock,
  },
  transparent: {
    color: base.transparent,
  },
})

export const sizes = stylex.create({
  inherit: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
  },
  xxs: {
    fontSize: fontSizes.xxs,
    lineHeight: lineHeights.xxs,
    letterSpacing: trackingTokens.xxs,
  },
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    letterSpacing: trackingTokens.xs,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    letterSpacing: trackingTokens.sm,
  },
  md: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    letterSpacing: trackingTokens.md,
  },
  lg: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    letterSpacing: trackingTokens.lg,
  },
  xl: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    letterSpacing: trackingTokens.xl,
  },
  xxl: {
    fontSize: fontSizes.xxl,
    lineHeight: lineHeights.xxl,
    letterSpacing: trackingTokens.xxl,
  },
})

export const weights = stylex.create({
  light: {
    fontWeight: fontWeights.light,
  },
  normal: {
    fontWeight: fontWeights.normal,
  },
  medium: {
    fontWeight: fontWeights.medium,
  },
  semibold: {
    fontWeight: fontWeights.semibold,
  },
  bold: {
    fontWeight: fontWeights.bold,
  },
})

export const tracking = stylex.create({
  tighter: {
    letterSpacing: trackingTokens.tighter,
  },
  tight: {
    letterSpacing: trackingTokens.tight,
  },
  normal: {
    letterSpacing: trackingTokens.normal,
  },
  wide: {
    letterSpacing: trackingTokens.wide,
  },
  wider: {
    letterSpacing: trackingTokens.wider,
  },
  widest: {
    letterSpacing: trackingTokens.widest,
  },
})

export const textBox = stylex.create({
  alphabetic: {
    textBox: 'trim-both cap alphabetic',
  },
  auto: {
    textBox: 'auto',
  },
  none: {
    textBox: 'none',
  },
})
