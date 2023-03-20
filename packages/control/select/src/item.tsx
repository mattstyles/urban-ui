import {styled} from '@urban-ui/theme'
import * as SelectPrimitive from '@radix-ui/react-select'

export const Group = SelectPrimitive.Group
export const ItemText = SelectPrimitive.ItemText

export const Item = styled(SelectPrimitive.Item, {
  fontSize: '$md',
  lineHeight: '$tokens$controlFieldSizeSm',
  color: '$text',
  borderRadius: '$sm',
  display: 'flex',
  alignItems: 'center',
  px: '$6',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: '$bg8',
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: '$neutral4',
  },

  // Can be used to differentiate checked state instead of, or alongside, an item indicator. Add a recipes section with some common different variants that can be created from the primitives.
  '&[data-state="checked"]': {
    backgroundColor: '$neutral5',
  },

  defaultVariants: {
    tone: 'neutral',
    indicatorBackground: false,
  },

  variants: {
    indicatorBackground: {
      false: {
        '&[data-state="checked"]': {
          backgroundColor: '$transparent !important',
        },
      },
    },
    tone: {
      primary: {
        color: '$textPrimary',

        '&[data-highlighted]': {
          backgroundColor: '$primary4',
        },

        '&[data-state="checked"]': {
          backgroundColor: '$primary5',
        },
      },
      highlight: {
        color: '$textHighlight',

        '&[data-highlighted]': {
          backgroundColor: '$highlight4',
        },

        '&[data-state="checked"]': {
          backgroundColor: '$highlight5',
        },
      },
      critical: {
        '&[data-highlighted]': {
          backgroundColor: '$critical4',
        },

        '&[data-state="checked"]': {
          backgroundColor: '$critical5',
        },
      },
      neutral: {
        '&[data-highlighted]': {
          backgroundColor: '$neutral4',
        },

        '&[data-state="checked"]': {
          backgroundColor: '$neutral5',
        },
      },
    },
  },
})

export const Label = styled(SelectPrimitive.Label, {
  px: '$6',
  fontSize: '$sm',
  lineHeight: '$tokens$controlFieldSizeSm',
  color: '$textLowContrast',
})

export const Separator = styled(SelectPrimitive.Separator, {
  height: 1,
  m: '$md',

  defaultVariants: {
    tone: 'neutral',
  },

  variants: {
    tone: {
      primary: {
        backgroundColor: '$primary6',
      },
      highlight: {
        backgroundColor: '$highlight6',
      },
      critical: {
        backgroundColor: '$critical6',
      },
      neutral: {
        backgroundColor: '$neutral6',
      },
    },
  },
})

export const ItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: '$6',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  defaultVariants: {
    tone: 'neutral',
  },

  variants: {
    tone: {
      primary: {
        color: '$textPrimary',
      },
      highlight: {
        color: '$textHighlight',
      },
      critical: {
        color: '$text',
      },
      neutral: {
        color: '$text',
      },
    },
  },
})
