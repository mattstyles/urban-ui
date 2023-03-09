// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'

export const Screen = styled('div', {
  height: '100vh',
  width: '100vw',

  variants: {
    grow: {
      true: {
        minWidth: '100vw',
        minHeight: '100vh',
        width: 'auto',
        height: 'auto',
        overflow: 'auto',
      },
    },
    min: {
      true: {
        minWidth: '100vw',
        minHeight: '100vh',
        width: 'auto',
        height: 'auto',
      },
    },
  },
})
