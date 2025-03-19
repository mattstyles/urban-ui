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
    default: 'oklch(90.84% 0.0042 228.81)',
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
    default: 'oklch(90.84% 0.0042 228.81)',
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
  surface: {
    default: 'hsl(244 100% 97%)',
    [DARK]: 'hsl(270 96% 9%)',
  },

  component: {
    default: 'hsl(270 98% 92%)',
    [DARK]: 'hsl(270 98% 18%)',
  },
  componentHover: {
    default: 'hsl(265 98% 90%)',
    [DARK]: 'hsl(270 98% 20%)',
  },
  componentActive: {
    default: 'hsl(265 98% 85%)',
    [DARK]: 'hsl(270 95% 22%)',
  },

  borderMuted: {
    default: 'hsl(257 92% 93%)',
    [DARK]: 'hsl(249 43% 34%)',
  },
  border: {
    default: 'hsl(259 84% 90%)',
    [DARK]: 'hsl(250 46% 39%)',
  },

  solid: {
    default: 'hsl(270 88% 48%)',
    [DARK]: 'hsl(270 91% 52%)',
  },
  solidHover: {
    default: 'hsl(270 78% 43%)',
    [DARK]: 'hsl(270 85% 57%)',
  },
  solidActive: {
    default: 'hsl(270 82% 40%)',
    [DARK]: 'hsl(270 85% 58%)',
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
    default: critLight.fg,
    [DARK]: critDark.fg,
  },
  fgLo: {
    default: `oklch(from ${critLight.fg} calc(l * 1.515) calc(c * 0.96) h)`,
    [DARK]: `oklch(from ${critDark.fg} calc(l * 0.72) calc(c * 0.96) h)`,
  },
  fgOnBlock: {
    default: base.white,
    [DARK]: base.black,
  },

  surfaceMuted: {
    default: `oklch(from ${critLight.surface} calc(l * 1.005) calc(c * 0.8) h)`,
    [DARK]: `oklch(from ${critDark.surface} calc(l * 0.97) c h)`,
  },
  surface: {
    default: critLight.surface,
    [DARK]: critDark.surface,
  },

  component: {
    default: critLight.component,
    [DARK]: critDark.component,
  },
  componentHover: {
    default: `oklch(from ${critLight.component} calc(l * 0.98) calc(c * 1.1) h)`,
    [DARK]: `oklch(from ${critDark.component} calc(l * 1.02) calc(c * 1.1) h)`,
  },
  componentActive: {
    default: `oklch(from ${critLight.component} calc(l * 0.97) calc(c * 1.9) h)`,
    [DARK]: `oklch(from ${critDark.component} calc(l * 1.03) calc(c * 1.2) h)`,
  },

  borderMuted: {
    default: `oklch(from ${critLight.border} calc(l * 1.1) calc(c * 0.8) h)`,
    [DARK]: `oklch(from ${critDark.border} calc(l * 0.895) calc(c * 0.8) h)`,
  },
  border: {
    default: critLight.border,
    [DARK]: critDark.border,
  },

  solid: {
    default: critLight.solid,
    [DARK]: critDark.solid,
  },
  solidHover: {
    default: `oklch(from ${critLight.solid} calc(l * 0.924) calc(c * 1.12) calc(h * 0.975))`,
    [DARK]: `oklch(from ${critDark.solid} calc(l * 1.087) c h)`,
  },
  solidActive: {
    default: `oklch(from ${critLight.solid} calc(l * 0.8976) calc(c * 0.9875) calc(h * 0.975))`,
    [DARK]: `oklch(from ${critDark.solid} calc(l * 1.147) calc(c * 1.2) h)`,
  },
})
