// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'

export const Absolute = styled('div', {
  position: 'absolute',

  variants: {
    top: {
      true: {
        top: 0,
      },
    },
    right: {
      true: {
        right: 0,
      },
    },
    bottom: {
      true: {
        bottom: 0,
      },
    },
    left: {
      true: {
        left: 0,
      },
    },
    fit: {
      true: {
        inset: 0,
      },
    },
    fill: {
      true: {
        width: '100%',
        height: '100%',
      },
    },
  },
})
