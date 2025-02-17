import stylex from '@stylexjs/stylex'

const DARK = '@media (prefers-color-scheme: dark)'

export const vars = stylex.defineVars({
  bg: {
    default: 'red',
    [DARK]: 'aqua',
  },
})

export const theme = stylex.createTheme(vars, {
  bg: {
    default: 'hotpink',
    [DARK]: 'aqua',
  },
})
