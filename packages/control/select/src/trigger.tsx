import {styled} from '@urban-ui/theme'
import * as SelectPrimitive from '@radix-ui/react-select'

export const Trigger = styled(SelectPrimitive.SelectTrigger, {
  display: 'inline-flex',
  alignSelf: 'flex-start',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '$white',
  borderRadius: '$tokens$controlFieldRadius',
  borderColor: '$neutral7',
  borderWidth: '$tokens$controlFieldBorderSize',
  borderStyle: 'solid',
  backgroundColor: 'white',
  color: '$text',

  padding: '0 $tokens$controlFieldPaddingX',
  fontSize: '$md',
  gap: '$sm',

  '&:hover': {backgroundColor: '$neutral3'},
  '&[data-placeholder]': {
    color: '$textLowContrast',
  },

  '&:disabled': {
    backgroundColor: '$bg7',
    borderColor: '$transparent',
    color: '$textLowContrast',
    cursor: 'not-allowed',

    '&[data-placeholder]': {
      color: '$textLowContrast',
    },

    '&:hover': {
      backgroundColor: '$bg7',
    },
  },

  defaultVariants: {
    tone: 'neutral',
    size: 'md',
    width: 'normal',
  },

  variants: {
    transparent: {
      true: {
        backgroundColor: '$transparent',
      },
    },
    tone: {
      primary: {
        borderColor: '$primary7',
        color: '$textPrimary',

        '&[data-placeholder]': {
          color: '$textPrimaryLowContrast',
        },
      },
      critical: {
        borderColor: '$critical7',
      },
      neutral: {
        borderColor: '$neutral7',
      },
      highlight: {
        borderColor: '$highlight7',
        color: '$textHighlight',

        '&[data-placeholder]': {
          color: '$textHighlightLowContrast',
        },
      },
    },
    width: {
      normal: {
        minWidth: 180,
      },
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

export const Icon = styled(SelectPrimitive.SelectIcon, {
  color: '$current',
})

export const Value = SelectPrimitive.Value
