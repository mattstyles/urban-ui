import { defineVars } from '@stylexjs/stylex'

/**
 * o--o o    o   o o-O-o o-o       o--o  o-o  o   o o-O-o  o-o
 * |    |    |   |   |   |  \      |    o   o |\  |   |   |
 * O-o  |    |   |   |   |   O     O-o  |   | | \ |   |    o-o
 * |    |    |   |   |   |  /      |    o   o |  \|   |       |
 * o    O---o o-o  o-O-o o-o       o     o-o  o   o   o   o--o
 *
 * Reference: https://utopia.fyi/type/calculator
 *
 * The following constants are used to calculate fluid typography.
 * Feel free to change these initial numbers to suit your needs.
 *
 * StyleX can compute all of this at compile time as all the information
 * is statically available in the same file and the only functions used are
 * the Math.pow and Math.round functions.
 *
 * NOTE: Any custom functions will not be able to be computed at compile time.
 */
const MIN_WIDTH = 320
const MAX_WIDTH = 1240
const MIN_SCALE = 1.2
const MAX_SCALE = 1.333
const MIN_BASE_SIZE = 16
const MAX_BASE_SIZE = 20

// Font sizes in `rem` units
const MIN_FONT = {
  // (16 / (1.2^3)) / 0.16) / 100 = 0.69rem
  xxs: Math.round(MIN_BASE_SIZE / MIN_SCALE ** 3 / 0.16) / 100,
  // (16 / (1.2^2)) / 0.16) / 100 = 0.83rem
  xs: Math.round(MIN_BASE_SIZE / MIN_SCALE ** 2 / 0.16) / 100,
  // (16 / 1.2) / 0.16) / 100 = 1rem
  sm: Math.round(MIN_BASE_SIZE / MIN_SCALE / 0.16) / 100,
  // (16 / 4) / 4 = 1rem
  p: Math.round(MIN_BASE_SIZE / 4) / 4,
  // (16 * 1.2) / 0.16) / 100 = 1.2rem
  h5: Math.round((MIN_BASE_SIZE * MIN_SCALE) / 0.16) / 100,
  // (16 * 1.2^2) / 0.16) / 100 = 1.44rem
  h4: Math.round((MIN_BASE_SIZE * MIN_SCALE ** 2) / 0.16) / 100,
  // (16 * 1.2^3) / 0.16) / 100 = 1.73rem
  h3: Math.round((MIN_BASE_SIZE * MIN_SCALE ** 3) / 0.16) / 100,
  // (16 * 1.2^4) / 0.16) / 100 = 2.07rem
  h2: Math.round((MIN_BASE_SIZE * MIN_SCALE ** 4) / 0.16) / 100,
  // (16 * 1.2^5) / 0.16) / 100 = 2.49rem
  h1: Math.round((MIN_BASE_SIZE * MIN_SCALE ** 5) / 0.16) / 100,
}
// Font sizes in `rem` units
const MAX_FONT = {
  // (20 / (1.333^3)) / 0.16) / 100 = 0.84rem
  xxs: Math.round(MAX_BASE_SIZE / MAX_SCALE ** 3 / 0.16) / 100,
  // (20 / (1.333^2)) / 0.16) / 100 = 1.12rem
  xs: Math.round(MAX_BASE_SIZE / MAX_SCALE ** 2 / 0.16) / 100,
  // (20 / 1.333) / 0.16) / 100 = 1.5rem
  sm: Math.round(MAX_BASE_SIZE / MAX_SCALE / 0.16) / 100,
  // (20 / 4) / 4 = 1.25rem
  p: Math.round(MAX_BASE_SIZE / 4) / 4,
  // (20 * 1.333) / 0.16) / 100 = 1.67rem
  h5: Math.round((MAX_BASE_SIZE * MAX_SCALE) / 0.16) / 100,
  // (20 * 1.333^2) / 0.16) / 100 = 2.22rem
  h4: Math.round((MAX_BASE_SIZE * MAX_SCALE ** 2) / 0.16) / 100,
  // (20 * 1.333^3) / 0.16) / 100 = 2.96rem
  h3: Math.round((MAX_BASE_SIZE * MAX_SCALE ** 3) / 0.16) / 100,
  // (20 * 1.333^4) / 0.16) / 100 = 3.95rem
  h2: Math.round((MAX_BASE_SIZE * MAX_SCALE ** 4) / 0.16) / 100,
  // (20 * 1.333^5) / 0.16) / 100 = 5.27rem
  h1: Math.round((MAX_BASE_SIZE * MAX_SCALE ** 5) / 0.16) / 100,
}
const SLOPE = {
  xxs: (16 * (MAX_FONT.xxs - MIN_FONT.xxs)) / (MAX_WIDTH - MIN_WIDTH),
  xs: (16 * (MAX_FONT.xs - MIN_FONT.xs)) / (MAX_WIDTH - MIN_WIDTH),
  sm: (16 * (MAX_FONT.sm - MIN_FONT.sm)) / (MAX_WIDTH - MIN_WIDTH),
  p: (16 * (MAX_FONT.p - MIN_FONT.p)) / (MAX_WIDTH - MIN_WIDTH),
  h5: (16 * (MAX_FONT.h5 - MIN_FONT.h5)) / (MAX_WIDTH - MIN_WIDTH),
  h4: (16 * (MAX_FONT.h4 - MIN_FONT.h4)) / (MAX_WIDTH - MIN_WIDTH),
  h3: (16 * (MAX_FONT.h3 - MIN_FONT.h3)) / (MAX_WIDTH - MIN_WIDTH),
  h2: (16 * (MAX_FONT.h2 - MIN_FONT.h2)) / (MAX_WIDTH - MIN_WIDTH),
  h1: (16 * (MAX_FONT.h1 - MIN_FONT.h1)) / (MAX_WIDTH - MIN_WIDTH),
}
const INTERCEPT = {
  xxs: Math.round(100 * (MIN_FONT.xxs - SLOPE.xxs * (MIN_WIDTH / 16))) / 100,
  xs: Math.round(100 * (MIN_FONT.xs - SLOPE.xs * (MIN_WIDTH / 16))) / 100,
  sm: Math.round(100 * (MIN_FONT.sm - SLOPE.sm * (MIN_WIDTH / 16))) / 100,
  p: Math.round(100 * (MIN_FONT.p - SLOPE.p * (MIN_WIDTH / 16))) / 100,
  h5: Math.round(100 * (MIN_FONT.h5 - SLOPE.h5 * (MIN_WIDTH / 16))) / 100,
  h4: Math.round(100 * (MIN_FONT.h4 - SLOPE.h4 * (MIN_WIDTH / 16))) / 100,
  h3: Math.round(100 * (MIN_FONT.h3 - SLOPE.h3 * (MIN_WIDTH / 16))) / 100,
  h2: Math.round(100 * (MIN_FONT.h2 - SLOPE.h2 * (MIN_WIDTH / 16))) / 100,
  h1: Math.round(100 * (MIN_FONT.h1 - SLOPE.h1 * (MIN_WIDTH / 16))) / 100,
}

