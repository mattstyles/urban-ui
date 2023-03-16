// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'
import * as SwitchPrimitive from '@radix-ui/react-switch'

export const RadixRoot = styled(SwitchPrimitive.Root, {
  padding: 0,
  border: 'none',
  backgroundColor: '$bg7',
  borderRadius: '$round',
  position: 'relative',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

  '&:disabled': {
    backgroundColor: '$bg5',
    cursor: 'not-allowed',

    '&:hover': {
      backgroundColor: '$bg5',
    },
    '*': {
      boxShadow: 'none',
    },
  },

  '&:hover': {
    backgroundColor: '$bg8',
  },

  defaultVariants: {
    tone: 'primary',
    size: 'md',
  },

  variants: {
    tone: {
      primary: {
        '&[data-state="checked"]': {
          backgroundColor: '$primary10',
        },
      },
      highlight: {
        '&[data-state="checked"]': {
          backgroundColor: '$highlight10',
        },

        '&:focus': {
          outlineColor: 'red',
        },
      },
      neutral: {
        '&[data-state="checked"]': {
          backgroundColor: '$neutral10',
        },
      },
      critical: {
        '&[data-state="checked"]': {
          backgroundColor: '$critical10',
        },
      },
    },
    size: {
      sm: {
        width: 'calc($tokens$controlSelectionSizeSm * 1.5)',
        height: '$tokens$controlSelectionSizeSm',

        '@sm': {
          width: 'calc($tokens$controlSelectionTouchSizeSm * 1.5)',
          height: '$tokens$controlSelectionTouchSizeSm',
        },
      },
      md: {
        width: 'calc($tokens$controlSelectionSizeMd * 1.5)',
        height: '$tokens$controlSelectionSizeMd',

        '@sm': {
          width: 'calc($tokens$controlSelectionTouchSizeMd * 1.5)',
          height: '$tokens$controlSelectionTouchSizeMd',
        },
      },
      lg: {
        width: 'calc($tokens$controlSelectionSizeLg * 1.5)',
        height: '$tokens$controlSelectionSizeLg',

        '@sm': {
          width: 'calc($tokens$controlSelectionTouchSizeLg * 1.5)',
          height: '$tokens$controlSelectionTouchSizeLg',
        },
      },
    },
  },
})

export const Thumb = styled(SwitchPrimitive.Thumb, {
  display: 'block',
  backgroundColor: '$white',
  borderRadius: '$round',
  boxShadow: '$md',
  transition:
    'transform $tokens$transitionDuration-md $tokens$transitionEasing-easeIn, boxShadow $tokens$transitionDuration-md $tokens$transitionEasing-easeIn',
  transform: 'translateX($tokens$controlFieldBorderSize)',
  willChange: 'transform',
  '&[data-state="checked"]': {
    transform: 'translateX(calc(50% + ($tokens$controlFieldBorderSize * 2)))',
    boxShadow: '$none',
  },

  defaultVariants: {
    size: 'md',
  },

  variants: {
    size: {
      sm: {
        size: 'calc($tokens$controlSelectionSizeSm - ($tokens$controlFieldBorderSize * 2))',
        transition:
          'transform $tokens$transitionDuration-sm $tokens$transitionEasing-easeIn, boxShadow $tokens$transitionDuration-sm $tokens$transitionEasing-easeIn',

        '@sm': {
          size: 'calc($tokens$controlSelectionTouchSizeSm - ($tokens$controlFieldBorderSize * 2))',
        },
      },
      md: {
        size: 'calc($tokens$controlSelectionSizeMd - ($tokens$controlFieldBorderSize * 2))',

        '@sm': {
          size: 'calc($tokens$controlSelectionTouchSizeMd - ($tokens$controlFieldBorderSize * 2))',
        },
      },
      lg: {
        size: 'calc($tokens$controlSelectionSizeLg - ($tokens$controlFieldBorderSize * 2))',

        '@sm': {
          size: 'calc($tokens$controlSelectionTouchSizeLg - ($tokens$controlFieldBorderSize * 2))',
        },
      },
    },
  },
})

/**
 * Switch is generally wide enough (or nearly) to be within our defined minimum touch zones, so we can left align the switch within the touchzone to avoid mucking around with working out the margins required to totally centralise the component within the touchzone and still achieve vertical rhythm.
 */
export const TouchZone = styled('label', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',

  defaultVariants: {
    size: 'md',
  },

  variants: {
    size: {
      sm: {
        minSize: '$tokens$controlFieldSizeSm',

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
  },
})

export function Root(props: React.ComponentProps<typeof RadixRoot>) {
  return (
    <TouchZone size={props.size} htmlFor={props.id}>
      <RadixRoot {...props} />
    </TouchZone>
  )
}
