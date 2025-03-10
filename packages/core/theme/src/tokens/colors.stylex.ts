import { createTheme, defineVars } from '@stylexjs/stylex'
// import { DARK } from '../query'

export const DARK = '@media (prefers-color-scheme: dark)'

/**
 * @tokens colors
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 */
export const base = defineVars({
  transparent: { default: 'transparent' },
  current: { default: 'currentColor' },
  black: {
    default: 'hsl(0 0% 0%)',
    [DARK]: 'hsl(0 0% 100%)',
  },
  white: {
    default: 'hsl(0 0% 100%)',
    [DARK]: 'hsl(0 0% 0%)',
  },
})

export const tone = defineVars({
  fgHi: {
    default: 'hsl(200 8% 10%)',
    [DARK]: 'hsl(200 8% 98%)',
  },
  fgLo: {
    default: 'hsl(200 8% 40%)',
    [DARK]: 'hsl(200 8% 80%)',
  },
  fgInvertHi: {
    default: 'hsl(200 8% 98%)',
    [DARK]: 'hsl(200 8% 10%)',
  },
  fgInvertLo: {
    default: 'hsl(200 8% 80%)',
    [DARK]: 'hsl(200 8% 40%)',
  },
  surfaceMuted: {
    default: 'hsl(200 12% 97%)',
    [DARK]: 'hsl(200 12% 12%)',
  },
  surfaceBase: {
    default: 'hsl(200 12% 100%)',
    [DARK]: 'hsl(200 12% 9%)',
  },
  surfaceSubtle: {
    default: 'hsl(200 12% 96%)',
    [DARK]: 'hsl(200 12% 14%)',
  },
  surfaceEmphasis: {
    default: 'hsl(200 12% 94%)',
    [DARK]: 'hsl(200 12% 16%)',
  },
  elementMutedBase: {
    default: 'hsl(200 8% 92%)',
    [DARK]: 'hsl(200 8% 18%)',
  },
  elementMutedHover: {
    default: 'hsl(200 8% 90%)',
    [DARK]: 'hsl(200 8% 20%)',
  },
  elementMutedPress: {
    default: 'hsl(200 8% 88%)',
    [DARK]: 'hsl(200 8% 22%)',
  },
  elementMutedSelected: {
    default: 'hsl(200 8% 86%)',
    [DARK]: 'hsl(200 8% 24%)',
  },
  elementEmphasisBase: {
    default: 'hsl(200 12% 88%)',
    [DARK]: 'hsl(200 12% 22%)',
  },
  elementEmphasisHover: {
    default: 'hsl(200 12% 86%)',
    [DARK]: 'hsl(200 12% 24%)',
  },
  elementEmphasisPress: {
    default: 'hsl(200 12% 84%)',
    [DARK]: 'hsl(200 12% 26%)',
  },
  elementEmphasisSelected: {
    default: 'hsl(200 12% 82%)',
    [DARK]: 'hsl(200 12% 28%)',
  },
  borderMuted: {
    default: 'hsl(200 8% 90%)',
    [DARK]: 'hsl(200 8% 20%)',
  },
  borderBase: {
    default: 'hsl(200 8% 88%)',
    [DARK]: 'hsl(200 8% 22%)',
  },
  borderSubtle: {
    default: 'hsl(200 8% 92%)',
    [DARK]: 'hsl(200 8% 18%)',
  },
  borderEmphasis: {
    default: 'hsl(200 8% 85%)',
    [DARK]: 'hsl(200 8% 25%)',
  },
})
