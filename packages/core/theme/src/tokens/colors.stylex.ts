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
 * Neutral colour scheme
 */
export const neutral = defineVars({
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
 * Colours for primary actions
 */
export const primary = defineVars({
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
    [DARK]: 'oklch(14.62% 0.0049 229.07)',
  },

  surfaceMuted: {
    default: 'oklch(99.25% 0.0007 258.76)',
    [DARK]: 'oklch(21.66% 0.0074 229.24)',
  },
  surface: {
    default: 'oklch(98.49% 0.001027 258.76)',
    [DARK]: 'oklch(24.97% 0.0092 229.29)',
  },

  component: {
    default: 'oklch(92.84% 0.0042 258.79)',
    [DARK]: 'oklch(30.19% 0.0082 229.13)',
  },
  componentHover: {
    default: 'oklch(89.29% 0.0049 258.82)',
    [DARK]: 'oklch(28.23% 0.0089 229.14)',
  },
  componentActive: {
    default: 'oklch(88.51% 0.0053 258.83)',
    [DARK]: 'oklch(26.14% 0.0097 229.15)',
  },

  borderMuted: {
    default: 'oklch(62.38% 0.0035 252.8)',
    [DARK]: 'oklch(32.23% 0.0089 229.14)',
  },
  border: {
    default: 'oklch(41.45% 0.0194 249.68)',
    [DARK]: 'oklch(84.24% 0.0097 229.15)',
  },

  solid: {
    default: 'oklch(16.08% 0.042 250.98)',
    [DARK]: 'oklch(98.32% 0.0151 229.01)',
  },
  solidHover: {
    default: 'oklch(29.81% 0.0485 250.98)',
    [DARK]: 'oklch(93.91% 0.014 228.99)',
  },
  solidActive: {
    default: 'oklch(33.47% 0.043 250.98)',
    [DARK]: 'oklch(89.69% 0.0128 228.96)',
  },
})

/**
 * @tokens color
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 * Critical colour tone.
 */
export const critical = defineVars({
  fgHi: {
    default: 'oklch(55.46% 0.2245 14.5)',
    [DARK]: 'oklch(69.91% 0.2307 11.16)',
  },
  fgLo: {
    default: 'oklch(65.66% 0.122 9.36)',
    [DARK]: 'oklch(63.72% 0.2377 11.16)',
  },
  fgOnBlock: {
    default: base.white,
    [DARK]: base.black,
  },

  surfaceMuted: {
    default: 'oklch(98.98% 0.0066 340.38)',
    [DARK]: 'oklch(20.12% 0.0268 8.02)',
  },
  surface: {
    default: 'oklch(98.48% 0.0086 8.17)',
    [DARK]: 'oklch(21.74% 0.0232 9.13)',
  },

  component: {
    default: 'oklch(94.71% 0.0227 7.36)',
    [DARK]: 'oklch(25.69% 0.093 11.63)',
  },
  componentHover: {
    default: 'oklch(91.32% 0.0344 3.68)',
    [DARK]: 'oklch(23.69% 0.087 10.63)',
  },
  componentActive: {
    default: 'oklch(88.78% 0.0417 358.63)',
    [DARK]: 'oklch(20.69% 0.083 9.63)',
  },

  borderMuted: {
    default: 'oklch(89.85% 0.0555 4.56)',
    [DARK]: 'oklch(30.52% 0.09 6.56)',
  },
  border: {
    default: 'oklch(81.68% 0.1 4.56)',
    [DARK]: 'oklch(47.68% 0.19 8.56)',
  },

  solid: {
    default: 'oklch(64.38% 0.2353 11.16)',
    [DARK]: 'oklch(63.54% 0.2553 11.16)',
  },
  solidHover: {
    default: 'oklch(56.98% 0.2279 7.488)',
    [DARK]: 'oklch(57.54% 0.234 9.16)',
  },
  solidActive: {
    default: 'oklch(52.36% 0.240654 7.488)',
    [DARK]: 'oklch(53.54% 0.22 9.16)',
  },
})

/**
 * @tokens color
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 * Positive colour tone.
 */
export const positive = defineVars({
  fgHi: {
    default: 'oklch(51.65% 0.1431 160.1)',
    [DARK]: 'oklch(79.41% 0.2271 160.77)',
  },
  fgLo: {
    default: 'oklch(60.9% 0.1331 160.1)',
    [DARK]: 'oklch(67.41% 0.1982 160.1)',
  },
  fgOnBlock: {
    default: base.white,
    [DARK]: base.white,
  },

  surfaceMuted: {
    default: 'oklch(98.64% 0.007 160.81)',
    [DARK]: 'oklch(21.66% 0.0204 160.24)',
  },
  surface: {
    default: 'oklch(98.2% 0.0099 160.08)',
    [DARK]: 'oklch(22.4% 0.0256 160.86)',
  },

  component: {
    default: 'oklch(94.7% 0.032 160.9)',
    [DARK]: 'oklch(31.79% 0.0523 160.2)',
  },
  componentHover: {
    default: 'oklch(91.99% 0.042 160.62)',
    [DARK]: 'oklch(27.79% 0.0723 160.2)',
  },
  componentActive: {
    default: 'oklch(87.3% 0.052 161)',
    [DARK]: 'oklch(25.62% 0.071 160.2)',
  },

  borderMuted: {
    default: 'oklch(91.41% 0.0754 161.05)',
    [DARK]: 'oklch(38.08% 0.0816 162.69)',
  },
  border: {
    default: 'oklch(74.24% 0.1655 163.83)',
    [DARK]: 'oklch(49.33% 0.1443 160.57)',
  },

  solid: {
    default: 'oklch(64.85% 0.1971 157.16)',
    [DARK]: 'oklch(74.36% 0.2072 159.6)',
  },
  solidHover: {
    default: 'oklch(56.25% 0.2071 154.16)',
    [DARK]: 'oklch(66.36% 0.1672 159.6)',
  },
  solidActive: {
    default: 'oklch(50.85% 0.2071 151.16)',
    [DARK]: 'oklch(61.36% 0.1672 159.6)',
  },
})

/**
 * @tokens color
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 * Warning colour tone.
 */
export const warning = defineVars({
  fgHi: {
    default: 'oklch(52.22% 0.1105 81.14)',
    [DARK]: 'oklch(88.82% 0.1952 94.25)',
  },
  fgLo: {
    default: 'oklch(63.19% 0.078 84.1)',
    [DARK]: 'oklch(73.82% 0.1352 94.25)',
  },
  fgOnBlock: {
    default: 'oklch(35.77% 0.0658 73.14)',
    [DARK]: 'oklch(30.078% 0.0658 73.14)',
  },

  surfaceMuted: {
    default: 'oklch(99.17% 0.0122 89.84)',
    [DARK]: 'oklch(21.66% 0.0174 92.07)',
  },
  surface: {
    default: 'oklch(98.67% 0.017 87.84)',
    [DARK]: 'oklch(22.4% 0.021 92.86)',
  },

  component: {
    default: 'oklch(95.7% 0.062 91.9)',
    [DARK]: 'oklch(31.79% 0.0523 91.2)',
  },
  componentHover: {
    default: 'oklch(93.3% 0.062 89.62)',
    [DARK]: 'oklch(27.79% 0.0723 91.2)',
  },
  componentActive: {
    default: 'oklch(89.97% 0.0767 87)',
    [DARK]: 'oklch(25.62% 0.071 91.2)',
  },

  borderMuted: {
    default: 'oklch(93.21% 0.067 86.05)',
    [DARK]: 'oklch(38.08% 0.0816 91.69)',
  },
  border: {
    default: 'oklch(83.76% 0.106 83.83)',
    [DARK]: 'oklch(49.33% 0.1443 91.57)',
  },

  solid: {
    default: 'oklch(89.26% 0.1479 89.84)',
    [DARK]: 'oklch(89.26% 0.1634 92.12)',
  },
  solidHover: {
    default: 'oklch(83.26% 0.151 89.84)',
    [DARK]: 'oklch(83.36% 0.1672 92.6)',
  },
  solidActive: {
    default: 'oklch(79.26% 0.142 86.84)',
    [DARK]: 'oklch(79.36% 0.1672 90.6)',
  },
})

/**
 * @tokens color
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 * Positive colour tone.
 */
export const info = defineVars({
  fgHi: {
    default: 'oklch(52.47% 0.1649 248.3)',
    [DARK]: 'oklch(79.41% 0.2271 220.77)',
  },
  fgLo: {
    default: 'oklch(60.9% 0.1062 239.2)',
    [DARK]: 'oklch(67.41% 0.1588 220.1)',
  },
  fgOnBlock: {
    default: base.white,
    [DARK]: base.white,
  },

  surfaceMuted: {
    default: 'oklch(98.8% 0.0047 246.17)',
    [DARK]: 'oklch(21.66% 0.0204 240.24)',
  },
  surface: {
    default: 'oklch(98.2% 0.0087 246.17)',
    [DARK]: 'oklch(22.4% 0.0256 236.86)',
  },

  component: {
    default: 'oklch(94.7% 0.0261 250.9)',
    [DARK]: 'oklch(31.79% 0.0523 224.2)',
  },
  componentHover: {
    default: 'oklch(92.11% 0.0341 250.9)',
    [DARK]: 'oklch(27.79% 0.0623 230.2)',
  },
  componentActive: {
    default: 'oklch(86.19% 0.0576 250.9)',
    [DARK]: 'oklch(25.62% 0.064 230.2)',
  },

  borderMuted: {
    default: 'oklch(91.41% 0.0554 231.05)',
    [DARK]: 'oklch(38.08% 0.0816 231.69)',
  },
  border: {
    default: 'oklch(74.24% 0.1655 234.83)',
    [DARK]: 'oklch(49.33% 0.1443 226.57)',
  },

  solid: {
    default: 'oklch(62.82% 0.1785 248.55)',
    [DARK]: 'oklch(74.27% 0.1833 223.42)',
  },
  solidHover: {
    default: 'oklch(56.26% 0.1651 251.48)',
    [DARK]: 'oklch(67.53% 0.1693 232.1)',
  },
  solidActive: {
    default: 'oklch(51.84% 0.1523 251.48)',
    [DARK]: 'oklch(61.04% 0.1529 235.06)',
  },
})

/**
 * @tokens color
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 * Accent branded colours for a tone
 */
export const accent = defineVars({
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
    [DARK]: 'oklch(56.02% 0.2784 297)',
  },
  solidHover: {
    default: 'oklch(47.94% 0.2312 298.51)',
    [DARK]: 'oklch(51.33% 0.266 297)',
  },
  solidActive: {
    default: 'oklch(43.79% 0.2247 297.87)',
    [DARK]: 'oklch(44.71% 0.2484 292.7)',
  },
})
