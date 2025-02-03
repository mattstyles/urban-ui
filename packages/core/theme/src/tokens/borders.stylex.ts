import { defineVars } from '@stylexjs/stylex'

export const borderWidths = defineVars({
  none: '0',
  sm: '1px',
  md: '2px',
  lg: '4px',
})

export const borderStyles = defineVars({
  none: 'none',
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
})

export const radii = defineVars({
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
})
