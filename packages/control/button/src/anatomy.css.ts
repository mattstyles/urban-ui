import {createThemeContract} from '@vanilla-extract/css'

const color = createThemeContract({
  base: null,
  hover: null,
  press: null,
})

const border = createThemeContract({
  borderColor: null,
  borderWidth: null,
})

// Component level vars
export const anatomy = createThemeContract({
  bg: color,
  fg: color,
  border,
})

// Add sizes for padding, such as height
