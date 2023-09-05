import {style, fallbackVar, createVar, assignVars} from '@vanilla-extract/css'
import {calc} from '@vanilla-extract/css-utils'
import {atoms} from '@urban-ui/theme/atoms'
import {theme} from '@urban-ui/theme'
import {anatomy as textAnatomy} from '@urban-ui/text/anatomy'
import {anatomy} from './anatomy.css.ts'

const height = createVar()
const padding = createVar()

export const base = style([
  atoms({
    position: 'relative',
    display: 'inline-flex',
    placeItems: 'center',
    flex: 'none',
    fontWeight: 'semibold',
    kerning: 'md',
    focusRing: 'visible',
    borderRadius: 'md',
  }),
  // {
  //   vars: assignVars(textAnatomy.size, theme.type.size.md),
  // },
  {
    vars: assignVars(anatomy.border, {
      width: '2px',
      color: theme.colors.core.transparent,
    }),
  },

  {
    appearance: 'none',
    outline: 'none',
    textDecoration: 'none',

    // @TODO add fallback vars
    fontSize: textAnatomy.size.fontSize,
    lineHeight: textAnatomy.size.lineHeight,

    userSelect: 'none',
    WebkitUserSelect: 'none',

    backgroundColor: fallbackVar(
      anatomy.bg.base,
      theme.colors.current.element.strong.base,
    ),

    border: 'none',
    margin: 0,
    padding: 0,
    WebkitTapHighlightColor: 'transparent',

    vars: {
      [padding]: calc(
        calc(height)
          .subtract(textAnatomy.capHeight)
          .subtract(calc(anatomy.border.width).multiply(2))
          .divide(2),
      ).toString(),
      [height]: fallbackVar(anatomy.size.height, theme.sizes.control.md),
      [textAnatomy.weight]: theme.type.weight.semibold,
      [textAnatomy.kerning]: theme.type.kerning.md,
      [textAnatomy.capHeight]: theme.type.capHeight.md,

      // @TODO sort out foreground colours, use neutral scale for white/black on top of tonal background (neutral variant has inverted foreground styles)
      [theme.colors.fg.hi]: fallbackVar(
        anatomy.fg.base,
        theme.colors.current.fg.invert.hi,
      ),
    },

    selectors: {
      '&[data-hovered=true]': {
        vars: {
          [theme.colors.fg.hi]: fallbackVar(
            anatomy.fg.hover,
            theme.colors.current.fg.invert.hi,
          ),
        },
      },
      '&[data-pressed=true]': {
        vars: {
          [theme.colors.fg.hi]: fallbackVar(
            anatomy.fg.press,
            theme.colors.current.fg.invert.hi,
          ),
        },
      },
      '&[disabled]': {
        background: theme.colors.core.disabled.bg,
        color: theme.colors.core.disabled.fg,
        cursor: 'not-allowed',
      },
    },
  },
])

const overlay = style([
  atoms({
    position: 'absolute',
    inset: 0,
    borderRadius: 'md',
  }),
  {
    pointerEvents: 'none',
    transition: `background-color ${theme.transition.duration.sm} ease-in-out, opacity ${theme.transition.duration.sm} ease-in-out`,
  },
])

export const components = {
  hover: style([
    overlay,
    {
      backgroundColor: fallbackVar(
        anatomy.bg.hover,
        theme.colors.current.element.strong.hover,
      ),
      opacity: 0,
      selectors: {
        [`${base}[data-hovered=true] &`]: {
          opacity: 1,
        },
      },
    },
  ]),
  press: style([
    overlay,
    {
      backgroundColor: fallbackVar(
        anatomy.bg.press,
        theme.colors.current.element.strong.press,
      ),
      opacity: 0,
      selectors: {
        [`${base}[data-pressed=true] &`]: {
          opacity: 1,
        },
      },
    },
  ]),
  border: style([
    overlay,
    {
      borderColor: fallbackVar(
        anatomy.border.color,
        theme.colors.core.transparent,
      ),
      borderStyle: 'solid',
      borderWidth: fallbackVar(anatomy.border.width, '2px'),
    },
  ]),
  foreground: style([
    atoms({
      display: 'flex',
      position: 'relative',
    }),
    {
      paddingTop: padding,
      paddingBottom: padding,
      paddingLeft: theme.space.xl,
      paddingRight: theme.space.xl,
    },
  ]),
}
