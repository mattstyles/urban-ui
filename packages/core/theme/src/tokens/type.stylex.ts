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

// Using a scale factor of 1.2 (MIN_SCALE)
// md is our baseline at 1rem (16px)
// Each step up multiplies by 1.2
// Each step down divides by 1.2

// Font sizes in `rem` units
const MIN_FONT = {
  // (16 / 1.2^3) / 0.16) / 100 = 0.579rem
  xxs: Math.round(MIN_BASE_SIZE / MIN_SCALE ** 3 / 0.16) / 100,
  // (16 / 1.2^2) / 0.16) / 100 = 0.694rem
  xs: Math.round(MIN_BASE_SIZE / MIN_SCALE ** 2 / 0.16) / 100,
  // (16 / 1.2) / 0.16) / 100 = 0.833rem
  sm: Math.round(MIN_BASE_SIZE / MIN_SCALE / 0.16) / 100,
  // 16 / 0.16) / 100 = 1rem (baseline)
  md: Math.round(MIN_BASE_SIZE / 0.16) / 100,
  // (16 * 1.2) / 0.16) / 100 = 1.2rem
  lg: Math.round((MIN_BASE_SIZE * MIN_SCALE) / 0.16) / 100,
  // (16 * 1.2^2) / 0.16) / 100 = 1.44rem
  xl: Math.round((MIN_BASE_SIZE * MIN_SCALE ** 2) / 0.16) / 100,
  // (16 * 1.2^3) / 0.16) / 100 = 1.728rem
  xxl: Math.round((MIN_BASE_SIZE * MIN_SCALE ** 3) / 0.16) / 100,
}

// Font sizes in `rem` units
const MAX_FONT = {
  // (20 / 1.333^3) / 0.16) / 100 = 0.667rem
  xxs: Math.round(MAX_BASE_SIZE / MAX_SCALE ** 3 / 0.16) / 100,
  // (20 / 1.333^2) / 0.16) / 100 = 0.889rem
  xs: Math.round(MAX_BASE_SIZE / MAX_SCALE ** 2 / 0.16) / 100,
  // (20 / 1.333) / 0.16) / 100 = 1.185rem
  sm: Math.round(MAX_BASE_SIZE / MAX_SCALE / 0.16) / 100,
  // 20 / 0.16) / 100 = 1.25rem (baseline)
  md: Math.round(MAX_BASE_SIZE / 0.16) / 100,
  // (20 * 1.333) / 0.16) / 100 = 1.666rem
  lg: Math.round((MAX_BASE_SIZE * MAX_SCALE) / 0.16) / 100,
  // (20 * 1.333^2) / 0.16) / 100 = 2.221rem
  xl: Math.round((MAX_BASE_SIZE * MAX_SCALE ** 2) / 0.16) / 100,
  // (20 * 1.333^3) / 0.16) / 100 = 2.961rem
  xxl: Math.round((MAX_BASE_SIZE * MAX_SCALE ** 3) / 0.16) / 100,
}

const SLOPE = {
  xxs: (16 * (MAX_FONT.xxs - MIN_FONT.xxs)) / (MAX_WIDTH - MIN_WIDTH),
  xs: (16 * (MAX_FONT.xs - MIN_FONT.xs)) / (MAX_WIDTH - MIN_WIDTH),
  sm: (16 * (MAX_FONT.sm - MIN_FONT.sm)) / (MAX_WIDTH - MIN_WIDTH),
  md: (16 * (MAX_FONT.md - MIN_FONT.md)) / (MAX_WIDTH - MIN_WIDTH),
  lg: (16 * (MAX_FONT.lg - MIN_FONT.lg)) / (MAX_WIDTH - MIN_WIDTH),
  xl: (16 * (MAX_FONT.xl - MIN_FONT.xl)) / (MAX_WIDTH - MIN_WIDTH),
  xxl: (16 * (MAX_FONT.xxl - MIN_FONT.xxl)) / (MAX_WIDTH - MIN_WIDTH),
}

