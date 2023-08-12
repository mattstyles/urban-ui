import {createTheme} from '@vanilla-extract/css'
import {theme} from './theme.css.ts'

const primary = createTheme(theme.colors.base, theme.colors.primary)

export const tones = {
  primary,
}
