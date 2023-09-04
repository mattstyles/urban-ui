import {style, assignVars} from '@vanilla-extract/css'
import {theme} from '@urban-ui/theme'
import {anatomy as textAnatomy} from '@urban-ui/text/anatomy'

export const column = style({
  width: 300,
})

export const darkPanel = style({
  backgroundColor: theme.colors.current.element.base,
  // vars: {
  //   [textAnatomy.color]: theme.colors.foreground.invert,
  // },
  vars: assignVars(textAnatomy.color, theme.colors.foreground.invert),
})

export const lightPanel = style({
  backgroundColor: theme.colors.current.surface.emphasis,
})
