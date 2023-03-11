// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {VariantProps} from '@stitches/react'
import * as React from 'react'
import {styled} from '@urban-ui/theme'

// @TODO how to apply a role or type attribute to a styled button without wrapping?
export const Button = React.forwardRef<
  HTMLButtonElement,
  VariantProps<typeof StyledButton>
>((props, ref) => {
  return <StyledButton role='button' ref={ref} {...props} />
})

const StyledButton = styled('button', {
  textDecoration: 'none',
  display: 'inline-flex',
  alignSelf: 'flex-start',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$1',
  borderColor: '$transparent',
  borderWidth: '2px',
  borderStyle: 'solid',
  padding: '0 $md',
  letterSpacing: '-0.2px',
  fontWeight: '$semibold',
  fontSize: '$md',

  transition:
    'background $tokens$transitionDuration-md $tokens$transitionEasing-easeIn, border-color $tokens$transitionDuration-md $tokens$transitionEasing-easeIn',

  '&:disabled': {
    backgroundColor: '$bg7',
    color: '$textLowContrast',
    cursor: 'not-allowed',

    '&:hover': {
      backgroundColor: '$bg7',
    },
  },

  defaultVariants: {
    type: 'solid',
    tone: 'primary',
    size: 'md',
  },

  compoundVariants: [
    ...makeVariants('primary', 'primary'),
    ...makeVariants('critical', 'critical'),
    ...makeVariants('neutral', 'bg'),
  ],

  variants: {
    type: {
      solid: {},
      transparent: {},
      outline: {},
      ghost: {},
      emphasis: {},
      clear: {
        backgroundColor: '$transparent',
        p: '$0',
        m: '$0',
        height: 'auto',
        alignItems: 'unset',
        justifyContent: 'unset',
      },
    },
    tone: {
      primary: {},
      critical: {},
      neutral: {},
    },

    round: {
      true: {
        borderRadius: '$round',
      },
    },
    square: {
      true: {
        aspectRatio: 1,
        padding: '$0',
      },
    },
    fill: {
      true: {
        width: '100%',
        height: '100%',
      },
    },

    width: {
      none: {},
      sm: {
        minWidth: '$tokens$buttonWidthSm',
      },
      md: {
        minWidth: '$tokens$buttonWidthMd',
      },
      lg: {
        minWidth: '$tokens$buttonWidthLg',
      },
    },

    size: {
      sm: {
        minHeight: '$tokens$buttonSizeSm',

        '@sm': {
          minHeight: '$tokens$buttonTouchSizeSm',
        },
      },
      md: {
        minHeight: '$tokens$buttonSizeMd',

        '@sm': {
          minHeight: '$tokens$buttonTouchSizeMd',
        },
      },
      lg: {
        minHeight: '$tokens$buttonSizeLg',

        '@sm': {
          minHeight: '$tokens$buttonTouchSizeLg',
        },
      },
    },
  },

  // @TODO important might cause problems for composition, we could duplicate these in each compound variant (this would allow tonal disabled states, although we are going for a single disabled state for consistency and don't really want to support tonal disabled states)
})

function makeSolidVariant(colour: string) {
  return {
    backgroundColor: `$${colour}9`,
    color: '$textInverse',

    '&:hover': {
      backgroundColor: `$${colour}10`,
    },
    '&:active': {
      backgroundColor: `$${colour}11`,
    },
  }
}

function makeTransparentVariant(colour: string) {
  return {
    backgroundColor: '$transparent',
    color: `$${colour}12`,

    '&:hover': {
      backgroundColor: `$${colour}4`,
    },
    '&:active': {
      backgroundColor: `$${colour}5`,
    },
  }
}

function makeOutlineVariant(colour: string) {
  return {
    backgroundColor: '$transparent',
    color: `$${colour}12`,
    borderColor: `$${colour}7`,

    '&:hover': {
      backgroundColor: `$${colour}4`,
      borderColor: `$${colour}8`,
    },
    '&:active': {
      backgroundColor: `$${colour}5`,
    },
  }
}

function makeGhostVariant(colour: string) {
  return {
    backgroundColor: `$${colour}3`,
    color: `$${colour}12`,

    '&:hover': {
      backgroundColor: `$${colour}4`,
    },
    '&:active': {
      backgroundColor: `$${colour}5`,
    },
  }
}

function makeEmphasisVariant(colour: string) {
  return {
    backgroundColor: `$${colour}4`,
    color: `$${colour}12`,

    '&:hover': {
      backgroundColor: `$${colour}5`,
    },
    '&:active': {
      backgroundColor: `$${colour}6`,
    },
  }
}

function makeVariants(tone: string, colour: string) {
  return [
    {
      tone: tone,
      type: 'solid',
      css: makeSolidVariant(colour),
    },
    {
      tone: tone,
      type: 'transparent',
      css: makeTransparentVariant(colour),
    },
    {
      tone: tone,
      type: 'outline',
      css: makeOutlineVariant(colour),
    },
    {
      tone: tone,
      type: 'ghost',
      css: makeGhostVariant(colour),
    },
    {
      tone: tone,
      type: 'emphasis',
      css: makeEmphasisVariant(colour),
    },
  ]
}
