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
    default: 'oklch(0% 0 0)',
    [DARK]: 'oklch(100% 0 0)',
  },
  white: {
    default: 'oklch(1000% 0 0)',
    [DARK]: 'oklch(0% 0 0)',
  },
})

/**
 * @tokens colors
 * @css backgroundColor
 *
 * Surface scale is used primarily as a background for the entire page. Often neutral surface is the same.
 */
export const surface = defineVars({
  muted: {
    default: 'oklch(99.25% 0.0007 228.76)',
    [DARK]: 'oklch(21.66% 0.0074 229.24)',
  },
  base: {
    default: 'oklch(98.49% 0.001027 228.7632)',
    [DARK]: 'oklch(24.97% 0.0092 229.29)',
  },
  subtle: {
    default: 'oklch(96.98% 0.0021 228.78)',
    [DARK]: 'oklch(26.05% 0.0098 229.3)',
  },
  emphasis: {
    default: 'oklch(95.46% 0.0031 228.79)',
    [DARK]: 'oklch(28.17% 0.011 229.33)',
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
  fgOnBlock: {
    default: 'hsl(200 8% 98%)',
    [DARK]: 'hsl(200 8% 10%)',
  },

  surfaceMuted: {
    default: 'hsl(200 17% 99%)',
    [DARK]: 'hsl(200 12% 10%)',
  },
  surface: {
    default: 'hsl(200 12% 98%)',
    [DARK]: 'hsl(200 12% 13%)',
  },

  component: {
    default: 'hsl(200 8% 88%)',
    [DARK]: 'hsl(200 8% 18%)',
  },
  componentHover: {
    default: 'hsl(200 8% 86%)',
    [DARK]: 'hsl(200 8% 20%)',
  },
  componentActive: {
    default: 'hsl(200 8% 85%)',
    [DARK]: 'hsl(200 8% 22%)',
  },

  borderMuted: {
    default: 'hsl(200 8% 90%)',
    [DARK]: 'hsl(200 8% 20%)',
  },
  border: {
    default: 'hsl(200 8% 88%)',
    [DARK]: 'hsl(200 8% 22%)',
  },

  solid: {
    default: 'hsl(200 12% 38%)',
    [DARK]: 'hsl(200 12% 72%)',
  },
  solidHover: {
    default: 'hsl(200 12% 36%)',
    [DARK]: 'hsl(200 12% 74%)',
  },
  solidActive: {
    default: 'hsl(200 12% 34%)',
    [DARK]: 'hsl(200 12% 76%)',
  },
})

/**
 * @tokens color
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 * Primary branded colours for a tone
 */
export const primary = defineVars({
  fgHi: {
    default: 'hsl(267 87% 63%)',
    [DARK]: 'hsl(272 88% 78%)',
  },
  fgLo: {
    default: 'hsl(270 78% 40%)',
    [DARK]: 'hsl(270 67% 62%)',
  },
  fgOnBlock: {
    default: 'hsl(270 78% 98%)',
    [DARK]: 'hsl(270 78% 98%)',
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
    default: 'hsl(270 98% 92%)',
    [DARK]: 'hsl(270 98% 18%)',
  },
  elementMutedHover: {
    default: 'hsl(265 98% 90%)',
    [DARK]: 'hsl(270 98% 20%)',
  },
  elementMutedPress: {
    default: 'hsl(265 98% 85%)',
    [DARK]: 'hsl(270 95% 22%)',
  },
  elementMutedSelected: {
    default: 'hsl(252 100% 80%)',
    [DARK]: 'hsl(270 95% 24%)',
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
