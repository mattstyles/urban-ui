import { defineVars } from '@stylexjs/stylex'

import { base } from './colors.stylex'

const DARK = '@media (prefers-color-scheme: dark)'

export const focusVars = defineVars({
  outlineColor: base.black,
  outlineSize: '2px',
  outlineOffset: '4px',
  outlineStyle: 'auto',
})

export const dummy = defineVars({
  outlineColor: 'red',
})
