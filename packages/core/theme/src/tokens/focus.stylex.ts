import { defineVars } from '@stylexjs/stylex'
import { base } from './colors.stylex'

export const DARK = '@media (prefers-color-scheme: dark)'

export const focus = defineVars({
  outlineColor: base.black,
  outlineSize: '2px',
  outlineOffset: '4px',
  outlineStyle: 'auto',
})
