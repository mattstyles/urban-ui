// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'
import {Flex} from '@urban-ui/flex'

export const Container = styled(Flex, {
  defaultVariants: {
    orientation: 'v',
  },

  variants: {
    padding: {
      xs: {
        p: '$xs',
      },
      sm: {
        p: '$sm',
      },
      md: {
        p: '$md',
      },
      lg: {
        p: '$lg',
      },
      xl: {
        p: '$xl',
      },
    },

    fill: {
      all: {
        width: '100%',
        height: '100%',
      },
      v: {
        height: '100%',
      },
      h: {
        width: '100%',
      },
    },

    // Duplication here is currently necessary for defaultVariants to pass TS spec :(
    orientation: {
      h: {
        flexDirection: 'row',
      },
      v: {
        flexDirection: 'column',
      },
    },
  },
})

Container.displayName = 'Container'
