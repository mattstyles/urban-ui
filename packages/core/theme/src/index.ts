import stylex from '@stylexjs/stylex'
import { tokens } from './tokens/colors.stylex'

export const interactive = stylex.create({
  hover: {
    ':hover': {
      background: `oklch(from ${tokens.background} calc(l * 0.95) c h)`,
      borderColor: `oklch(from ${tokens.border} calc(l * 0.95) c h)`,
    },
  },
  active: {
    ':active': {
      background: `oklch(from ${tokens.background} calc(l * 0.87) c h)`,
      borderColor: `oklch(from ${tokens.border} calc(l * 0.87) c h)`,
    },
  },
})
