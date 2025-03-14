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
  surfaceSubtle: {
    default: 'hsl(245 96% 95%)',
    [DARK]: 'hsl(270 92% 14%)',
  },
  surfaceEmphasis: {
    default: 'hsl(245 96% 91%)',
    [DARK]: 'hsl(270 92% 16%)',
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
