import * as stylex from '@stylexjs/stylex'
import { base, primary, tone } from './tokens/colors.stylex'

const DARK = '@media (prefers-color-scheme: dark)'

export const primaryTheme = stylex.createTheme(tone, {
  fgHi: primary.fgHi,
  fgLo: primary.fgLo,
  fgOnBlock: primary.fgOnBlock,

  surfaceMuted: primary.surfaceMuted,
  surface: primary.surface,

  component: primary.component,
  componentHover: primary.componentHover,
  componentActive: primary.componentActive,

  borderMuted: primary.borderMuted,
  border: primary.border,

  solid: primary.solid,
  solidHover: primary.solidHover,
  solidActive: primary.solidActive,
})
