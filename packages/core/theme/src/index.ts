import * as stylex from '@stylexjs/stylex'

import { tone } from './tokens/colors.stylex'
import {
  fontSizes,
  fonts,
  fontWeights,
  lineHeights,
  tracking,
} from './tokens/type.stylex'

export const DARK = '@media (prefers-color-scheme: dark)'

import {
  accentTheme,
  criticalTheme,
  infoTheme,
  neutralTheme,
  positiveTheme,
  primaryTheme,
  warningTheme,
} from './themes'

/**
 * -------------------
 *  Themes
 * -------------------
 */

export const themes = {
  primary: primaryTheme,
  critical: criticalTheme,
  warning: warningTheme,
  positive: positiveTheme,
  neutral: neutralTheme,
  info: infoTheme,
  accent: accentTheme,
}

/**
 * -------------------
 *  Preset
 * -------------------
 */

export const presets = stylex.create({
  body: {
    fontFamily: fonts.body,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    letterSpacing: tracking.md,
    fontWeight: fontWeights.normal,
    color: tone.fgHi,
  },
})
