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
      // app: atoms({invert: 'app'}),
      // tone: atoms({invert: 'tone'})
    },
    tone: {
      true: {},
      inherit: {},
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
  const Comp = useMemo(
    () => getChild({asChild, strong, em}),
    [asChild, strong, em],
  )

  const invertedClass = useMemo(
    () => getInvertedClass({tone, invert}),
    [tone, invert],
  )

  return (
    <Comp
      className={cx(
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
          invert,
          className,
        }),
        invertedClass,
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

function getInvertedClass({tone, invert}: Pick<TextProps, 'tone' | 'invert'>) {
  if (invert === false) {
    return null
  }

  return tone != null ? atoms({invert: 'tone'}) : atoms({invert: 'app'})
}
