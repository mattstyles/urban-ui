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
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
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
      size: 'xs',
      orientation: 'v',
      css: {
        padding: '$xs 0',
      },
    },
    {
      size: 'sm',
      orientation: 'v',
      css: {
        padding: '$sm 0',
      },
    },
    {
      size: 'md',
      orientation: 'v',
      css: {
        padding: '$md 0',
      },
    },
    {
      size: 'lg',
      orientation: 'v',
      css: {
        padding: '$lg 0',
      },
    },
    {
      size: 'xl',
      orientation: 'v',
      css: {
        padding: '$xl 0',
      },
    },
    {
      size: 'xs',
      orientation: 'h',
      css: {
        padding: '0 $xs',
      },
    },
    {
      size: 'sm',
      orientation: 'h',
      css: {
        padding: '0 $sm',
      },
    },
    {
      size: 'md',
      orientation: 'h',
      css: {
        padding: '0 $md',
      },
    },
    {
      size: 'lg',
      orientation: 'h',
      css: {
        padding: '0 $lg',
      },
    },
    {
      size: 'xl',
      orientation: 'h',
      css: {
        padding: '0 $xl',
      },
    },
  ],
})
