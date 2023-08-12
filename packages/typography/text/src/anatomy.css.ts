import {createThemeContract, createVar} from '@vanilla-extract/css'

// Capsize
export const size = createThemeContract({
  fontSize: null,
  lineHeight: null,
  capHeightTrim: null,
  baselineTrim: null,
})

export const weight = createVar()
export const style = createVar()
export const font = createVar()
export const kerning = createVar()

export const anatomy = createThemeContract({
  size,
  font,
  weight,
  style,
  kerning,
})
