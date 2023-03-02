// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'

import {Flex} from '@urban-ui/flex'
import {styled} from '@urban-ui/theme'

export const Stack = styled(Flex, {
  defaultVariants: {
    size: 'small',
    orientation: 'v',
  },
  variants: {
    size: {
      small: {
        gap: '$2',
      },
      medium: {
        gap: '$3',
      },
      large: {
        gap: '$5',
      },
    },
    // https://github.com/stitchesjs/stitches/issues/882 we want to specify a different default variant than Flex does, and everything will work but TS won't understand the properties properly leading to TS errors. So we need to respecify here so that TS can correctly understand this component API.
    orientation: {
      h: {
        flexDirection: 'row',
      },
      v: {
        flexDirection: 'column',
      },
    },

    // @TODO add collapse mechanism to fold from horizontal to vertical at a given breakpoint
  },
})
