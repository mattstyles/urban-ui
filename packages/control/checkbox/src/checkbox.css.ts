import {style, fallbackVar, createVar, assignVars} from '@vanilla-extract/css'
import {calc} from '@vanilla-extract/css-utils'
import {atoms} from '@urban-ui/theme/atoms'
import {theme} from '@urban-ui/theme'
import {anatomy} from './anatomy.css.ts'

const padding = createVar()
const size = createVar()

export const base = style([
  atoms({
    focusRing: 'visible',
  }),
  {
    color: anatomy.fg.base,

    borderRadius: fallbackVar(anatomy.border.radii, theme.radii.sm),
    borderColor: fallbackVar(
      anatomy.border.color,
      theme.colors.core.transparent,
    ),
    borderStyle: 'solid',
    borderWidth: fallbackVar(anatomy.border.width, theme.space.xxs),
    backgroundColor: fallbackVar(
      anatomy.bg.base,
      theme.colors.core.transparent,
    ),

    height: size,
    width: size,

    transition: `transform ${theme.transition.duration.sm} ${theme.transition.easing.bounce}, background-color ${theme.transition.duration.sm} ${theme.transition.easing.easeInOut}, color ${theme.transition.duration.sm} ${theme.transition.easing.easeInOut}, border-color ${theme.transition.duration.sm} ${theme.transition.easing.easeInOut}`,

    vars: {
      [size]: calc(anatomy.size.height).divide(2).toString(),
      [anatomy.transition.transform]: 'scale(0.83)',
      [anatomy.border.width]: theme.space.xxs,
    },

    selectors: {
      '&[data-hovered=true]': {
        backgroundColor: anatomy.bg.hover,
        color: anatomy.fg.hover,
      },
      '&[data-pressed=true]': {
        backgroundColor: anatomy.bg.press,
        color: anatomy.fg.press,
        transform: anatomy.transition.transform,
      },
      '&[data-selected=true]': {
        color: anatomy.fg.select,
        backgroundColor: anatomy.bg.select,
      },
      '&[data-disabled=true]': {
        background: theme.colors.core.disabled.bg,
        borderColor: theme.colors.core.disabled.bg,
        // color: theme.colors.core.disabled.fg,
        cursor: 'not-allowed',
        vars: {
          [anatomy.fg.base]: theme.colors.core.transparent,
          [anatomy.fg.select]: theme.colors.core.disabled.fg,
        },
      },
    },
  },
])

export const container = style([
  atoms({userSelect: 'none'}),
  {
    paddingTop: padding,
    paddingBottom: padding,

    vars: {
      [padding]: calc(anatomy.size.height).divide(4).toString(),
    },
  },
])
