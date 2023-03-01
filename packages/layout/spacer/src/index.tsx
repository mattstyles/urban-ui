import {styled} from '@urban-ui/theme'

export const Spacer = styled('div', {
  defaultVariants: {
    size: 'medium',
    orientation: 'v',
  },
  variants: {
    size: {
      small: {},
      medium: {},
      large: {},
    },
    orientation: {
      h: {},
      v: {
        display: 'inline-block',
      },
    },
  },
  compoundVariants: [
    {
      size: 'small',
      orientation: 'v',
      css: {
        padding: '$2 0',
      },
    },
    {
      size: 'medium',
      orientation: 'v',
      css: {
        padding: '$3 0',
      },
    },
    {
      size: 'large',
      orientation: 'v',
      css: {
        padding: '$5 0',
      },
    },
    {
      size: 'small',
      orientation: 'h',
      css: {
        padding: '0 $2',
      },
    },
    {
      size: 'medium',
      orientation: 'h',
      css: {
        padding: '0 $3',
      },
    },
    {
      size: 'large',
      orientation: 'h',
      css: {
        padding: '0 $5',
      },
    },
  ],
})
