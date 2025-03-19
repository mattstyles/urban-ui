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
    default: 'oklch(33.45% 0.0194 229.68)',
    [DARK]: 'oklch(98.49% 0.0007 228.76)',
  },
  fgLo: {
    default: 'oklch(51.25% 0.0159 229.19)',
    [DARK]: 'oklch(80.6% 0.0071 228.86)',
  },
  fgOnBlock: {
    default: 'oklch(98.49% 0.0007 228.76)',
    [DARK]: 'oklch(21.62% 0.0049 229.07)',
  },

  surfaceMuted: {
    default: 'oklch(99.25% 0.0007 228.76)',
    [DARK]: 'oklch(21.66% 0.0074 229.24)',
  },
  surface: {
    default: 'oklch(98.49% 0.001027 228.7632)',
    [DARK]: 'oklch(24.97% 0.0092 229.29)',
  },

  component: {
    default: 'oklch(92.84% 0.0042 228.81)',
    [DARK]: 'oklch(30.19% 0.0082 229.13)',
  },
  componentHover: {
    default: 'oklch(89.29% 0.0049 228.82)',
    [DARK]: 'oklch(28.23% 0.0089 229.14)',
  },
  componentActive: {
    default: 'oklch(88.51% 0.0053 228.83)',
    [DARK]: 'oklch(26.14% 0.0097 229.15)',
  },

  borderMuted: {
    default: 'oklch(92.38% 0.0035 228.8)',
    [DARK]: 'oklch(32.23% 0.0089 229.14)',
  },
  border: {
    default: 'oklch(81.4% 0.0169 225.81)',
    [DARK]: 'oklch(34.24% 0.0097 229.15)',
  },

  solid: {
    default: 'oklch(49.58% 0.0226 229.44)',
    [DARK]: 'oklch(78.32% 0.0151 229.01)',
  },
  solidHover: {
    default: 'oklch(45.74% 0.0216 229.43)',
    [DARK]: 'oklch(73.91% 0.014 228.99)',
  },
  solidActive: {
    default: 'oklch(41.89% 0.0206 229.43)',
    [DARK]: 'oklch(69.69% 0.0128 228.96)',
  },
})

/**
 * @tokens color
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 * Primary branded colours for a tone
 */
export const primary = defineVars({
  fgHi: {
    default: 'oklch(54.9% 0.2631 296.96)',
    [DARK]: 'oklch(72.41% 0.1871 307.77)',
  },
  fgLo: {
    default: 'oklch(69.24% 0.1807 298.64)',
    [DARK]: 'oklch(67.34% 0.2269 308.48)',
  },
  fgOnBlock: {
    default: 'oklch(97.82% 0.0113 308.33)',
    [DARK]: 'oklch(97.82% 0.0113 308.33)',
  },

  surfaceMuted: {
    default: 'oklch(98.64% 0.007 287.81)',
    [DARK]: 'oklch(21.4% 0.0456 301.86)',
  },
  surface: {
    default: 'oklch(97.75% 0.0119 289.08)',
    [DARK]: 'oklch(23.87% 0.0663 299.59)',
  },

  component: {
    default: 'oklch(93.73% 0.0315 289.75)',
    [DARK]: 'oklch(29.79% 0.1373 301.61)',
  },
  componentHover: {
    default: 'oklch(91.99% 0.042 296.9215)',
    [DARK]: 'oklch(27.54% 0.142 299.08)',
  },
  componentActive: {
    default: 'oklch(87.07% 0.056 296.19)',
    [DARK]: 'oklch(24.03% 0.1275 299.12)',
  },

  borderMuted: {
    default: 'oklch(91.41% 0.0453 298.45)',
    [DARK]: 'oklch(30.08% 0.1216 295.69)',
  },
  border: {
    default: 'oklch(80.24% 0.1099 293.83)',
    [DARK]: 'oklch(40.33% 0.1443 285.57)',
  },

  solid: {
    default: 'oklch(53.35% 0.2778 296.31)',
    [DARK]: 'oklch(53.08% 0.2784 296.99)',
  },
  solidHover: {
    default: 'oklch(47.94% 0.2312 298.51)',
    [DARK]: 'oklch(56.03% 0.2555 300.75)',
  },
  solidActive: {
    default: 'oklch(43.79% 0.2247 297.87)',
    [DARK]: 'oklch(56.78% 0.2519 301.19)',
  },
})
