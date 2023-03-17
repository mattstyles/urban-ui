// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'
import * as PrimitiveSlider from '@radix-ui/react-slider'

export const Root = styled(PrimitiveSlider.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',

  defaultVariants: {
    size: 'md',
    width: 'normal',
  },

  variants: {
    size: {
      sm: {
        height: '$tokens$controlFieldSizeSm',

        '@sm': {
          minSize: '$tokens$controlFieldTouchSizeSm',
        },
      },
      md: {
        minSize: '$tokens$controlFieldSizeMd',

        '@sm': {
          minSize: '$tokens$controlFieldTouchSizeMd',
        },
      },
      lg: {
        minSize: '$tokens$controlFieldSizeLg',

        '@sm': {
          minSize: '$tokens$controlFieldTouchSizeLg',
        },
      },
    },
    width: {
      normal: {
        width: 180,
      },
      full: {
        flex: 1,
        alignSelf: 'normal',
      },
    },
  },
})

export const Track = styled(PrimitiveSlider.Track, {
  position: 'relative',
  flexGrow: 1,
  borderRadius: '$round',

  defaultVariants: {
    tone: 'neutral',
    size: 'xs',
  },

  '&[data-disabled]': {
    backgroundColor: '$neutral7',
    cursor: 'not-allowed',

    '&:hover': {
      backgroundColor: '$neutral7',
    },
  },

  variants: {
    tone: {
      highlight: {
        backgroundColor: '$highlight4',

        '&:hover': {
          backgroundColor: '$highlight5',
        },
      },
      primary: {
        backgroundColor: '$primary4',
        '&:hover': {
          backgroundColor: '$primary5',
        },
      },
      critical: {
        backgroundColor: '$critical4',
        '&:hover': {
          backgroundColor: '$critical5',
        },
      },
      neutral: {
        backgroundColor: '$neutral4',
        '&:hover': {
          backgroundColor: '$neutral5',
        },
      },
    },
    size: {
      xs: {
        height: 8,
      },
      sm: {
        height: '$tokens$controlSelectionSizeSm',

        '@sm': {
          height: '$tokens$controlSelectionTouchSizeSm',
        },
      },
      md: {
        height: '$tokens$controlSelectionSizeMd',

        '@sm': {
          minSize: '$tokens$controlSelectionTouchSizeMd',
        },
      },
      lg: {
        height: '$tokens$controlSelectionSizeLg',

        '@sm': {
          height: '$tokens$controlSelectionTouchSizeLg',
        },
      },
    },
  },
})

export const Range = styled(PrimitiveSlider.Range, {
  position: 'absolute',
  borderRadius: '$round',
  height: '100%',

  '&[data-disabled]': {
    backgroundColor: '$neutral7',

    '&:hover': {
      backgroundColor: '$neutral7',
    },
  },

  variants: {
    tone: {
      highlight: {
        backgroundColor: '$highlight9',
      },
      primary: {
        backgroundColor: '$primary9',
      },
      critical: {
        backgroundColor: '$critical9',
      },
      neutral: {
        backgroundColor: '$neutral9',
      },
    },
  },
})

export const Thumb = styled(PrimitiveSlider.Thumb, {
  backgroundColor: '$white',
  color: '$white',
  borderStyle: 'solid',
  borderWidth: '$2',
  borderRadius: '$round',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  transition:
    'background $tokens$transitionDuration-md $tokens$transitionEasing-easeIn, border-color $tokens$transitionDuration-md $tokens$transitionEasing-easeIn, box-shadow $tokens$transitionDuration-md $tokens$transitionEasing-easeIn',

  '&[data-disabled]': {
    backgroundColor: '$neutral5',
    // This might be a mistake, probably won't work on darker backgrounds
    borderColor: '$current',
    cursor: 'not-allowed',

    '&:hover': {
      backgroundColor: '$neutral5',
      borderColor: '$current',
    },
  },

  defaultVariants: {
    tone: 'neutral',
    size: 'md',
  },

  variants: {
    type: {
      clear: {
        borderColor: '$transparent',
        boxShadow: '$md',

        '&:hover': {
          borderColor: '$transparent',
        },
      },
    },
    tone: {
      highlight: {
        borderColor: '$highlight9',

        '&:hover': {
          borderColor: '$highlight10',
        },

        '&:focus': {
          outlineColor: 'red',
        },
      },
      primary: {
        borderColor: '$primary9',

        '&:hover': {
          borderColor: '$primary10',
        },
      },
      critical: {
        borderColor: '$critical9',

        '&:hover': {
          borderColor: '$critical10',
        },
      },
      neutral: {
        borderColor: '$neutral9',

        '&:hover': {
          borderColor: '$neutral10',
        },
      },
    },
    size: {
      sm: {
        minSize: '$tokens$controlSelectionSizeSm',

        '@sm': {
          minSize: '$tokens$controlSelectionTouchSizeSm',
        },
      },
      md: {
        minSize: '$tokens$controlSelectionSizeMd',

        '@sm': {
          minSize: '$tokens$controlSelectionTouchSizeMd',
        },
      },
      lg: {
        minSize: '$tokens$controlSelectionSizeLg',

        '@sm': {
          minSize: '$tokens$controlSelectionTouchSizeLg',
        },
      },
    },

    space: {
      true: {
        boxShadow: '0 0 0px 3px currentcolor',
      },
    },
  },
})
