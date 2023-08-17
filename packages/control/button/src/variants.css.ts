import {style, assignVars} from '@vanilla-extract/css'
import {theme} from '@urban-ui/theme'
import {anatomy} from './anatomy.css.ts'

export const solid = style([
  {
    vars: assignVars(anatomy.bg, {
      base: theme.colors.current.element.base,
      hover: theme.colors.current.element.hover,
      press: theme.colors.current.element.press,
    }),
  },
  {
    // This should actually be from the global white scale, as tonal colour hi won’t necessarily work against the element bg current colour
    vars: assignVars(anatomy.fg, {
      base: theme.colors.current.fg.invert.hi,
      hover: theme.colors.current.fg.invert.hi,
      press: theme.colors.current.fg.invert.hi,
    }),
  },
])

export const ghost = style([
  {
    vars: assignVars(anatomy.bg, {
      base: theme.colors.transparency.accent[0],
      hover: theme.colors.current.element.muted.hover,
      press: theme.colors.current.element.muted.press,
    }),
  },
  {
    vars: assignVars(anatomy.fg, {
      base: theme.colors.current.fg.hi,
      hover: theme.colors.current.fg.hi,
      press: theme.colors.current.fg.hi,
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
      base: theme.colors.current.fg.hi,
      hover: theme.colors.current.fg.hi,
      press: theme.colors.current.fg.hi,
    }),
  },
])

export const outline = style([
  {
    vars: assignVars(anatomy.bg, {
      base: theme.colors.transparency.accent[0],
      hover: theme.colors.current.element.muted.hover,
      press: theme.colors.current.element.muted.press,
    }),
  },
  {
    vars: assignVars(anatomy.fg, {
      base: theme.colors.current.fg.hi,
      hover: theme.colors.current.fg.hi,
      press: theme.colors.current.fg.hi,
    }),
  },
  {
    vars: assignVars(anatomy.border, {
      borderColor: theme.colors.current.border.emphasis,
      // @TODO should pull from a border width theme variable
      borderWidth: theme.space.xs,
    }),
  },
])
