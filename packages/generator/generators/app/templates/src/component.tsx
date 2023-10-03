import type {VariantProps} from 'cva'

import {
  forwardRef,
} from 'react'
import {cva} from 'cva'
import cx from 'clsx'
import {atoms} from '@urban-ui/theme/atoms'
import {Flex} from '@urban-ui/flex'
import {base} from './component.css.ts'
import {sizes} from './variants.css.ts'

const variants = cva([base], {
  variants: {
    size: {
      sm: sizes.sm,
      md: sizes.md,
      lg: sizes.lg
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

export interface <%= exportName %>Props extends VariantProps<typeof variants>, React.PropsWithChildren {
  className?: string
}
type ElementType = HTMLDivElement

export const <%= exportName %> = forwardRef<ElementType, <%= exportName %>Props>(({size, className, ...props}, ref) => {
  return (
    <Flex ref={ref} className={variants({size, className})}>
      {props.children}
    </Flex>
  )
})