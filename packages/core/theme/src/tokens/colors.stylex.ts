import { createTheme, defineVars } from '@stylexjs/stylex'

const DARK = '@media (prefers-color-scheme: dark)'

/**
 * @tokens colors
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 */
export const tokens = defineVars({
  background: 'hsl(0, 0%, 100%)',
  border: 'hsl(0, 0%, 98%)',
  foreground: 'hsl(195, 32%, 7%)',
})

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
 * @tokens grays
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 */
export const grays = defineVars({
  50: {
    default: 'hsl(0 0% 98%)',
    [DARK]: 'hsl(0 0% 13%)',
  },
  100: {
    default: 'hsl(0 0% 96%)',
    [DARK]: 'hsl(0 0% 26%)',
  },
  200: {
    default: 'hsl(0 0% 90%)',
    [DARK]: 'hsl(0 0% 38%)',
  },
  300: {
    default: 'hsl(0 0% 83%)',
    [DARK]: 'hsl(0 0% 46%)',
  },
  400: {
    default: 'hsl(0 0% 74%)',
    [DARK]: 'hsl(0 0% 62%)',
  },
  500: {
    default: 'hsl(0 0% 62%)',
    [DARK]: 'hsl(0 0% 74%)',
  },
  600: {
    default: 'hsl(0 0% 46%)',
    [DARK]: 'hsl(0 0% 83%)',
  },
  700: {
    default: 'hsl(0 0% 38%)',
    [DARK]: 'hsl(0 0% 90%)',
  },
  800: {
    default: 'hsl(0 0% 26%)',
    [DARK]: 'hsl(0 0% 96%)',
  },
  900: {
    default: 'hsl(0 0% 13%)',
    [DARK]: 'hsl(0 0% 98%)',
  },
})

/**
 * @tokens primary
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 */
export const primary = defineVars({
  50: {
    default: 'hsl(270 100% 98%)',
    [DARK]: 'hsl(270 100% 25%)',
  },
  100: {
    default: 'hsl(270 100% 92%)',
    [DARK]: 'hsl(270 100% 30%)',
  },
  200: {
    default: 'hsl(270 100% 86%)',
    [DARK]: 'hsl(270 100% 35%)',
  },
  300: {
    default: 'hsl(270 100% 75%)',
    [DARK]: 'hsl(270 100% 40%)',
  },
  400: {
    default: 'hsl(270 100% 65%)',
    [DARK]: 'hsl(270 100% 50%)',
  },
  500: {
    default: 'hsl(270 100% 50%)',
    [DARK]: 'hsl(270 100% 65%)',
  },
  600: {
    default: 'hsl(270 100% 40%)',
    [DARK]: 'hsl(270 100% 75%)',
  },
  700: {
    default: 'hsl(270 100% 35%)',
    [DARK]: 'hsl(270 100% 86%)',
  },
  800: {
    default: 'hsl(270 100% 30%)',
    [DARK]: 'hsl(270 100% 92%)',
  },
  900: {
    default: 'hsl(270 100% 25%)',
    [DARK]: 'hsl(270 100% 98%)',
  },
})

export const accentBase = defineVars({
  base: '#ffaaff',
  threshold: 0.7,
  luminance: `clamp(0, (l / ${0.7} - 1) * -infinity, 1)`,
})

export const accent = defineVars({
  base: accentBase.base,
  lighter: ` oklch(from ${accentBase.base} ${accentBase.luminance} 0 h)`,
})

export const neutral = createTheme(tokens, {
  background: {
    default: 'hsl(0, 0%, 83%)',
    [DARK]: 'hsl(198, 8%, 25%)',
  },
  border: {
    default: 'hsl(0, 0%, 83%)',
    [DARK]: 'hsl(198, 8%, 25%)',
  },
  foreground: {
    default: 'hsl(195, 32%, 7%)',
    [DARK]: 'hsl(0, 0%, 96%)',
  },
})
