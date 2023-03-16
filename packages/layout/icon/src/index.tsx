// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'

export const Icon = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  defaultVariants: {
    size: 'md',
  },

  variants: {
    size: {
      sm: {
        size: '$tokens$iconSizeSm',
      },
      md: {
        size: '$tokens$iconSizeMd',
      },
      lg: {
        size: '$tokens$iconSizeLg',
      },
    },
  },
})