/**
 * @tokens fontSizes
 * @css fontSize
 */
export const fontSizes = defineVars({
  // (0.69rem -> 0.84rem)
  xxs: `clamp(${Math.min(MIN_FONT.xxs)}rem, calc(${INTERCEPT.xxs}rem + ${Math.round(10000 * SLOPE.xxs) / 100}vw), ${Math.max(MAX_FONT.xxs)}rem)`,
  // (0.83rem -> 1.12rem)
  xs: `clamp(${Math.min(MIN_FONT.xs)}rem, calc(${INTERCEPT.xs}rem + ${Math.round(10000 * SLOPE.xs) / 100}vw), ${Math.max(MAX_FONT.xs)}rem)`,
  // (1rem -> 1.5rem)
  sm: `clamp(${Math.min(MIN_FONT.sm)}rem, calc(${INTERCEPT.sm}rem + ${Math.round(10000 * SLOPE.sm) / 100}vw), ${Math.max(MAX_FONT.sm)}rem)`,

  // (1rem -> 1.25rem)
  p: `clamp(${Math.min(MIN_FONT.p)}rem, calc(${INTERCEPT.p}rem + ${Math.round(10000 * SLOPE.p) / 100}vw), ${Math.max(MAX_FONT.p)}rem)`,
  // (1.2rem -> 1.67rem)
  h5: `clamp(${Math.min(MIN_FONT.h5)}rem, calc(${INTERCEPT.h5}rem + ${Math.round(10000 * SLOPE.h5) / 100}vw), ${Math.max(MAX_FONT.h5)}rem)`,
  // (1.44rem -> 2.22rem)
  h4: `clamp(${Math.min(MIN_FONT.h4)}rem, calc(${INTERCEPT.h4}rem + ${Math.round(10000 * SLOPE.h4) / 100}vw), ${Math.max(MAX_FONT.h4)}rem)`,
  // (1.73rem -> 2.96rem)
  h3: `clamp(${Math.min(MIN_FONT.h3)}rem, calc(${INTERCEPT.h3}rem + ${Math.round(10000 * SLOPE.h3) / 100}vw), ${Math.max(MAX_FONT.h3)}rem)`,
  // (2.07rem -> 3.95rem)
  h2: `clamp(${Math.min(MIN_FONT.h2)}rem, calc(${INTERCEPT.h2}rem + ${Math.round(10000 * SLOPE.h2) / 100}vw), ${Math.max(MAX_FONT.h2)}rem)`,
  // (2.49rem -> 5.27rem)
  h1: `clamp(${Math.min(MIN_FONT.h1)}rem, calc(${INTERCEPT.h1}rem + ${Math.round(10000 * SLOPE.h1) / 100}vw), ${Math.max(MAX_FONT.h1)}rem)`,
})

/**
 * @tokens lineHeights
 * @css lineHeight
 */
export const lineHeights = defineVars({
  xs: '1',
  sm: '1.25',
  md: '1.5',
  lg: '1.75',
  xl: '2',
})

/**
 * @tokens fontWeights
 * @css fontWeight
 */
export const fontWeights = defineVars({
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
})

/**
 * @tokens fonts
 * @css fontFamily
 */
export const fonts = defineVars({
  body: 'system-ui, sans-serif',
  heading: 'inherit',
  mono: 'ui-monospace, monospace',
})

/**
 * @tokens letterSpacings
 * @css letterSpacing
 */
export const letterSpacings = defineVars({
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
})
