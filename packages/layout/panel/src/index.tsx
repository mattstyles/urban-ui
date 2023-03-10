// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {Flex} from '@urban-ui/flex'
import {styled} from '@urban-ui/theme'

export const Panel = styled(Flex, {
  position: 'fixed',
  boxShadow: '$md',

  defaultVariants: {
    gap: '$sm',
  },

  variants: {
    top: {
      true: {
        top: 0,
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
    right: {
      true: {
        right: 0,
      },
    },
    absolute: {
      true: {
        position: 'absolute',
      },
    },

    gap: {
      xs: {
        margin: '$xs',
      },
      sm: {
        margin: '$sm',
      },
      md: {
        margin: '$md',
      },
      lg: {
        margin: '$lg',
      },
      xl: {
        margin: '$xl',
      },
    },
  },
})
