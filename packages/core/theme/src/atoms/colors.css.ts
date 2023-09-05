import {defineProperties} from '@vanilla-extract/sprinkles'
import {assignVars} from '@vanilla-extract/css'
import {theme} from '../theme.css.ts'
import {mapValues} from '@urban-ui/utils'

function mapBackground<T>(value: T) {
  return {
    backgroundColor: value,
  }
}

export const background = defineProperties({
  properties: {
    app: mapValues(theme.colors.app.bg, mapBackground),
    surface: mapValues(theme.colors.current.surface, mapBackground),
  },
})

export const foreground = defineProperties({
  properties: {
    fg: {
      hi: {
        color: theme.colors.fg.hi,
      },
      lo: {
        color: theme.colors.fg.lo,
      },
      primary: {
        vars: assignVars(theme.colors.fg, theme.colors.primary.fg.base),
      },
    },
    invert: {
      app: {
        vars: assignVars(theme.colors.fg, theme.colors.app.fg.invert),
      },
      tone: {
        vars: assignVars(theme.colors.fg, theme.colors.current.fg.invert),
      },
    },
  },
})

export const tone = defineProperties({
  properties: {
    tone: {
      primary: {
        vars: assignVars(theme.colors.current, theme.colors.primary),
        // vars: {
        //   ...assignVars(theme.colors.current, theme.colors.primary),
        //   ...assignVars(theme.colors.fg, theme.colors.primary.fg.base),
        // },
      },
    },
  },
})
