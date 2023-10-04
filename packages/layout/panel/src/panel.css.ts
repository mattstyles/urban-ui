import {style, fallbackVar, createVar, assignVars} from '@vanilla-extract/css'
import {calc} from '@vanilla-extract/css-utils'
import {atoms} from '@urban-ui/theme/atoms'
import {theme} from '@urban-ui/theme'
import {anatomy} from './anatomy.css.js'

export const base = style([
  {
    padding: 20,
    // color: anatomy.fg,
    // backgroundColor: anatomy.bg,

    vars: {
      [anatomy.fg]: theme.colors.fg.hi,
      [anatomy.bg]: theme.colors.current.surface.base,
    },
  },
])
