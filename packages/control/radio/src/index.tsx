// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'
import {Stack} from '@urban-ui/stack'
import * as RadioPrimitive from '@radix-ui/react-radio-group'

// @TODO see if we can import and use stack here, i.e. styled(Root, Stack)
export const Root = styled(RadioPrimitive.Root, Stack, {
  defaultVariants: {
    gap: 'none',
  },
})

export const RadixItem = styled(RadioPrimitive.Item, {
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  backgroundColor: 'white',
  borderRadius: '$round',
  borderWidth: '$tokens$controlFieldBorderSize',
  borderStyle: 'solid',

  transition:
    'background $tokens$transitionDuration-md $tokens$transitionEasing-easeIn, border-color $tokens$transitionDuration-md $tokens$transitionEasing-easeIn, border-width $tokens$transitionDuration-md $tokens$transitionEasing-easeIn',

  '&:disabled': {
    backgroundColor: '$bg7',
    color: '$textLowContrast',
    cursor: 'not-allowed',

    '&:hover': {
      backgroundColor: '$bg7',
      borderColor: '$bg7',
    },
  },

  defaultVariants: {
    size: 'md',
    tone: 'neutral',
  },

  variants: {
    tone: {
      highlight: {
        borderColor: '$highlight7',
        backgroundColor: '$highlight3',
        '&:hover': {
          borderColor: '$highlight8',
          backgroundColor: '$highlight4',
        },
        '&[data-state="checked"]': {
          backgroundColor: '$highlight10',
          borderColor: '$highlight10',
          color: '$textInverse',
        },
        '&:focus': {
          outlineColor: 'red',
        },
      },
      primary: {
        borderColor: '$primary7',
        backgroundColor: '$primary3',
        '&:hover': {
          borderColor: '$primary8',
          backgroundColor: '$primary4',
        },
        '&[data-state="checked"]': {
          backgroundColor: '$primary10',
          borderColor: '$primary10',
          color: '$textInverse',
        },
      },
      critical: {
        borderColor: '$critical7',
        backgroundColor: '$critical3',
        '&:hover': {
          borderColor: '$critical8',
          backgroundColor: '$critical4',
        },
        '&[data-state="checked"]': {
          backgroundColor: '$critical10',
          borderColor: '$critical10',
          color: '$textInverse',
        },
      },
      neutral: {
        borderColor: '$neutral7',
        backgroundColor: '$neutral3',
        '&:hover': {
          borderColor: '$neutral8',
          backgroundColor: '$neutral4',
        },
        '&[data-state="checked"]': {
          backgroundColor: '$neutral10',
          borderColor: '$neutral10',
          color: '$textInverse',
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
  },
})

export function Item(props: React.ComponentProps<typeof RadixItem>) {
  return (
    <TouchZone size={props.size} htmlFor={props.id}>
      <RadixItem {...props} />
    </TouchZone>
  )
}

export const Indicator = styled(RadioPrimitive.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  position: 'relative',
})

export const Dot = styled('div', {
  borderRadius: '$round',
  backgroundColor: '$white',

  defaultVariants: {
    size: 'md',
  },

  variants: {
    size: {
      sm: {
        minSize: 'calc($tokens$controlSelectionSizeSm * 0.5)',

        '@sm': {
          minSize: 'calc($tokens$controlSelectionTouchSizeSm * 0.5)',
        },
      },
      md: {
        minSize: 'calc($tokens$controlSelectionSizeMd * 0.4)',

        '@sm': {
          minSize: 'calc($tokens$controlSelectionTouchSizeMd * 0.4)',
        },
      },
      lg: {
        minSize: 'calc($tokens$controlSelectionSizeLg * 0.4)',

        '@sm': {
          minSize: 'calc($tokens$controlSelectionTouchSizeLg * 0.4)',
        },
      },
    },
  },
})

export const TouchZone = styled('label', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',

  defaultVariants: {
    size: 'md',
  },

  variants: {
    size: {
      sm: {
        minSize: '$tokens$controlFieldSizeSm',
        mx: 'calc(($tokens$controlFieldSizeSm - $tokens$controlSelectionSizeSm) * -0.5)',

        '@sm': {
          minSize: '$tokens$controlFieldTouchSizeSm',
          mx: 'calc(($tokens$controlFieldTouchSizeSm - $tokens$controlSelectionTouchSizeSm) * -0.5)',
        },
      },
      md: {
        minSize: '$tokens$controlFieldSizeMd',
        mx: 'calc(($tokens$controlFieldSizeMd - $tokens$controlSelectionSizeMd) * -0.5)',

        '@sm': {
          minSize: '$tokens$controlFieldTouchSizeMd',
          mx: 'calc(($tokens$controlFieldTouchSizeSm - $tokens$controlSelectionTouchSizeSm) * -0.5)',
        },
      },
      lg: {
        minSize: '$tokens$controlFieldSizeLg',
        mx: 'calc(($tokens$controlFieldSizeLg - $tokens$controlSelectionSizeLg) * -0.5)',

        '@sm': {
          minSize: '$tokens$controlFieldTouchSizeLg',
          mx: 'calc(($tokens$controlFieldTouchSizeLg - $tokens$controlSelectionTouchSizeLg) * -0.5)',
        },
      },
    },
  },
})

export const Content = styled('div', {
  display: 'flex',

  defaultVariants: {
    size: 'md',
  },

  variants: {
    size: {
      sm: {
        mt: 'calc(($tokens$controlFieldSizeSm - $tokens$controlSelectionSizeSm) * 0.4)',

        '@sm': {
          mt: 'calc(($tokens$controlFieldTouchSizeSm - $tokens$controlSelectionTouchSizeSm) * 0.4)',
        },
      },
      md: {
        mt: 'calc(($tokens$controlFieldSizeMd - $tokens$controlSelectionSizeMd) * 0.65)',

        '@sm': {
          mt: 'calc(($tokens$controlFieldTouchSizeMd - $tokens$controlSelectionTouchSizeMd) * 0.65)',
        },
      },
      lg: {
        mt: 'calc(($tokens$controlFieldSizeLg - $tokens$controlSelectionSizeLg) * 0.85)',

        '@sm': {
          mt: 'calc(($tokens$controlFieldTouchSizeLg - $tokens$controlSelectionTouchSizeLg) * 0.85)',
        },
      },
    },
  },
})
