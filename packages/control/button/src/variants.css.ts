import {style, assignVars} from '@vanilla-extract/css'
import {theme} from '@urban-ui/theme'
import {anatomy} from './anatomy.css.ts'

export const solid = style([
  {
    vars: assignVars(anatomy.bg, {
      base: theme.colors.base.tone.bg.base,
      hover: theme.colors.base.tone.bg.aux,
      press: theme.colors.base.tone.bg.emphasis,
    }),
  },
])

export const ghost = style([
  {
    vars: assignVars(anatomy.bg, {
      base: theme.colors.transparency.accent[0],
      hover: theme.colors.base.muted.bg.aux,
      press: theme.colors.base.muted.bg.emphasis,
    }),
  },
  {
    vars: assignVars(anatomy.fg, {
      base: theme.colors.base.muted.fg.lo,
      hover: theme.colors.base.muted.fg.lo,
      press: theme.colors.base.muted.fg.lo,
    }),
  },
])

export const transparent = style([
  {
    vars: assignVars(anatomy.bg, {
      base: theme.colors.core.transparent,
      hover: theme.colors.transparency.deepen[200],
      press: theme.colors.transparency.deepen[300],
    }),
  },
  {
    vars: assignVars(anatomy.fg, {
      base: theme.colors.base.muted.fg.hi,
      hover: theme.colors.base.muted.fg.hi,
      press: theme.colors.base.muted.fg.hi,
    }),
  },
])

export const outline = style([
  {
    vars: assignVars(anatomy.bg, {
      base: theme.colors.core.transparent,
      hover: theme.colors.transparency.deepen[50],
      press: theme.colors.transparency.deepen[75],
    }),
  },
  {
    vars: assignVars(anatomy.fg, {
      base: theme.colors.base.muted.fg.hi,
      hover: theme.colors.base.muted.fg.hi,
      press: theme.colors.base.muted.fg.hi,
    }),
  },
  {
    vars: assignVars(anatomy.border, {
      borderColor: {
        base: theme.colors.base.border.base,
        hover: theme.colors.base.border.aux,
        press: theme.colors.base.border.emphasis,
      },
      // @TODO should pull from a border width theme variable
      borderWidth: theme.space.xs,
    }),
  },
])