const INTERCEPT = {
  xxs: Math.round(100 * (MIN_FONT.xxs - SLOPE.xxs * (MIN_WIDTH / 16))) / 100,
  xs: Math.round(100 * (MIN_FONT.xs - SLOPE.xs * (MIN_WIDTH / 16))) / 100,
  sm: Math.round(100 * (MIN_FONT.sm - SLOPE.sm * (MIN_WIDTH / 16))) / 100,
  md: Math.round(100 * (MIN_FONT.md - SLOPE.md * (MIN_WIDTH / 16))) / 100,
  lg: Math.round(100 * (MIN_FONT.lg - SLOPE.lg * (MIN_WIDTH / 16))) / 100,
  xl: Math.round(100 * (MIN_FONT.xl - SLOPE.xl * (MIN_WIDTH / 16))) / 100,
  xxl: Math.round(100 * (MIN_FONT.xxl - SLOPE.xxl * (MIN_WIDTH / 16))) / 100,
}

/**
 * @tokens fontSizes
 * @css fontSize
 */
export const fontSizes = defineVars({
  // (0.579rem -> 0.667rem)
  xxs: `clamp(${Math.min(MIN_FONT.xxs)}rem, calc(${INTERCEPT.xxs}rem + ${Math.round(10000 * SLOPE.xxs) / 100}vw), ${Math.max(MAX_FONT.xxs)}rem)`,
  // (0.694rem -> 0.889rem)
  xs: `clamp(${Math.min(MIN_FONT.xs)}rem, calc(${INTERCEPT.xs}rem + ${Math.round(10000 * SLOPE.xs) / 100}vw), ${Math.max(MAX_FONT.xs)}rem)`,
  // (0.833rem -> 1.185rem)
  sm: `clamp(${Math.min(MIN_FONT.sm)}rem, calc(${INTERCEPT.sm}rem + ${Math.round(10000 * SLOPE.sm) / 100}vw), ${Math.max(MAX_FONT.sm)}rem)`,
  // (1rem -> 1.25rem) [baseline]
  md: `clamp(${Math.min(MIN_FONT.md)}rem, calc(${INTERCEPT.md}rem + ${Math.round(10000 * SLOPE.md) / 100}vw), ${Math.max(MAX_FONT.md)}rem)`,
  // (1.2rem -> 1.666rem)
  lg: `clamp(${Math.min(MIN_FONT.lg)}rem, calc(${INTERCEPT.lg}rem + ${Math.round(10000 * SLOPE.lg) / 100}vw), ${Math.max(MAX_FONT.lg)}rem)`,
  // (1.44rem -> 2.221rem)
  xl: `clamp(${Math.min(MIN_FONT.xl)}rem, calc(${INTERCEPT.xl}rem + ${Math.round(10000 * SLOPE.xl) / 100}vw), ${Math.max(MAX_FONT.xl)}rem)`,
  // (1.728rem -> 2.961rem)
  xxl: `clamp(${Math.min(MIN_FONT.xxl)}rem, calc(${INTERCEPT.xxl}rem + ${Math.round(10000 * SLOPE.xxl) / 100}vw), ${Math.max(MAX_FONT.xxl)}rem)`,
})

/**
 * @tokens lineHeights
 * @css lineHeight
 *
 * Line height values are unitless multipliers:
 * - Smaller text (xxs-sm) uses larger line heights for better readability
 * - Base text (md) uses standard reading line height
 * - Larger text (lg-xxl) uses tighter line heights for headlines
 */
