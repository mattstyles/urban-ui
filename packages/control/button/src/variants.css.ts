import {style, assignVars} from '@vanilla-extract/css'
import {theme} from '@urban-ui/theme'
import {anatomy} from './anatomy.css.ts'
import {anatomy as textAnatomy} from '@urban-ui/text/anatomy'

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
      color: theme.colors.current.border.emphasis,
      // @TODO should pull from a border width theme variable
      width: theme.space.xxs,
    }),
  },
])

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

export const scale = style({
  transition: 'transform 200ms cubic-bezier(.34,1.56,1,1.65)',
  selectors: {
    '&[data-pressed=true]': {
      transform: 'scale(0.97)',
    },
  },
})

export const effects = {scale}
