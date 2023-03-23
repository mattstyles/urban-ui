// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'

export const Spacer = styled('div', {
  defaultVariants: {
    gap: 'md',
    orientation: 'v',
  },

  variants: {
    gap: {
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
      gap: 'xs',
      orientation: 'v',
      css: {
        padding: '$xs 0',
      },
    },
    {
      gap: 'sm',
      orientation: 'v',
      css: {
        padding: '$sm 0',
      },
    },
    {
      gap: 'md',
      orientation: 'v',
      css: {
        padding: '$md 0',
      },
    },
    {
      gap: 'lg',
      orientation: 'v',
      css: {
        padding: '$lg 0',
      },
    },
    {
      gap: 'xl',
      orientation: 'v',
      css: {
        padding: '$xl 0',
      },
    },
    {
      gap: 'xs',
      orientation: 'h',
      css: {
        padding: '0 $xs',
      },
    },
    {
      gap: 'sm',
      orientation: 'h',
      css: {
        padding: '0 $sm',
      },
    },
    {
      gap: 'md',
      orientation: 'h',
      css: {
        padding: '0 $md',
      },
    },
    {
      gap: 'lg',
      orientation: 'h',
      css: {
        padding: '0 $lg',
      },
    },
    {
      gap: 'xl',
      orientation: 'h',
      css: {
        padding: '0 $xl',
      },
    },
  ],
})