export const lineHeights = defineVars({
  // Comfortable reading for very small text
  xxs: '1.8',
  // Good readability for small text
  xs: '1.7',
  // Slightly more spacing for small text
  sm: '1.6',
  // Standard reading line height
  md: '1.6',
  // Slightly tighter for larger text
  lg: '1.5',
  // Tighter spacing for headlines
  xl: '1.35',
  // Very tight spacing for large headlines
  xxl: '1.2',
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
 *
 * To supply custom font families create a theme from this variable group.
 *
 * The variable can be used but as variables are defined at the root, supplying a variable will only work if supplied on the HTML element.
 */
export const fonts = defineVars({
  display: 'var(--font-display, system-ui, sans-serif)',
  body: 'var(--font-body, system-ui, sans-serif)',
  mono: 'var(--font-mono, ui-monospace, monospace)',
})

/**
 * @tokens letterSpacings
 * @css letterSpacing
 *
 * Two sets of letter spacing values:
 * 1. Size-based scale (xxs-xxl):
 *    - Smaller text: slightly increased spacing for legibility
 *    - Base text: normal spacing for comfortable reading
 *    - Display text: tighter spacing for headlines
 *
 * 2. Semantic scale (tighter-widest):
 *    - For specific typographic adjustments
 *    - Wider range of values for more dramatic effects
 *
 * Values in em units to scale with font size.
 * Different fonts may require different spacings, use a theme to supply values that work well with your style and font choices.
 */
export const tracking = defineVars({
  // Size-based scale
  // More space for tiny text
  xxs: '0.04em',
  // Slightly more space for very small text
  xs: '0.02em',
  // Minor adjustment for small text
  sm: '0.01em',
  // Normal spacing for body text
  md: '0',
  // Slightly tighter for larger text
  lg: '-0.01em',
  // Tighter for display text
  xl: '-0.02em',
  // Tightest for largest display text
  xxl: '-0.03em',

  // Semantic scale
  // Dramatic tight spacing for specific effects
  tighter: '-0.05em',
  // Moderately tight spacing
  tight: '-0.025em',
  // Default letter spacing
  normal: '0',
  // Slightly spread letters
  wide: '0.025em',
  // Moderately spread letters
  wider: '0.05em',
  // Maximum letter spread for emphasis
  widest: '0.1em',
})

/**
 * ----------------------------------------------------------------------------
 */

/**
 * The following values and logic relate to capsize.
 * Text-box is now supported in _most_ modern browsers.
 * @see https://caniuse.com/?search=text-box
 *
 * The following is maintained should you need the fallback.
 * Capsize is specific to fonts, the example here uses metric from Roboto but you should use your own font metrics.
 */

/**
 * Roboto font metrics
 * @deprecated by text-box being supported
 *
 * @see https://www.npmjs.com/package/@capsizecss/metrics
 */
const robotoMetrics = {
  familyName: 'Roboto',
  fullName: 'Roboto',
  postscriptName: 'Roboto-Regular',
  category: 'sans-serif',
  capHeight: 1456,
  ascent: 1900,
  descent: -500,
  lineGap: 0,
  unitsPerEm: 2048,
  xHeight: 1082,
  xWidthAvg: 911,
  subsets: {
    latin: {
      xWidthAvg: 911,
    },
    thai: {
      xWidthAvg: 908,
    },
  },
}

/**
 * Base sizes for Roboto font
 * @deprecated by text-box being supported
 */
const roboto = {
  // ascent: '0.927734375em',
  // lineGap: '0em',
  // capHeight: '0.7109375em',
  // descent: '-0.244140625em',
  // xHeight: '0.5283203125em',
  ascent: `${robotoMetrics.ascent / robotoMetrics.unitsPerEm}em`,
  lineGap: `${robotoMetrics.lineGap / robotoMetrics.unitsPerEm}em`,
  capHeight: `${robotoMetrics.capHeight / robotoMetrics.unitsPerEm}em`,
  descent: `${robotoMetrics.descent / robotoMetrics.unitsPerEm}em`,
  xHeight: `${robotoMetrics.xHeight / robotoMetrics.unitsPerEm}em`,
}

/**
 * Trim values specifically for Roboto
 * @deprecated by text-box being supported
 */
const robotoTrim = {
  textBoxTrimStartText: `calc(${roboto.capHeight} - ${roboto.ascent} + ${roboto.lineGap} / 2)`,
  textBoxTrimEndText: `calc(${roboto.lineGap} / 2)`,
  textBoxTrimStartCap: `calc(${roboto.capHeight} - ${roboto.ascent} + ${roboto.lineGap} / 2)`,
  textBoxTrimStartEx: `calc(${roboto.xHeight} - ${roboto.ascent} + ${roboto.lineGap} / 2)`,
  textBoxTrimEndAlphabetic: `calc(${roboto.descent} - ${roboto.lineGap} / 2)`,
}

/**
 * @tokens capsize
 * @css none
 * @deprecated by text-box being supported
 *
 * Variables to enable polyfill for leading-trim.
 * * https://seek-oss.github.io/capsize/
 * * https://github.com/jantimon/text-box-trim-examples
 */
export const capsize = defineVars({
  trimStartText: robotoTrim.textBoxTrimStartText,
  trimEndText: robotoTrim.textBoxTrimEndText,
  trimStartCap: robotoTrim.textBoxTrimStartCap,
  trimStartX: robotoTrim.textBoxTrimStartEx,
  trimEndAlphabetic: robotoTrim.textBoxTrimEndAlphabetic,
})
