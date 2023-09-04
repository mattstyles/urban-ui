import {defineProperties} from '@vanilla-extract/sprinkles'
import {theme} from '../theme.css.ts'

export const radii = defineProperties({
  properties: {
    borderRadius: theme.radii,
  },
  shorthands: {
    radii: ['borderRadius'],
  },
})
