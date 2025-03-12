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
