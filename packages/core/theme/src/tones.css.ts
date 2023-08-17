import {createTheme} from '@vanilla-extract/css'
import {theme} from './theme.css.ts'

const primary = createTheme(theme.colors.current, theme.colors.primary)

export const tones = {
  primary,
}
