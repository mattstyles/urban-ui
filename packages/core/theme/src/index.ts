// import stylex from '@stylexjs/stylex'
// import { tokens } from './tokens/colors.stylex'

/**
 * Deprecated in favour of a a more straight forward approach
 */
// export const interactive = stylex.create({
//   hover: {
//     ':hover': {
//       background: `oklch(from ${tokens.background} calc(l * 0.95) c h)`,
//       borderColor: `oklch(from ${tokens.border} calc(l * 0.95) c h)`,
//     },
//   },
//   active: {
//     ':active': {
//       background: `oklch(from ${tokens.background} calc(l * 0.87) c h)`,
//       borderColor: `oklch(from ${tokens.border} calc(l * 0.87) c h)`,
//     },
//   },
// })

import * as stylex from '@stylexjs/stylex'

import { base, tone } from './tokens/colors.stylex'

export const DARK = '@media (prefers-color-scheme: dark)'

/**
 * -------------------
 * Themes
 * -------------------
 */

/**
 * Neutral theme
 */
export const neutral = stylex.createTheme(tone, {
  fgHi: {
    default: 'oklch(33.45% 0.0194 229.68)',
    [DARK]: 'oklch(98.49% 0.0007 228.76)',
  },
  fgLo: {
    default: 'oklch(51.25% 0.0159 229.19)',
    [DARK]: 'oklch(84.6% 0.0071 228.86)',
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
    [DARK]: 'oklch(32.23% 0.0089 229.14)',
  },
  componentActive: {
    default: 'oklch(88.51% 0.0053 228.83)',
    [DARK]: 'oklch(34.24% 0.0097 229.15)',
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
    default: 'oklch(47.74% 0.0216 229.43)',
    [DARK]: 'oklch(79.91% 0.014 228.99)',
  },
  solidActive: {
    default: 'oklch(45.89% 0.0206 229.43)',
    [DARK]: 'oklch(81.5% 0.0128 228.96)',
  },
})

// These are duplicated from the tokens colours file. Stylex compiler needs raw objects to work with.
// We could, and should, generate these themes and tokens.
export const primary = stylex.createTheme(tone, {
  fgHi: {
    default: 'oklch(59.9% 0.2331 299.96)',
    [DARK]: 'oklch(75.84% 0.1471 307.77)',
  },
  fgLo: {
    default: 'oklch(72.63% 0.1786 298.64)',
    [DARK]: 'oklch(61.1% 0.1932 304.33)',
  },
  fgOnBlock: {
    default: 'oklch(97.82% 0.0113 308.33)',
    [DARK]: 'oklch(97.82% 0.0113 308.33)',
  },

  surfaceMuted: {
    default: 'oklch(98.64% 0.0067 287.81)',
    [DARK]: 'oklch(19.87% 0.1063 299.59)',
  },
  surface: {
    default: 'oklch(95.95% 0.0204 289.08)',
    [DARK]: 'oklch(16.9% 0.0856 301.86)',
  },

  component: {
    default: 'oklch(92.66% 0.0578 307.75)',
    [DARK]: 'oklch(25.69% 0.1375 297.56)',
  },
  componentHover: {
    default: 'oklch(91.99% 0.071287 303.9215)',
    [DARK]: 'oklch(27.54% 0.148 297.08)',
  },
  componentActive: {
    default: 'oklch(87.07% 0.1082 303.19)',
    [DARK]: 'oklch(29.31% 0.1554 297.14)',
  },

  borderMuted: {
    default: 'oklch(91.41% 0.0453 298.45)',
    [DARK]: 'oklch(37.08% 0.1216 285.69)',
  },
  border: {
    default: 'oklch(80.24% 0.1099 293.83)',
    [DARK]: 'oklch(40.33% 0.1443 285.57)',
  },

  solid: {
    default: 'oklch(50.35% 0.2678 296.31)',
    [DARK]: 'oklch(53.08% 0.2784 296.99)',
  },
  solidHover: {
    default: 'oklch(45.94% 0.2312 298.51)',
    [DARK]: 'oklch(56.03% 0.2555 300.75)',
  },
  solidActive: {
    default: 'oklch(43.79% 0.2247 297.87)',
    [DARK]: 'oklch(56.78% 0.2519 301.19)',
  },
})

