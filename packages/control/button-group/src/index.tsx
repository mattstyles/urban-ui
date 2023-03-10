// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {Flex} from '@urban-ui/flex'

type RadiusSize = 'none' | 'sm' | 'md' | 'lg'
type ThemedRadiusSize = '$none' | '$sm' | '$md' | '$lg'
type Props = {
  children: Array<React.ReactNode>
  radius?: RadiusSize
  color?: string
}
export function ButtonGroup({children, radius = 'md', color = '$bg7'}: Props) {
  const r = getRadius(radius)
  return (
    <Flex
      inline
      css={{
        borderRadius: r,
        border: `1px solid ${color}`,
        overflow: 'hidden',

        '*': {
          borderWidth: '0',
          borderRadius: '$0',
        },

        '*:not(:last-child)': {
          borderRight: `1px solid ${color}`,
        },
      }}>
      {children}
    </Flex>
  )
}

function getRadius(radius: RadiusSize): ThemedRadiusSize {
  switch (radius) {
    case 'none':
      return '$none'
    case 'sm':
      return '$sm'
    case 'md':
      return '$md'
    case 'lg':
      return '$lg'
  }
}
