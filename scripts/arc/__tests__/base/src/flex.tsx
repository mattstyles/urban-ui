import type {VariantProps} from 'cva'

import {forwardRef} from 'react'
import {cva} from 'cva'
import {Slot} from '@radix-ui/react-slot'
import {atoms} from '@urban-ui/theme/atoms'

type FlexVariants = VariantProps<typeof variants>
const variants = cva(
  [
    atoms({
      display: 'flex',
    }),
  ],
  {
    variants: {
      orientation: {
        h: atoms({
          flexDirection: 'row',
        }),
        v: atoms({
          flexDirection: 'column',
        }),
      },
      alignment: {
        start: atoms({
          alignment: 'flex-start',
        }),
        center: atoms({
          alignment: 'center',
        }),
        end: atoms({
          alignment: 'flex-end',
        }),
        baseline: atoms({
          alignment: 'baseline',
        }),
      },
      justify: {
        start: atoms({
          justify: 'flex-start',
        }),
        center: atoms({
          justify: 'center',
        }),
        end: atoms({
          justify: 'flex-end',
        }),
        spread: atoms({
          justify: 'space-between',
        }),
      },
      gap: {
        none: atoms({
          gap: 'none',
        }),
        xs: atoms({
          gap: 'xs',
        }),
        sm: atoms({
          gap: 'sm',
        }),
        md: atoms({
          gap: 'md',
        }),
        lg: atoms({
          gap: 'lg',
        }),
        xl: atoms({
          gap: 'xl',
        }),
      },
      inline: {
        true: atoms({
          display: 'inline-flex',
        }),
      },
      fit: {
        true: atoms({
          width: 'fit',
        }),
      },
      flex: {
        full: atoms({
          flex: 'full',
        }),
        auto: atoms({
          flex: 'auto',
        }),
        initial: atoms({
          flex: 'initial',
        }),
        none: atoms({
          flex: 'none',
        }),
      },
      wrap: {
        wrap: atoms({
          flexWrap: 'wrap',
        }),
        reverse: atoms({
          flexWrap: 'wrap-reverse',
        }),
        nowrap: atoms({
          flexWrap: 'nowrap',
        }),
      },
    },
  },
)

export interface FlexProps
  extends FlexVariants,
    React.HTMLAttributes<HTMLDivElement>,
    React.PropsWithChildren {
  asChild?: boolean
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      orientation,
      alignment,
      justify,
      gap,
      inline,
      fit,
      flex,
      wrap,
      asChild,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        className={variants({
          orientation,
          alignment,
          justify,
          gap,
          inline,
          fit,
          flex,
          wrap,
          className,
        })}
        {...props}>
        {children}
      </Comp>
    )
  },
)
Flex.displayName = 'urban/flex'
