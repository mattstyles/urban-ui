import * as stylex from '@stylexjs/stylex'
import {
  base,
  critical,
  neutral,
  primary,
  positive,
  tone,
  warning,
} from './tokens/colors.stylex'

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

export const criticalTheme = stylex.createTheme(tone, {
  fgHi: critical.fgHi,
  fgLo: critical.fgLo,
  fgOnBlock: critical.fgOnBlock,

  surfaceMuted: critical.surfaceMuted,
  surface: critical.surface,

  component: critical.component,
  componentHover: critical.componentHover,
  componentActive: critical.componentActive,

  borderMuted: critical.borderMuted,
  border: critical.border,

  solid: critical.solid,
  solidHover: critical.solidHover,
  solidActive: critical.solidActive,
})

export const warningTheme = stylex.createTheme(tone, {
  fgHi: warning.fgHi,
  fgLo: warning.fgLo,
  fgOnBlock: warning.fgOnBlock,

  surfaceMuted: warning.surfaceMuted,
  surface: warning.surface,

  component: warning.component,
  componentHover: warning.componentHover,
  componentActive: warning.componentActive,

  borderMuted: warning.borderMuted,
  border: warning.border,

  solid: warning.solid,
  solidHover: warning.solidHover,
  solidActive: warning.solidActive,
})

export const positiveTheme = stylex.createTheme(tone, {
  fgHi: positive.fgHi,
  fgLo: positive.fgLo,
  fgOnBlock: positive.fgOnBlock,

  surfaceMuted: positive.surfaceMuted,
  surface: positive.surface,

  component: positive.component,
  componentHover: positive.componentHover,
  componentActive: positive.componentActive,

  borderMuted: positive.borderMuted,
  border: positive.border,

  solid: positive.solid,
  solidHover: positive.solidHover,
  solidActive: positive.solidActive,
})

export const neutralTheme = stylex.createTheme(tone, {
  fgHi: neutral.fgHi,
  fgLo: neutral.fgLo,
  fgOnBlock: neutral.fgOnBlock,

  surfaceMuted: neutral.surfaceMuted,
  surface: neutral.surface,

  component: neutral.component,
  componentHover: neutral.componentHover,
  componentActive: neutral.componentActive,

  borderMuted: neutral.borderMuted,
  border: neutral.border,

  solid: neutral.solid,
  solidHover: neutral.solidHover,
  solidActive: neutral.solidActive,
})
