// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'

import {Flex} from '@urban-ui/flex'
import {styled} from '@urban-ui/theme'

export const Stack = styled(Flex, {
  defaultVariants: {
    gap: 'md',
    orientation: 'v',
  },
  variants: {
    inline: {
      true: {
        display: 'inline-flex',
      },
    },
    gap: {
      xs: {
        gap: '$xs',
      },
      sm: {
        gap: '$sm',
      },
      md: {
        gap: '$md',
      },
      lg: {
        gap: '$lg',
      },
      xl: {
        gap: '$xl',
      },
    },
    // https://github.com/stitchesjs/stitches/issues/882 we want to specify a different default variant than Flex does, and everything will work but TS won't understand the properties properly leading to TS errors. So we need to re-specify here so that TS can correctly understand this component API.
    orientation: {
      h: {
        flexDirection: 'row',
      },
      v: {
        flexDirection: 'column',
      },
    },
    collapse: {
      true: {
        '@sm': {
          flexDirection: 'column',
        },
      },
      sm: {
        '@sm': {
          flexDirection: 'column',
        },
      },
      md: {
        // This is a hangover from range queries, md *only* matches on the medium breakpoints and does not include small.
        '@sm': {
          flexDirection: 'column',
        },
        '@md': {
          flexDirection: 'column',
        },
      },
    },
  },
})
