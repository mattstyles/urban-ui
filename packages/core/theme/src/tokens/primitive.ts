/**
 * Primitive tokens following the styled-system theme specification.
 * These form the foundation of our design system.
 */

// Space scale - used for margin, padding, grid gap, etc.
export const space = {
  0: '0px',
  25: '2px',
  50: '4px',
  75: '6px',
  100: '8px',
  150: '12px',
  200: '16px',
  250: '20px',
  300: '24px',
  350: '28px',
  400: '32px',
  450: '36px',
  500: '40px',
  550: '44px',
  600: '48px',
  700: '56px',
  800: '64px',
  900: '72px',
  1000: '80px',
  1100: '88px',
  1200: '96px',
  1600: '128px',
} as const

// Font sizes scale
export const fontSizes = {
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  md: '1rem', // 16px
  lg: '1.125rem', // 18px
  xl: '1.25rem', // 20px
} as const

// Line heights
export const lineHeights = {
  xs: 1, // Tight
  sm: 1.25, // Compact
  md: 1.5, // Normal
  lg: 1.75, // Relaxed
  xl: 2, // Loose
} as const

// Colors
export const colors = {
  // Core
  transparent: 'transparent',
  current: 'currentColor',

  // Base
  black: 'hsl(0 0% 0%)',
  white: 'hsl(0 0% 100%)',

  // Gray
  gray: {
    50: 'hsl(0 0% 98%)',
    100: 'hsl(0 0% 96%)',
    200: 'hsl(0 0% 90%)',
    300: 'hsl(0 0% 83%)',
    400: 'hsl(0 0% 74%)',
    500: 'hsl(0 0% 62%)',
    600: 'hsl(0 0% 46%)',
    700: 'hsl(0 0% 38%)',
    800: 'hsl(0 0% 26%)',
    900: 'hsl(0 0% 13%)',
  },

  // Brand
  primary: {
    50: 'hsl(270 100% 98%)',
    100: 'hsl(270 100% 92%)',
    200: 'hsl(270 100% 86%)',
    300: 'hsl(270 100% 75%)',
    400: 'hsl(270 100% 65%)',
    500: 'hsl(270 100% 50%)',
    600: 'hsl(270 100% 40%)',
    700: 'hsl(270 100% 35%)',
    800: 'hsl(270 100% 30%)',
    900: 'hsl(270 100% 25%)',
  },
} as const

// Font families
export const fonts = {
  body: 'system-ui, sans-serif',
  heading: 'inherit',
  mono: 'ui-monospace, monospace',
} as const

// Font weights
export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

// Letter spacings
export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const

// Border widths
export const borderWidths = {
  none: '0',
  sm: '1px',
  md: '2px',
  lg: '4px',
} as const

// Border styles
export const borderStyles = {
  none: 'none',
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
} as const

// Border radii
export const radii = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const

// Z-index scale
export const zIndices = {
  hide: -1,
  base: 0,
} as const

// Breakpoints
export const breakpoints = {
  sm: '640px', // Tablets and larger phones
  md: '960px', // Small laptops and tablets in landscape
  lg: '1280px', // Desktop and larger laptops
} as const

// Sizes - used for width, height, min/max width/height
export const sizes = {
  full: '100%',
  min: 'min-content',
  max: 'max-content',
  fit: 'fit-content',
} as const
