import { defineVars } from '@stylexjs/stylex'

/**
 * @tokens fontSizes
 * @css fontSize
 */
export const fontSizes = defineVars({
  // xs: '0.75rem',
  // sm: '0.875rem',
  // md: '1rem',
  // lg: '1.125rem',
  // xl: '1.25rem',
  xs: '10px',
  sm: '14px',
  md: '17px',
  lg: '23px',
  xl: '32px',
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
