// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'

export const Input = styled('input', {
  display: 'inline-flex',
  alignSelf: 'flex-start',
  color: '$text',
  background: '$white',
  borderRadius: '$1',
  borderColor: '$transparent',
  borderWidth: '2px',
  borderStyle: 'solid',
  padding: '0 $3',
  fontSize: '$md',

  '&:disabled': {
    backgroundColor: '$bg7',
    color: '$textLowContrast',
    cursor: 'not-allowed',

    '&::placholder': {
      color: '$textLowContrast',
    },

    '&:hover': {
      backgroundColor: '$bg7',
    },
  },

  defaultVariants: {
    size: 'md',
    tone: 'neutral',
  },

  variants: {
    type: {
      transparent: {
        backgroundColor: '$transparent',
      },
    },
    tone: {
      primary: {
        borderColor: '$primary7',
        color: '$textPrimary',
      },
      critical: {
        borderColor: '$critical10',
      },
      neutral: {
        borderColor: '$neutral7',
      },
    },
    width: {
      full: {
        flex: 1,
        alignSelf: 'normal',
      },
    },
    size: {
      sm: {
        minHeight: '$tokens$controlFieldSizeSm',

        '@sm': {
          minHeight: '$tokens$controlFieldTouchSizeSm',
        },
      },
      md: {
        minHeight: '$tokens$controlFieldSizeMd',

        '@sm': {
          minHeight: '$tokens$controlFieldTouchSizeMd',
        },
      },
      lg: {
        minHeight: '$tokens$controlFieldSizeLg',

        '@sm': {
          minHeight: '$tokens$controlFieldTouchSizeLg',
        },
      },
    },
  },
})
