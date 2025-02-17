import { defineVars } from '@stylexjs/stylex'

export const borderWidths = defineVars({
  // 0px
  none: '0',
  // 1px
  sm: '1px',
  // 2px
  md: '2px',
  // 4px
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
  // 0px
  none: '0',
  // 2px
  sm: '2px',
  // 4px
  md: '4px',
  // 8px
  lg: '8px',
  // 12px
  xl: '12px',
  // 16px
  '2xl': '16px',
  // 24px
  '3xl': '24px',
  // 9999px
  full: '9999px',
})
