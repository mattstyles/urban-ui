import { defineVars } from '@stylexjs/stylex'

export const tone = defineVars({
  fg: 'hsl(0, 0%, 23%)',
  surface: 'hsl(0, 0%, 94%)',
  muted: 'hsl(0, 0%, 80%)',
  element: 'hsl(0, 0%, 52%)',
  border: 'hsl(0, 0%, 82%)',
})

export const fg = defineVars({
  // hi: {
  //   default: 'hsl(0, 0%, 23%)',
  // },
  // lo: {
  //   default: 'hsl(0, 0%, 38%)',
  // },
  hi: 'hsl(0, 0%, 23%)',
  lo: 'hsl(0, 0%, 38%)',
})

export const element = defineVars({
  base: 'hsl(0, 0%, 52%)',
  hover: 'hsl(0, 0%, 49%)',
  press: 'hsl(0, 0%, 45%)',
  selected: 'hsl(0, 0%, 42%)',
})
