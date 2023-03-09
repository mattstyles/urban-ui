// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'

export const Text = styled('span', {
  defaultVariants: {
    type: 'system',
    color: 'text',
    size: 'md',
  },

  variants: {
    type: {
      system: {
        fontFamily: '$system',
      },
      mono: {
        fontFamily: '$mono',
      },
    },
    color: {
      text: {
        color: '$text',
      },
      subtle: {
        color: '$textLowContrast',
      },
      primary: {
        color: '$textPrimary',
      },
      highlight: {
        color: '$textHighlight',
      },
      currentcolor: {
        color: 'currentcolor',
      },
    },
    size: {
      sm: {
        fontSize: '$sm',
        lineHeight: '$sm',
      },
      md: {
        fontSize: '$md',
        lineHeight: '$md',
      },
      lg: {
        fontSize: '$lg',
        lineHeight: '$lg',
      },
    },
  },
})

export const Strong = styled(Text, {
  fontWeight: '$bold',
})

export const Emphasis = styled(Text, {
  fontStyle: 'italic',
})

export const Anchor = styled('a', {
  $$textHighlight: '$textHighlight',
  textDecoration: 'none',
  transition: 'box-shadow 120ms ease-out, color 120ms ease-out',

  defaultVariants: {
    type: 'highlight',
  },

  variants: {
    type: {
      inline: {
        color: '$currentcolor',
        boxShadow: '0 1px 0 0 currentcolor',

        '&:hover': {
          color: '$$textHighlight',
          boxShadow: '0 0 0 0 currentcolor',
        },
      },
      highlight: {
        color: '$$textHighlight',
        boxShadow: '0 0 0 0 currentcolor',

        '&:hover': {
          boxShadow: '0 1px 0 0 currentcolor',
        },
      },
    },
  },
})

export const Heading = styled('span', {
  letterSpacing: '$narrow',
  fontWeight: '$bold',

  defaultVariants: {
    type: 'h1',
    color: 'text',
  },

  variants: {
    type: {
      h1: {
        fontSize: '$h1',
        lineHeight: '$h1',
      },
      h2: {
        fontSize: '$h2',
        lineHeight: '$h2',
      },
      h3: {
        fontSize: '$h3',
        lineHeight: '$h3',
      },
    },
    color: {
      text: {
        color: '$text',
      },
      subtle: {
        color: '$textLowContrast',
      },
      primary: {
        color: '$textPrimary',
      },
      highlight: {
        color: '$textHighlight',
      },
      currentcolor: {
        color: 'currentcolor',
      },
    },
  },
})

export const P = styled('p', {
  fontFamily: '$system',
  fontSize: '$md',
  lineHeight: '$md',
  marginBottom: '$3',
  color: '$text',
})

export const H1 = styled('h1', {
  fontFamily: '$system',
  fontSize: '$h1',
  lineHeight: '$h1',
  fontWeight: '$bold',
  marginTop: '$8',
  marginBottom: '$3',
  color: '$text',
})

export const H2 = styled('h2', {
  fontFamily: '$system',
  fontSize: '$h2',
  lineHeight: '$h2',
  fontWeight: '$bold',
  marginTop: '$7',
  marginBottom: '$3',
  color: '$text',
})

export const H3 = styled('h3', {
  fontFamily: '$system',
  fontSize: '$h3',
  lineHeight: '$h3',
  fontWeight: '$bold',
  marginTop: '$3',
  marginBottom: '$3',
  color: '$text',
})
