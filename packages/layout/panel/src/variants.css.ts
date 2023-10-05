import {style, assignVars} from '@vanilla-extract/css'
import {theme} from '@urban-ui/theme'
import {anatomy} from './anatomy.css.ts'

export const padding = {
  sm: style({
    vars: {
      [anatomy.padding]: theme.space.sm,
    },
  }),
  md: style({
    vars: {
      [anatomy.padding]: theme.space.md,
    },
  }),
  lg: style({
    vars: {
      [anatomy.padding]: theme.space.lg,
    },
  }),
}
