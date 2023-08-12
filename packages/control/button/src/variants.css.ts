import {style, assignVars} from '@vanilla-extract/css'
import {theme} from '@urban-ui/theme'
import {anatomy} from './anatomy.css.ts'

export const solid = style([
  {
    vars: assignVars(anatomy.bg, {
      base: theme.colors.base.element.base,
      hover: theme.colors.base.element.hover,
      press: theme.colors.base.element.press,
    }),
  },
  {
    // This should actually be from the global white scale, as tonal colour hi won’t necessarily work against the element bg base colour
    vars: assignVars(anatomy.fg, {
      base: theme.colors.base.fg.invert.hi,
      hover: theme.colors.base.fg.invert.hi,
      press: theme.colors.base.fg.invert.hi,
    }),
  },
])

export const ghost = style([
  {
    vars: assignVars(anatomy.bg, {
      base: theme.colors.transparency.accent[0],
      hover: theme.colors.base.element.muted.hover,
      press: theme.colors.base.element.muted.press,
    }),
  },
  {
    vars: assignVars(anatomy.fg, {
      base: theme.colors.base.fg.hi,
      hover: theme.colors.base.fg.hi,
      press: theme.colors.base.fg.hi,
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
      base: theme.colors.base.fg.hi,
      hover: theme.colors.base.fg.hi,
      press: theme.colors.base.fg.hi,
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
      base: theme.colors.base.fg.hi,
      hover: theme.colors.base.fg.hi,
      press: theme.colors.base.fg.hi,
    }),
  },
  {
    vars: assignVars(anatomy.border, {
      borderColor: theme.colors.base.border.emphasis,
      // @TODO should pull from a border width theme variable
      borderWidth: theme.space.xs,
    }),
  },
])
