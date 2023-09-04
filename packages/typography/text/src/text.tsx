import type {VariantProps} from 'cva'

import {useMemo} from 'react'
import cx from 'clsx'
import {cva} from 'cva'
import {Slot} from '@radix-ui/react-slot'
import {
  sizes,
  weights,
  kerning,
  strong,
  em,
  font,
  colors,
} from './variants.css.ts'
import {base, fallbackSize} from './text.css.ts'
import {atoms} from '@urban-ui/theme/atoms'

const variants = cva([base], {
  variants: {
    size: {
      inherit: fallbackSize,
      ...sizes,
    },
    font: font,
    weight: weights,
    kerning: kerning,
    strong: {
      true: strong,
    },
    em: {
      true: em,
    },
    fontStyle: {
      italic: em,
    },
    contrast: {
      hi: colors.fg.hi,
      lo: colors.fg.lo,
    },
    invert: {
      true: {},
    },
    tone: {
      true: {},
      inherit: {},
      // primary: colors.tone.primary,
      primary: atoms({tone: 'primary'}),
      critical: {},
    },
  },
  defaultVariants: {
    size: 'inherit',
  },
})

// export interface TextProps
//   extends Omit<VariantProps<typeof variants>, 'req'>,
//     Required<Pick<VariantProps<typeof variants>, 'req'>>,
//     React.PropsWithChildren,
//     React.HTMLAttributes<'span'> {}

type TextVariants = VariantProps<typeof variants>
export interface TextProps
  extends TextVariants,
    React.PropsWithChildren,
    React.HTMLAttributes<'span'> {
  asChild?: boolean
}

export function Text({
  asChild,
  children,
  size,
  font,
  weight,
  kerning,
  strong,
  em,
  fontStyle,
  contrast = 'hi',
  tone,
  invert = false,
  className,
}: TextProps) {
  const color = useMemo(
    () => getContrast({contrast, tone, invert}),
    [tone, contrast, invert],
  )
  const Comp = getChild({asChild, strong, em})

  return (
    <Comp
      className={cx(
        color,
        variants({
          size,
          font,
          weight,
          kerning,
          strong,
          em,
          fontStyle,
          contrast,
          tone,
          className,
        }),
      )}>
      {children}
    </Comp>
  )
}

function getChild({
  asChild,
  strong,
  em,
}: Pick<TextProps, 'asChild' | 'strong' | 'em'>) {
  if (asChild != null) {
    return Slot
  }

  if (em != null && strong == null) {
    return 'em'
  }

  if (strong != null && em == null) {
    return 'strong'
  }

  return 'span'
}

function getContrast({
  contrast,
  tone,
  invert,
}: Pick<TextVariants, 'contrast' | 'tone' | 'invert'>) {
  // if (tone == null) {
  // }
  if (tone === 'inherit') {
    return colors.inherit
  }
  // // Base colours
  if (tone == null) {
    // return findColorVariant(colorVariants, {contrast, invert})
    return invert ? colors.invert : null
  }

  return invert ? colors.toneInvert : null
  // return findColorVariant(toneVariants, {contrast, invert})
}

// function findColorVariant(
//   list: Array<ColorVariant>,
//   conditions: {
//     contrast: TextVariants['contrast']
//     invert: TextVariants['invert']
//   },
// ) {
//   const variant = list.find((variant) => {
//     return (
//       variant.conditions.contrast === conditions.contrast &&
//       variant.conditions.invert === conditions.invert
//     )
//   })
//   return variant?.className ?? null
// }

// type ColorVariant = {
//   conditions: {
//     contrast: TextVariants['contrast']
//     invert: TextVariants['invert']
//   }
//   className: string
// }
// const colorVariants: Array<ColorVariant> = [
//   {
//     conditions: {
//       contrast: 'hi',
//       invert: false,
//     },
//     className: colors.fg.hi,
//   },
//   {
//     conditions: {
//       contrast: 'lo',
//       invert: false,
//     },
//     className: colors.fg.lo,
//   },
//   {
//     conditions: {
//       contrast: 'hi',
//       invert: true,
//     },
//     className: colors.fg.invert.hi,
//   },
//   {
//     conditions: {
//       contrast: 'lo',
//       invert: true,
//     },
//     className: colors.fg.invert.lo,
//   },
// ]

// const toneVariants: Array<ColorVariant> = [
//   {
//     conditions: {
//       contrast: 'hi',
//       invert: false,
//     },
//     className: colors.tone.hi,
//   },
//   {
//     conditions: {
//       contrast: 'lo',
//       invert: false,
//     },
//     className: colors.tone.lo,
//   },
//   {
//     conditions: {
//       contrast: 'hi',
//       invert: true,
//     },
//     className: colors.tone.invert.hi,
//   },
//   {
//     conditions: {
//       contrast: 'lo',
//       invert: true,
//     },
//     className: colors.tone.invert.lo,
//   },
// ]
