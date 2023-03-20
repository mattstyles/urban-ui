import {styled} from '@urban-ui/theme'
import * as SelectPrimitive from '@radix-ui/react-select'

export const Portal = SelectPrimitive.Portal

export const Content = styled(SelectPrimitive.Content, {
  overflow: 'hidden',
  backgroundColor: '$white',
  borderRadius: '$md',
  boxShadow: '$md',
})

export const Viewport = styled(SelectPrimitive.Viewport, {
  p: '$sm',
})

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '$6',
  backgroundColor: '$transparent',
  cursor: 'default',

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
}

export const ScrollUpButton = styled(
  SelectPrimitive.ScrollUpButton,
  scrollButtonStyles
)

export const ScrollDownButton = styled(
  SelectPrimitive.ScrollDownButton,
  scrollButtonStyles
)
