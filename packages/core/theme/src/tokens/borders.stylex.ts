import { defineVars } from '@stylexjs/stylex'

export const borderWidths = defineVars({
  none: '0',
  sm: '1px',
  md: '2px',
  lg: '4px',
})

/**
 * @tokens borderStyles
 * @css border-style
 */
export const borderStyles = defineVars({
  none: 'none',
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  double: 'double',
})

/**
 * @tokens radii
 * @css border-radius
 */
export const radii = defineVars({
  none: '0',
  sm: '2px',
  md: '4px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
})
