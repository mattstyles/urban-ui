// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'

export const Content = styled('div', {
  width: '100%',

  defaultVariants: {
    size: 'md',
  },

  variants: {
    size: {
      sm: {
        maxWidth: '$tokens$content1',
      },
      md: {
        maxWidth: '$tokens$content2',
      },
      lg: {
        maxWidth: '$tokens$content3',
      },
    },
  },
})
