// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'

export const Spacer = styled('div', {
  defaultVariants: {
    size: 'md',
    orientation: 'v',
  },

  variants: {
    size: {
      sm: {},
      md: {},
      lg: {},
    },
    orientation: {
      h: {
        display: 'inline-block',
      },
      v: {},
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      orientation: 'v',
      css: {
        padding: '$2 0',
      },
    },
    {
      size: 'md',
      orientation: 'v',
      css: {
        padding: '$3 0',
      },
    },
    {
      size: 'lg',
      orientation: 'v',
      css: {
        padding: '$5 0',
      },
    },
    {
      size: 'sm',
      orientation: 'h',
      css: {
        padding: '0 $2',
      },
    },
    {
      size: 'md',
      orientation: 'h',
      css: {
        padding: '0 $3',
      },
    },
    {
      size: 'lg',
      orientation: 'h',
      css: {
        padding: '0 $5',
      },
    },
  ],
})
