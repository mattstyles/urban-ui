import { defineVars } from '@stylexjs/stylex'

export const fontSizes = defineVars({
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
})

export const lineHeights = defineVars({
  xs: '1',
  sm: '1.25',
  md: '1.5',
  lg: '1.75',
  xl: '2',
})

export const fontWeights = defineVars({
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
})

export const fonts = defineVars({
  body: 'system-ui, sans-serif',
  heading: 'inherit',
  mono: 'ui-monospace, monospace',
})

export const letterSpacings = defineVars({
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
})
