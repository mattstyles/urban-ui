import { defineVars } from '@stylexjs/stylex'

const MIN_WIDTH = 320
const MAX_WIDTH = 1240

const spaceMin = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 44,
}

const spaceMax = {
  xxs: 2,
  xs: 5,
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
  xxl: 60,
}

const spaceSlope = {
  xxs: (spaceMax.xxs - spaceMin.xxs) / (MAX_WIDTH - MIN_WIDTH),
  xs: (spaceMax.xs - spaceMin.xs) / (MAX_WIDTH - MIN_WIDTH),
  sm: (spaceMax.sm - spaceMin.sm) / (MAX_WIDTH - MIN_WIDTH),
  md: (spaceMax.md - spaceMin.md) / (MAX_WIDTH - MIN_WIDTH),
  lg: (spaceMax.lg - spaceMin.lg) / (MAX_WIDTH - MIN_WIDTH),
  xl: (spaceMax.xl - spaceMin.xl) / (MAX_WIDTH - MIN_WIDTH),
  xxl: (spaceMax.xxl - spaceMin.xxl) / (MAX_WIDTH - MIN_WIDTH),
}
// rounded to the nearest 0.25px
const spaceIntercept = {
  xxs: Math.round(4 * (spaceMin.xxs - spaceSlope.xxs * MIN_WIDTH)) / 4,
  xs: Math.round(4 * (spaceMin.xs - spaceSlope.xs * MIN_WIDTH)) / 4,
  sm: Math.round(4 * (spaceMin.sm - spaceSlope.sm * MIN_WIDTH)) / 4,
  md: Math.round(4 * (spaceMin.md - spaceSlope.md * MIN_WIDTH)) / 4,
  lg: Math.round(4 * (spaceMin.lg - spaceSlope.lg * MIN_WIDTH)) / 4,
  xl: Math.round(4 * (spaceMin.xl - spaceSlope.xl * MIN_WIDTH)) / 4,
  xxl: Math.round(4 * (spaceMin.xxl - spaceSlope.xxl * MIN_WIDTH)) / 4,
}

// @TODO use fluid space scale and gretaly reduce the options here
/**
 * @tokens space
 * @css margin, padding, gap, top, right, bottom, left
 */
export const space = defineVars({
  0: '0px',
  25: '2px', // xxs 2-2
  50: '4px', // xs 4-5
  75: '6px',
  100: '8px', // sm 8-10
  150: '12px',
  200: '16px', // md 16-20
  250: '20px',
  300: '24px', // lg 24-30
  350: '28px',
  400: '32px', // xl 32-40
  450: '36px',
  500: '40px',
  550: '44px', // xxl 44-60
  600: '48px',
  700: '56px',
  800: '64px',
  900: '72px',
  1000: '80px',
  1100: '88px',
  1200: '96px',
  1600: '128px',

  // 2px -> 2px
  xxs: `clamp(${Math.min(spaceMin.xxs)}px, calc(${spaceIntercept.xxs}px + ${Math.round(10000 * spaceSlope.xxs) / 100}vw), ${Math.max(spaceMax.xxs)}px)`,
  // 4px -> 5px
  xs: `clamp(${Math.min(spaceMin.xs)}px, calc(${spaceIntercept.xs}px + ${Math.round(10000 * spaceSlope.xs) / 100}vw), ${Math.max(spaceMax.xs)}px)`,
  // 8px -> 10px
  sm: `clamp(${Math.min(spaceMin.sm)}px, calc(${spaceIntercept.sm}px + ${Math.round(10000 * spaceSlope.sm) / 100}vw), ${Math.max(spaceMax.sm)}px)`,
  // 16px -> 2px
  md: `clamp(${Math.min(spaceMin.md)}px, calc(${spaceIntercept.md}px + ${Math.round(10000 * spaceSlope.md) / 100}vw), ${Math.max(spaceMax.md)}px)`,
  // 24px -> 30px
  lg: `clamp(${Math.min(spaceMin.lg)}px, calc(${spaceIntercept.lg}px + ${Math.round(10000 * spaceSlope.lg) / 100}vw), ${Math.max(spaceMax.lg)}px)`,
  // 32px -> 40px
  xl: `clamp(${Math.min(spaceMin.xl)}px, calc(${spaceIntercept.xl}px + ${Math.round(10000 * spaceSlope.xl) / 100}vw), ${Math.max(spaceMax.xl)}px)`,
  // 44px -> 60px
  xxl: `clamp(${Math.min(spaceMin.xxl)}px, calc(${spaceIntercept.xxl}px + ${Math.round(10000 * spaceSlope.xxl) / 100}vw), ${Math.max(spaceMax.xxl)}px)`,
})

/**
 * @tokens sizes
 * @css width, height, minWidth, minHeight, maxWidth, maxHeight
 */
export const sizes = defineVars({
  full: '100%',
  min: 'min-content',
  max: 'max-content',
  fit: 'fit-content',
})

/**
 * @tokens breakpoints
 * @css media queries
 */
export const breakpoints = defineVars({
  sm: '640px',
  md: '960px',
  lg: '1280px',
})

/**
 * @tokens zIndices
 * @css zIndex
 */
export const zIndices = defineVars({
  hide: '-1',
  base: '0',
})
