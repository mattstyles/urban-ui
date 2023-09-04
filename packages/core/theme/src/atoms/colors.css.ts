import {defineProperties} from '@vanilla-extract/sprinkles'
import {style, assignVars} from '@vanilla-extract/css'
import {theme} from '../theme.css.ts'
import {mapValues} from '@urban-ui/utils'

function mapBackground<T>(value: T) {
  return {
    backgroundColor: value,
  }
}

export const background = defineProperties({
  properties: {
    app: mapValues(theme.colors.app, mapBackground),
    surface: mapValues(theme.colors.current.surface, mapBackground),
  },
})

// @TODO foreground colours

export const tone = defineProperties({
  properties: {
    tone: {
      critical: {
        color: 'red',
      },
      primary: {
        vars: assignVars(theme.colors.current, theme.colors.primary),
      },
    },
  },
})
