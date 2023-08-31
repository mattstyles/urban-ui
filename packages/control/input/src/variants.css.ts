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
  app: style([
    {
      backgroundColor: theme.colors.app.muted,
    },
  ]),
  surface: style([
    {
      backgroundColor: theme.colors.current.surface.muted,
    },
  ]),
  emphasis: style([
    {
      backgroundColor: theme.colors.current.surface.emphasis,
    },
  ]),
}
