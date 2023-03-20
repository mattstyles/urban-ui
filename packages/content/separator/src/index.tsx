// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import {styled} from '@urban-ui/theme'

const compoundVariants = [
  // Vertical
  {
    orientation: 'v',
    size: 'xs',
    css: {
      width: '$xs',
    },
  },
  {
    orientation: 'v',
    size: 'sm',
    css: {
      width: '$sm',
    },
  },
  {
    orientation: 'v',
    size: 'md',
    css: {
      width: '$md',
    },
  },
  {
    orientation: 'v',
    size: 'lg',
    css: {
      width: '$lg',
    },
  },
  {
    orientation: 'v',
    size: 'xl',
    css: {
      width: '$xl',
    },
  },
  // Horizontal
  {
    orientation: 'h',
    size: 'xs',
    css: {
      height: '$xs',
    },
  },
  {
    orientation: 'h',
    size: 'sm',
    css: {
      height: '$sm',
    },
  },
  {
    orientation: 'h',
    size: 'md',
    css: {
      height: '$md',
    },
  },
  {
    orientation: 'h',
    size: 'lg',
    css: {
      height: '$lg',
    },
  },
  {
    orientation: 'h',
    size: 'xl',
    css: {
      height: '$xl',
    },
  },
  // type
  // Strong or Normal (determines the border color vs tone, either 6 or 7, maybe stronger, like 10)
  {
    type: 'normal',
    tone: 'highlight',
    css: {
      borderColor: '$highlight6',
    },
  },
  {
    type: 'normal',
    tone: 'primary',
    css: {
      borderColor: '$primary6',
    },
  },
  {
    type: 'normal',
    tone: 'critical',
    css: {
      borderColor: '$critical6',
    },
  },
  {
    type: 'normal',
    tone: 'neutral',
    css: {
      borderColor: '$neutral6',
    },
  },
  {
    type: 'strong',
    tone: 'highlight',
    css: {
      borderColor: '$highlight8',
    },
  },
  {
    type: 'strong',
    tone: 'primary',
    css: {
      borderColor: '$primary8',
    },
  },
  {
    type: 'strong',
    tone: 'critical',
    css: {
      borderColor: '$critical8',
    },
  },
  {
    type: 'strong',
    tone: 'neutral',
    css: {
      borderColor: '$neutral8',
    },
  },

  // Transparent
  {
    element: 'one',
    type: 'transparent',
    css: {
      borderColor: '$whiteA9',
    },
  },
  {
    element: 'two',
    type: 'transparent',
    orientation: 'h',
    css: {
      borderTopColor: '$blackA6',
      borderTopWidth: '$1',
      borderTopStyle: 'solid',
    },
  },
  {
    element: 'two',
    type: 'transparent',
    orientation: 'v',
    css: {
      borderLeftColor: '$blackA6',
      borderLeftWidth: '$1',
      borderLeftStyle: 'solid',
    },
  },
]

const StyledSeparator = styled(SeparatorPrimitive.Root, {
  display: 'flex',

  defaultVariants: {
    orientation: 'h',
    size: 'md',
    tone: 'neutral',
    element: 'one',
    type: 'normal',
  },

  variants: {
    element: {
      one: {},
      two: {},
    },
    tone: {
      highlight: {
        borderColor: '$highlight6',
      },
      primary: {
        borderColor: '$primary6',
      },
      critical: {
        borderColor: '$critical6',
      },
      neutral: {
        borderColor: '$neutral6',
      },
    },
    type: {
      normal: {},
      strong: {},
      transparent: {},
    },
    orientation: {
      h: {
        borderBottomWidth: '$1',
        borderBottomStyle: 'solid',

        flex: 'none',
      },
      v: {
        borderRightWidth: '$1',
        borderRightStyle: 'solid',
        flex: 1,
      },
    },
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },
  },

  compoundVariants,
})

const Spacer = styled('div', {
  border: '$none',
  defaultVariants: {
    orientation: 'h',
    size: 'md',
    element: 'two',
    type: 'normal',
  },
  compoundVariants,
})

const Orient = styled('div', {
  display: 'flex',
  defaultVariants: {
    orientation: 'h',
  },
  variants: {
    orientation: {
      h: {
        flexDirection: 'column',
      },
      v: {
        flexDirection: 'row',
      },
    },
  },
})

export function Separator({
  'data-testid': testid,
  ...props
}: React.ComponentProps<typeof StyledSeparator> & {'data-testid'?: string}) {
  return (
    <Orient orientation={props.orientation} data-testid={testid}>
      <StyledSeparator {...props} />
      <Spacer {...props} />
    </Orient>
  )
}