const neutralLight = {
  fg: 'oklch(33.45% 0.0194 229.68)',
  surface: 'oklch(98.49% 0.001027 228.7632)',
  component: 'oklch(90.84% 0.0042 228.81)',
  border: 'oklch(90.84% 0.0042 228.81)',
  solid: 'oklch(49.58% 0.0226 229.44)',
}

const critLight = {
  fg: 'oklch(60.17% 0.2253 11.16)',
  surface: 'oklch(98.08% 0.0126 8.17)',
  component: 'oklch(95.71% 0.0197 7.36)',
  border: 'oklch(81.68% 0.1 4.56)',
  solid: 'oklch(61.67% 0.2437 7.68)',
}
const critDark = {
  fg: 'oklch(64.38% 0.2353 11.16)',
  surface: 'oklch(20.74% 0.0832 5.63)',
  component: 'oklch(33.09% 0.1323 5.63)',
  border: 'oklch(58.68% 0.2 4.56)',
  solid: 'oklch(64.38% 0.2353 11.16)',
}

export const critical = stylex.createTheme(tone, {
  fgHi: {
    // oklch(60.17% 0.2253 11.16
    default: critLight.fg,
    [DARK]: critDark.fg,
  },
  fgLo: {
    // oklch(91.16% 0.0462 11.16)
    // oklch(0.911575 0.216288 11.16) -> this is computed and it is nowhere close to actual computed value
    default: `oklch(from ${critLight.fg} calc(l * 1.515) calc(c * 0.96) h)`,
    [DARK]: `oklch(from ${critDark.fg} calc(l * 0.72) calc(c * 0.96) h)`,
  },
  fgOnBlock: {
    default: base.white,
    [DARK]: base.black,
  },

  surfaceMuted: {
    // oklch(98.57% 0.007 8.17)
    default: `oklch(from ${critLight.surface} calc(l * 1.005) calc(c * 0.8) h)`,
    [DARK]: `oklch(from ${critDark.surface} calc(l * 0.97) c h)`,
  },
  surface: {
    // oklch(98.08% 0.0126 8.17)
    default: critLight.surface,
    [DARK]: critDark.surface,
  },

  component: {
    // oklch(95.71% 0.0197 7.36)
    default: critLight.component,
    [DARK]: critDark.component,
  },
  componentHover: {
    // oklch(0.937958 0.02167 7.36)
    default: `oklch(from ${critLight.component} calc(l * 0.98) calc(c * 1.1) h)`,
    [DARK]: `oklch(from ${critDark.component} calc(l * 1.02) calc(c * 1.1) h)`,
  },
  componentActive: {
    // oklch(0.928387 0.03743 7.36)
    default: `oklch(from ${critLight.component} calc(l * 0.97) calc(c * 1.9) h)`,
    [DARK]: `oklch(from ${critDark.component} calc(l * 1.03) calc(c * 1.2) h)`,
  },

  borderMuted: {
    // oklch(89.85% 0.0555 4.56)
    default: `oklch(from ${critLight.border} calc(l * 1.1) calc(c * 0.8) h)`,
    [DARK]: `oklch(from ${critDark.border} calc(l * 0.895) calc(c * 0.8) h)`,
  },
  border: {
    // oklch(81.68% 0.1 4.56)
    default: critLight.border,
    [DARK]: critDark.border,
  },

  solid: {
    // oklch(64.38% 0.2353 11.16)
    default: critLight.solid,
    [DARK]: critDark.solid,
  },
  solidHover: {
    // oklch(56.98% 0.2279 7.488)
    default: `oklch(from ${critLight.solid} calc(l * 0.924) calc(c * 1.12) calc(h * 0.975))`,
    [DARK]: `oklch(from ${critDark.solid} calc(l * 1.087) c h)`,
  },
  solidActive: {
    // oklch(55.36% 0.240654 7.488)
    default: `oklch(from ${critLight.solid} calc(l * 0.8976) calc(c * 0.9875) calc(h * 0.975))`,
    [DARK]: `oklch(from ${critDark.solid} calc(l * 1.147) calc(c * 1.2) h)`,
  },
})
