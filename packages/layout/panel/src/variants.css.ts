import {style, assignVars} from '@vanilla-extract/css'
import {theme} from '@urban-ui/theme'
import {anatomy} from './anatomy.css.ts'

export const padding = {
  px: {
    none: style({
      vars: {
        [anatomy.px]: theme.space.none,
      },
    }),
    sm: style({
      vars: {
        [anatomy.px]: theme.space.sm,
      },
    }),
    md: style({
      vars: {
        [anatomy.px]: theme.space.md,
      },
    }),
    lg: style({
      vars: {
        [anatomy.px]: theme.space.lg,
      },
    }),
  },
  py: {
    none: style({
      vars: {
        [anatomy.py]: theme.space.none,
      },
    }),
    sm: style({
      vars: {
        [anatomy.py]: theme.space.sm,
      },
    }),
    md: style({
      vars: {
        [anatomy.py]: theme.space.md,
      },
    }),
    lg: style({
      vars: {
        [anatomy.py]: theme.space.lg,
      },
    }),
  },
}
