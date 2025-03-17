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

import { tone } from './tokens/colors.stylex'

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
  surfaceBase: {
    default: 'oklch(98.49% 0.001027 228.7632)',
    [DARK]: 'oklch(24.97% 0.0092 229.29)',
  },

  componentBase: {
    default: 'oklch(90.84% 0.0042 228.81)',
    [DARK]: 'oklch(30.19% 0.0082 229.13)',
  },
  componentHover: {
    default: 'oklch(89.29% 0.0049 228.82)',
    [DARK]: 'oklch(32.23% 0.0089 229.14)',
  },
  componentPress: {
    default: 'oklch(88.51% 0.0053 228.83)',
    [DARK]: 'oklch(34.24% 0.0097 229.15)',
  },

  borderMuted: {
    default: 'oklch(92.38% 0.0035 228.8)',
    [DARK]: 'oklch(32.23% 0.0089 229.14)',
  },
  borderBase: {
    default: 'oklch(90.84% 0.0042 228.81)',
    [DARK]: 'oklch(34.24% 0.0097 229.15)',
  },

  solidBase: {
    default: 'oklch(49.58% 0.0226 229.44)',
    [DARK]: 'oklch(78.32% 0.0151 229.01)',
  },
  solidHover: {
    default: 'oklch(47.74% 0.0216 229.43)',
    [DARK]: 'oklch(79.91% 0.014 228.99)',
  },
  solidPress: {
    default: 'oklch(45.89% 0.0206 229.43)',
    [DARK]: 'oklch(81.5% 0.0128 228.96)',
  },
})

// These are duplicated from the tokens colours file. Stylex compiler needs raw objects to work with.
// We could, and should, generate these themes and tokens.
export const primary = stylex.createTheme(tone, {
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
    default: 'hsl(242 100% 99%)',
    [DARK]: 'hsl(270 100% 12%)',
  },
  surfaceBase: {
    default: 'hsl(244 100% 97%)',
    [DARK]: 'hsl(270 96% 9%)',
  },

  componentBase: {
    default: 'hsl(270 98% 92%)',
    [DARK]: 'hsl(270 98% 18%)',
  },
  componentHover: {
    default: 'hsl(265 98% 90%)',
    [DARK]: 'hsl(270 98% 20%)',
  },
  componentPress: {
    default: 'hsl(265 98% 85%)',
    [DARK]: 'hsl(270 95% 22%)',
  },

  borderMuted: {
    default: 'hsl(257 92% 93%)',
    [DARK]: 'hsl(249 43% 34%)',
  },
  borderBase: {
    default: 'hsl(259 84% 90%)',
    [DARK]: 'hsl(250 46% 39%)',
  },

  solidBase: {
    default: 'hsl(270 88% 48%)',
    [DARK]: 'hsl(270 91% 52%)',
  },
  solidHover: {
    default: 'hsl(270 78% 43%)',
    [DARK]: 'hsl(270 85% 57%)',
  },
  solidPress: {
    default: 'hsl(270 82% 40%)',
    [DARK]: 'hsl(270 85% 58%)',
  },
})

const neutralLight = {
  fg: 'oklch(33.45% 0.0194 229.68)',
  surface: 'oklch(98.49% 0.001027 228.7632)',
  elementMuted: 'oklch(90.84% 0.0042 228.81)',
  border: 'oklch(90.84% 0.0042 228.81)',
  elementEmphasis: 'oklch(49.58% 0.0226 229.44)',
}

const criticalRaw = {
  fg: 'oklch(60.17% 0.2253 11.16)',
  surface: 'oklch(98.08% 0.0126 8.17)',
  elementMuted: 'oklch(95.71% 0.0197 7.36)',
  border: 'oklch(81.68% 0.1 4.56)',
  elementEmphasis: 'oklch(61.67% 0.2437 7.68)',
}
const critDark = {
  fg: 'oklch(37.2% 0.0108 229.16)',
  surface: 'oklch(21.62% 0.0049 229.07)',
  elementMuted: 'oklch(93.51% 0.0326 344.64)',
  border: 'oklch(32.23% 0.0089 229.14)',
  elementEmphasis: 'oklch(28.17% 0.011 229.33)',
}

export const critical = stylex.createTheme(tone, {
  fgHi: {
    default: criticalRaw.fg,
    [DARK]: `oklch(from ${criticalRaw.fg} calc(l * 1.4) c h)`,
  },
  fgLo: {
    default: `oklch(from ${criticalRaw.fg} calc(l * 1.515) calc(c * 0.96) h)`,
    [DARK]: `oklch(from ${criticalRaw.fg} calc(l * 1.3) calc(c * 0.8) h)`,
  },
  fgOnBlock: {
    default: `oklch(from ${criticalRaw.fg} calc(l * 1.715) calc(c * 0.026) h)`,
    [DARK]: `oklch(from ${criticalRaw.fg} calc(l * 0.2) calc(c * 0.1) h)`,
  },

  surfaceMuted: {
    default: `oklch(from ${criticalRaw.surface} calc(l * 1.02) calc(c * 0.8) h)`,
    [DARK]: `oklch(from ${criticalRaw.surface} calc(l * 0.12) c h)`,
  },
  surfaceBase: {
    default: criticalRaw.surface,
    [DARK]: `oklch(from ${criticalRaw.surface} calc(l * 0.15) c h)`,
  },

  componentBase: {
    default: criticalRaw.elementMuted,
    [DARK]: `oklch(from ${criticalRaw.elementMuted} calc(l * 0.2) c h)`,
  },
  componentHover: {
    default: `oklch(from ${criticalRaw.elementMuted} calc(l * 0.98) calc(c * 1.1) h)`,
    [DARK]: `oklch(from ${criticalRaw.elementMuted} calc(l * 0.22) c h)`,
  },
  componentPress: {
    default: `oklch(from ${criticalRaw.elementMuted} calc(l * 0.96) calc(c * 1.2) h)`,
    [DARK]: `oklch(from ${criticalRaw.elementMuted} calc(l * 0.24) c h)`,
  },

  borderMuted: {
    default: `oklch(from ${criticalRaw.border} calc(l * 1.1) calc(c * 0.8) h)`,
    [DARK]: `oklch(from ${criticalRaw.border} calc(l * 0.25) c h)`,
  },
  borderBase: {
    default: criticalRaw.border,
    [DARK]: `oklch(from ${criticalRaw.border} calc(l * 0.28) c h)`,
  },

  solidBase: {
    default: criticalRaw.elementEmphasis,
    [DARK]: `oklch(from ${criticalRaw.elementEmphasis} calc(l * 1.2) c h)`,
  },
  solidHover: {
    default: `oklch(from ${criticalRaw.elementEmphasis} calc(l * 0.924) calc(c * 1.12) calc(h * 0.975))`,
    [DARK]: `oklch(from ${criticalRaw.elementEmphasis} calc(l * 1.24) c h)`,
  },
  solidPress: {
    default: `oklch(from ${criticalRaw.elementEmphasis} calc(l * 0.8976) calc(c * 0.9875) calc(h * 0.975))`,
    [DARK]: `oklch(from ${criticalRaw.elementEmphasis} calc(l * 1.28) c h)`,
  },
})
