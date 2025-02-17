import { createTheme, defineVars } from '@stylexjs/stylex'

const DARK = '@media (prefers-color-scheme: dark)'

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

export const surface = defineVars({
  page: {
    default: 'hsl(0, 0%, 100%)',
    [DARK]: 'hsl(195, 32%, 7%)',
  },
  pageFaded: {
    default: 'hsl(0, 0%, 98%)',
    [DARK]: '	hsl(195, 14%, 11%)',
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

/**
 * Test altering base colours to create dynamic scales
 */
// export const accentBase = defineVars({
//   base: '#ffaaff',
//   threshold: 0.7,
//   luminance: `clamp(0, (l / ${0.7} - 1) * -infinity, 1)`,
// })

// export const accent = defineVars({
//   base: accentBase.base,
//   lighter: ` oklch(from ${accentBase.base} ${accentBase.luminance} 0 h)`,
// })

/**
 * @tokens colors
 * @css color, backgroundColor, borderColor, fill, stroke, outlineColor
 */
export const tokens = defineVars({
  background: {
    default: 'hsl(0, 0%, 83%)',
    [DARK]: 'hsl(200, 8%, 32%)',
  },
  border: {
    default: 'hsl(0, 0%, 83%)',
    [DARK]: 'hsl(200, 8%, 32%)',
  },
  foreground: {
    default: 'hsl(195, 32%, 7%)',
    [DARK]: 'hsl(0, 0%, 96%)',
  },
})

// --------------------------
//   Semantic colour themes
// --------------------------

export const neutral = createTheme(tokens, {
  background: {
    default: 'hsl(0, 0%, 83%)',
    [DARK]: 'hsl(200, 8%, 32%)',
  },
  border: {
    default: 'hsl(0, 0%, 83%)',
    [DARK]: 'hsl(200, 8%, 32%)',
  },
  foreground: {
    default: 'hsl(195, 32%, 7%)',
    [DARK]: 'hsl(0, 0%, 96%)',
  },
})

export const neutralFaded = createTheme(tokens, {
  background: {
    default: 'hsl(0, 0%, 96%)',
    [DARK]: 'hsl(200, 8%, 20%)',
  },
  border: {
    default: 'hsl(0, 0%, 92%)',
    [DARK]: 'hsl(200, 8%, 25%)',
  },
  foreground: {
    default: 'hsl(195, 32%, 15%)',
    [DARK]: 'hsl(0, 0%, 85%)',
  },
})

export const info = createTheme(tokens, {
  background: {
    default: 'hsl(200, 85%, 95%)',
    [DARK]: 'hsl(200, 75%, 15%)',
  },
  border: {
    default: 'hsl(200, 85%, 45%)',
    [DARK]: 'hsl(200, 85%, 55%)',
  },
  foreground: {
    default: 'hsl(200, 85%, 35%)',
    [DARK]: 'hsl(200, 85%, 90%)',
  },
})

export const accent = createTheme(tokens, {
  background: {
    default: 'hsl(249, 87%, 63%)',
    [DARK]: 'hsl(249, 87%, 63%)',
  },
  border: {
    default: 'hsl(249, 87%, 63%)',
    [DARK]: 'hsl(249, 87%, 63%)',
  },
  foreground: {
    default: 'hsl(249, 87%, 63%)',
    [DARK]: 'hsl(249, 87%, 63%)',
  },
})

export const positive = createTheme(tokens, {
  background: {
    default: 'hsl(110, 76%, 88%)',
    [DARK]: 'hsl(110, 45%, 14%)',
  },
  border: {
    default: 'hsl(110, 100%, 27%)',
    [DARK]: 'hsl(110, 100%, 27%)',
  },
  foreground: {
    default: 'hsl(110, 100%, 27%)',
    [DARK]: 'hsl(110, 76%, 88%)',
  },
})

export const danger = createTheme(tokens, {
  background: {
    default: 'hsl(2, 96%, 94%)',
    [DARK]: 'hsl(350, 61%, 22%)',
  },
  border: {
    default: 'hsl(350, 83%, 45%)',
    [DARK]: 'hsl(350, 100%, 63%)',
  },
  foreground: {
    default: 'hsl(350, 83%, 45%)',
    [DARK]: 'hsl(2, 96%, 94%)',
  },
})

export const warning = createTheme(tokens, {
  background: {
    default: 'hsl(48, 100%, 91%)',
    [DARK]: 'hsl(24, 88%, 16%)',
  },
  border: {
    default: 'hsl(44, 100%, 52%)',
    [DARK]: 'hsl(24, 88%, 38%)',
  },
  foreground: {
    default: 'hsl(24, 88%, 38%)',
    [DARK]: 'hsl(48, 100%, 91%)',
  },
})
