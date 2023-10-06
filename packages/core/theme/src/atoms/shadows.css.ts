import {defineProperties} from '@vanilla-extract/sprinkles'
import {theme} from '../theme.css.ts'

export const shadows = defineProperties({
  properties: {
    boxShadow: theme.shadows,
  },
  shorthands: {
    shadow: ['boxShadow'],
  },
})
