import {style, fallbackVar, createVar} from '@vanilla-extract/css'
import {atoms} from '@urban-ui/theme/atoms'
import {theme} from '@urban-ui/theme'
import {anatomy} from './anatomy.css.ts'

const borderBase = createVar()
const borderHover = createVar()
const borderPress = createVar()

export const base = style([
  atoms({
    display: 'inline-flex',
    placeItems: 'center',
    flex: 'none',
  }),
  {
    appearance: 'none',
    lineHeight: 1,
    padding: '8px 12px',
    fontSize: 14,
    outline: 'none',

    userSelect: 'none',
    WebkitUserSelect: 'none',

    backgroundColor: fallbackVar(
      anatomy.bg.base,
      theme.colors.base.tone.bg.base,
    ),
    color: fallbackVar(anatomy.fg.base, theme.colors.base.tone.fg.hi),

    border: 'none',
    boxShadow: fallbackVar(borderBase, '0px 0px 0px 0px transparent'),

    transition:
      'background-color 150ms ease-in-out, box-shadow 150ms ease-in-out',

    vars: {
      [borderBase]: `0px 0px 0px 1px ${anatomy.border.borderColor.base}`,
      [borderHover]: `0px 0px 0px 1px ${anatomy.border.borderColor.hover}`,
      [borderPress]: `0px 0px 0px 1px ${anatomy.border.borderColor.press}`,
    },

    selectors: {
      '&[data-focus-visible=true]': {
        outline: '2px solid blue',
        outlineOffset: 2,
      },
      '&[data-hovered=true]': {
        backgroundColor: fallbackVar(
          anatomy.bg.hover,
          theme.colors.base.tone.bg.aux,
        ),
        color: fallbackVar(anatomy.fg.hover, theme.colors.base.tone.fg.hi),
        boxShadow: fallbackVar(borderHover, '0px 0px 0px 0px transparent'),
      },
      '&[data-pressed=true]': {
        backgroundColor: fallbackVar(
          anatomy.bg.press,
          theme.colors.base.tone.bg.emphasis,
        ),
        color: fallbackVar(anatomy.fg.press, theme.colors.base.tone.fg.hi),
        boxShadow: fallbackVar(borderPress, '0px 0px 0px 0px transparent'),
      },
    },
  },
])
