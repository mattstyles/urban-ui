import {style, assignVars} from '@vanilla-extract/css'
import {theme} from '@urban-ui/theme'
import {anatomy} from './anatomy.css.ts'
import {anatomy as textAnatomy} from '@urban-ui/text/anatomy'

const small = style([
  {
    vars: assignVars(anatomy.size, {
      height: theme.sizes.control.sm,
    }),
  },
  {
    vars: assignVars(textAnatomy.size, theme.type.size.md),
  },
])

const standard = style([
  {
    vars: assignVars(anatomy.size, {
      height: theme.sizes.control.md,
    }),
  },
  {
    vars: assignVars(textAnatomy.size, theme.type.size.md),
  },
])

const large = style([
  {
    vars: assignVars(anatomy.size, {
      height: theme.sizes.control.lg,
    }),
  },
  {
    vars: assignVars(textAnatomy.size, theme.type.size.lg),
  },
])

export const sizes = {small, standard, large}

export const colors = {
  app: {
    muted: style({
      backgroundColor: theme.colors.app.bg.muted,
    }),
    base: style({
      backgroundColor: theme.colors.app.bg.base,
    }),
  },
  surface: {
    muted: style({
      backgroundColor: theme.colors.current.surface.muted,
    }),
    base: style({
      backgroundColor: theme.colors.current.surface.base,
    }),
  },
}
