// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {Flex} from '@urban-ui/flex'
import {styled} from '@urban-ui/theme'

export const Center = styled(Flex, {
  defaultVariants: {
    alignment: 'center',
    justify: 'center',
  },
})
