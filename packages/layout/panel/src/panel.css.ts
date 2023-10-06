import {style, fallbackVar, createVar, assignVars} from '@vanilla-extract/css'
import {calc} from '@vanilla-extract/css-utils'
import {atoms} from '@urban-ui/theme/atoms'
import {theme} from '@urban-ui/theme'
import {anatomy} from './anatomy.css.js'

export const base = style([
  atoms({
    width: 'fill',
  }),
  {
    vars: {
      [anatomy.padding]: theme.space.md,
    },
  },
])

export const header = style([
  atoms({
    fontSize: 'lg',
    fontWeight: 'semibold',
  }),
  {
    paddingLeft: anatomy.padding,
  },
])

export const appliedPadding = style({
  paddingLeft: anatomy.padding,
  paddingRight: anatomy.padding,
  paddingTop: anatomy.padding,
  paddingBottom: anatomy.padding,
})
