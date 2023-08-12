import type {VariantProps} from 'cva'

import {cva} from 'cva'
import {Slot} from '@radix-ui/react-slot'
import {sizes, weights, kerning, strong, em, font} from './variants.css.ts'
import {base, fallbackSize} from './text.css.ts'

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
export interface TextProps
  extends VariantProps<typeof variants>,
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
  className,
}: TextProps) {
  const Comp = getChild({asChild, strong, em})
  return (
    <Comp
      className={variants({
        size,
        font,
        weight,
        kerning,
        strong,
        em,
        fontStyle,
        className,
      })}>
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
