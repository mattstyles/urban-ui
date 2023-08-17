import {style, fallbackVar, createVar, assignVars} from '@vanilla-extract/css'
import {calc} from '@vanilla-extract/css-utils'
import {atoms} from '@urban-ui/theme/atoms'
import {theme} from '@urban-ui/theme'
import {anatomy as textAnatomy} from '@urban-ui/text/anatomy'
import {px} from '@urban-ui/utils'
import {anatomy} from './anatomy.css.ts'

const border = createVar()
const height = createVar()

export const base = style([
  atoms({
    display: 'inline-flex',
    placeItems: 'center',
    flex: 'none',
    type: 'md',
  }),
  {
    vars: assignVars(textAnatomy.size, theme.type.size.md),
  },
  {
    paddingTop: calc(height)
      .subtract(textAnatomy.capHeight)
      .divide(2)
      .toString(),
    paddingBottom: calc(height)
      .subtract(textAnatomy.capHeight)
      .divide(2)
      .toString(),
    paddingLeft: theme.space.xl,
    paddingRight: theme.space.xl,
  },
  {
    appearance: 'none',
    outline: 'none',

    userSelect: 'none',
    WebkitUserSelect: 'none',

    backgroundColor: fallbackVar(
      anatomy.bg.base,
      theme.colors.base.element.base,
    ),
    color: fallbackVar(anatomy.fg.base, theme.colors.base.fg.invert.hi),

    borderRadius: 6,
    border: 'none',
    boxShadow: fallbackVar(border, '0px 0px 0px 0px transparent'),

    transition:
      'background-color 150ms ease-in-out, box-shadow 150ms ease-in-out',

    vars: {
      [border]: `0px 0px 0px 1px ${anatomy.border.borderColor}`,
      [height]: px(44),
      [textAnatomy.weight]: theme.type.weight.bold,
      [textAnatomy.kerning]: theme.type.kerning.sm,
      [textAnatomy.capHeight]: theme.type.capHeight.md,
    },

    selectors: {
      '&[data-focus-visible=true]': {
        outline: '2px solid blue',
        outlineOffset: 2,
      },
      '&[data-hovered=true]': {
        backgroundColor: fallbackVar(
          anatomy.bg.hover,
          theme.colors.base.element.hover,
        ),
        color: fallbackVar(anatomy.fg.hover, theme.colors.base.fg.invert.hi),
        boxShadow: fallbackVar(border, '0px 0px 0px 0px transparent'),
      },
      '&[data-pressed=true]': {
        backgroundColor: fallbackVar(
          anatomy.bg.press,
          theme.colors.base.element.press,
        ),
        color: fallbackVar(anatomy.fg.press, theme.colors.base.fg.invert.hi),
        boxShadow: fallbackVar(border, '0px 0px 0px 0px transparent'),
      },
    },
  },
])
