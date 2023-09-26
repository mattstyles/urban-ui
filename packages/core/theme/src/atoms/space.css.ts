import {defineProperties} from '@vanilla-extract/sprinkles'

import {theme} from '../theme.css.ts'

export const space = defineProperties({
  properties: {
    gap: theme.space,
    paddingTop: theme.space,
    paddingRight: theme.space,
    paddingBottom: theme.space,
    paddingLeft: theme.space,
    padding: theme.space,
  },
  shorthands: {
    p: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    pt: ['paddingTop'],
    pr: ['paddingRight'],
    pb: ['paddingBottom'],
    pl: ['paddingLeft'],
  },
})

export const size = defineProperties({
  properties: {
    width: {
      ...theme.space,
      fit: 'fit-content',
      max: 'max-content',
      min: 'min-content',
      fill: '100%',
    },
    height: {
      ...theme.space,
      fit: 'fit-content',
      max: 'max-content',
      min: 'min-content',
      fill: '100%',
    },
  },
  shorthands: {
    size: ['width', 'height'],
  },
})
