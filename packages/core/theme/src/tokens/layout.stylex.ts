import { defineVars } from '@stylexjs/stylex'

export const space = defineVars({
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
})

export const sizes = defineVars({
  full: '100%',
  min: 'min-content',
  max: 'max-content',
  fit: 'fit-content',
})

export const breakpoints = defineVars({
  sm: '640px',
  md: '960px',
  lg: '1280px',
})

export const zIndices = defineVars({
  hide: '-1',
  base: '0',
})
