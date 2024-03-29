// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {Flex} from '@urban-ui/flex'

type RadiusSize = 'none' | 'sm' | 'md' | 'lg'
type ThemedRadiusSize = '$none' | '$sm' | '$md' | '$lg'
type Props = {
  children: Array<React.ReactNode>
  radius?: RadiusSize
  color?: string
  'data-testid'?: string
}
export function ButtonGroup({
  children,
  radius = 'md',
  color = '$bg7',
  'data-testid': testid,
}: Props) {
  const r = getRadius(radius)
  return (
    <Flex
      data-testid={testid}
      inline
      css={{
        borderRadius: `calc(${r} + 2px)`,
        borderWidth: '$tokens$controlFieldBorderSize',
        borderStyle: 'solid',
        borderColor: color,

        '*': {
          borderWidth: '0',
          borderRadius: '$0',
        },

        '*:not(:last-child)': {
          borderRightWidth: '$tokens$controlFieldBorderSize',
          borderStyle: 'solid',
          borderColor: color,
        },

        '*:first-child': {
          borderTopLeftRadius: r,
          borderBottomLeftRadius: r,
        },

        '*:last-child': {
          borderTopRightRadius: r,
          borderBottomRightRadius: r,
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
