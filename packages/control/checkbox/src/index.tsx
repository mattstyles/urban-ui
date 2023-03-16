// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

export const RadixRoot = styled(CheckboxPrimitive.Root, {
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$tokens$controlFieldRadius',
  borderColor: '$neutral7',
  borderWidth: '$tokens$controlFieldBorderSize',
  borderStyle: 'solid',
  padding: 0,

  transition:
    'background $tokens$transitionDuration-md $tokens$transitionEasing-easeIn, border-color $tokens$transitionDuration-md $tokens$transitionEasing-easeIn',

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
    round: {
      true: {
        borderRadius: '$round',
      },
    },
    fill: {
      true: {
        width: '100%',
        height: '100%',
      },
    },
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

export const Indicator = styled(CheckboxPrimitive.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  defaultVariants: {
    size: 'md',
  },

  variants: {
    size: {
      sm: {
        size: '$4',
      },
      md: {
        size: '$5',
      },
      lg: {
        size: '$6',
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

export function Root(props: React.ComponentProps<typeof RadixRoot>) {
  return (
    <TouchZone size={props.size} htmlFor={props.id}>
      <RadixRoot {...props} />
    </TouchZone>
  )
}
