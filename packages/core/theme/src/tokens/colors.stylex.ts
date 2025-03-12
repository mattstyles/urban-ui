import { createTheme, defineVars } from '@stylexjs/stylex'
// Does not work, stylex does not see this as a static value
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

/**
 * @tokens colors
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 * Base scale defining a colour mode.
 */
export const tone = defineVars({
  fgHi: {
    default: 'hsl(200 17% 21%)',
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
    default: 'hsl(200 17% 99%)',
    [DARK]: 'hsl(200 12% 12%)',
  },
  surfaceBase: {
    default: 'hsl(200 12% 98%)',
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
    default: 'hsl(200 8% 88%)',
    [DARK]: 'hsl(200 8% 18%)',
  },
  elementMutedHover: {
    default: 'hsl(200 8% 86%)',
    [DARK]: 'hsl(200 8% 20%)',
  },
  elementMutedPress: {
    default: 'hsl(200 8% 85%)',
    [DARK]: 'hsl(200 8% 22%)',
  },
  elementMutedSelected: {
    default: 'hsl(200 8% 83%)',
    [DARK]: 'hsl(200 8% 24%)',
  },
  elementEmphasisBase: {
    default: 'hsl(200 12% 38%)',
    [DARK]: 'hsl(200 12% 72%)',
  },
  elementEmphasisHover: {
    default: 'hsl(200 12% 36%)',
    [DARK]: 'hsl(200 12% 74%)',
  },
  elementEmphasisPress: {
    default: 'hsl(200 12% 34%)',
    [DARK]: 'hsl(200 12% 76%)',
  },
  elementEmphasisSelected: {
    default: 'hsl(200 12% 32%)',
    [DARK]: 'hsl(200 12% 78%)',
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
    default: 'hsl(200 8% 86%)',
    [DARK]: 'hsl(200 8% 18%)',
  },
  borderEmphasis: {
    default: 'hsl(200 11% 83%)',
    [DARK]: 'hsl(200 8% 25%)',
  },
})

/**
 * @tokens color
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 * Primary branded colours for a tone
 */
export const primary = createTheme(tone, {
  fgHi: {
    default: 'hsl(267 87% 63%)',
    [DARK]: 'hsl(272 88% 78%)',
  },
  fgLo: {
    default: 'hsl(270 78% 40%)',
    [DARK]: 'hsl(270 67% 62%)',
  },
  fgInvertHi: {
    default: 'hsl(270 8% 98%)',
    [DARK]: 'hsl(270 8% 10%)',
  },
  fgInvertLo: {
    default: 'hsl(270 8% 80%)',
    [DARK]: 'hsl(270 8% 40%)',
  },
  surfaceMuted: {
    default: 'hsl(270 17% 99%)',
    [DARK]: 'hsl(270 12% 12%)',
  },
  surfaceBase: {
    default: 'hsl(270 12% 98%)',
    [DARK]: 'hsl(270 12% 9%)',
  },
  surfaceSubtle: {
    default: 'hsl(270 12% 96%)',
    [DARK]: 'hsl(270 12% 14%)',
  },
  surfaceEmphasis: {
    default: 'hsl(270 12% 94%)',
    [DARK]: 'hsl(270 12% 16%)',
  },
  elementMutedBase: {
    default: 'hsl(270 8% 88%)',
    [DARK]: 'hsl(270 8% 18%)',
  },
  elementMutedHover: {
    default: 'hsl(270 8% 86%)',
    [DARK]: 'hsl(270 8% 20%)',
  },
  elementMutedPress: {
    default: 'hsl(270 8% 85%)',
    [DARK]: 'hsl(270 8% 22%)',
  },
  elementMutedSelected: {
    default: 'hsl(270 8% 83%)',
    [DARK]: 'hsl(270 8% 24%)',
  },
  elementEmphasisBase: {
    default: 'hsl(270 88% 48%)',
    [DARK]: 'hsl(270 91% 52%)',
  },
  elementEmphasisHover: {
    default: 'hsl(270 78% 43%)',
    [DARK]: 'hsl(270 85% 57%)',
  },
  elementEmphasisPress: {
    default: 'hsl(270 82% 40%)',
    [DARK]: 'hsl(270 85% 58%)',
  },
  elementEmphasisSelected: {
    default: 'hsl(270 75% 38%)',
    [DARK]: 'hsl(270 78% 60%)',
  },
  borderMuted: {
    default: 'hsl(257 92% 93%)',
    [DARK]: 'hsl(249 43% 34%)',
  },
  borderBase: {
    default: 'hsl(259 84% 90%)',
    [DARK]: 'hsl(250 46% 39%)',
  },
  borderSubtle: {
    default: 'hsl(260 83% 86%)',
    [DARK]: 'hsl(250 46% 43%)',
  },
  borderEmphasis: {
    default: 'hsl(260 78% 83%)',
    [DARK]: 'hsl(250 46% 48%)',
  },
})
