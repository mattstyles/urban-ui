import {style, assignVars} from '@vanilla-extract/css'

import {theme} from '@urban-ui/theme'

export const primary = style({
  vars: assignVars(theme.colors.current, theme.colors.primary),
})
