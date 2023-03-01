import {blackA, whiteA} from '@radix-ui/colors'

export const tokens = {
  transparent: 'transparent',
  current: 'current',
  white: 'hsl(0, 0%, 100%)',
  black: 'hsl(0, 0%, 0%)',
}

export const colours = {
  ...blackA,
  ...whiteA,

  // Tokens
  ...tokens,
}
