import {style, fallbackVar, createVar, assignVars} from '@vanilla-extract/css'
import {calc} from '@vanilla-extract/css-utils'
import {atoms} from '@urban-ui/theme/atoms'
import {theme} from '@urban-ui/theme'
import {anatomy as textAnatomy} from '@urban-ui/text/anatomy'
import {anatomy} from './anatomy.css.ts'

const height = createVar()
const padding = createVar()
const textHeight = createVar()

export const base = style([
  atoms({
    fontWeight: 'normal',
    kerning: 'md',
    focusRing: 'visible',
    borderRadius: 'sm',
  }),
  {
    borderColor: anatomy.border.color,
    borderStyle: 'solid',
    borderWidth: anatomy.border.width,

    vars: assignVars(anatomy.border, {
      width: theme.space.xxs,
      color: theme.colors.current.border.muted,
    }),
  },
  {
    appearance: 'none',
    outline: 'none',

    fontSize: fallbackVar(
      textAnatomy.size.fontSize,
      theme.type.size.md.fontSize,
    ),
    lineHeight: textHeight,

    paddingTop: padding,
    paddingBottom: padding,
    paddingLeft: theme.space.md,
    paddingRight: theme.space.md,

    backgroundColor: fallbackVar(
      theme.colors.current.surface.muted,
      theme.colors.app.muted,
    ),

    vars: {
      [padding]: calc(
        calc(height)
          .subtract(textHeight)
          .subtract(calc(anatomy.border.width).multiply(2))
          .divide(2),
      ).toString(),
      [textHeight]: fallbackVar(
        textAnatomy.size.lineHeight,
        theme.type.size.md.lineHeight,
      ),
      [height]: fallbackVar(anatomy.size.height, theme.sizes.control.md),
      [textAnatomy.weight]: theme.type.weight.normal,
      [textAnatomy.kerning]: theme.type.kerning.md,
      [textAnatomy.capHeight]: theme.type.capHeight.md,
    },

    selectors: {
      '&[data-hovered=true]': {
        vars: assignVars(anatomy.border, {
          width: theme.space.xxs,
          color: theme.colors.current.border.subtle,
        }),
      },
      '&[data-focused=true]': {
        vars: assignVars(anatomy.border, {
          width: theme.space.xxs,
          color: theme.colors.current.border.emphasis,
        }),
      },
      '&[disabled]': {
        background: theme.colors.core.disabled.bg,
        color: theme.colors.core.disabled.fg,
        borderColor: theme.colors.core.disabled.bg,
        cursor: 'not-allowed',
      },
    },
  },
])