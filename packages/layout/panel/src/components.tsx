import type {VariantProps} from 'cva'
import type {FlexProps} from '@urban-ui/flex'

import {forwardRef} from 'react'
import {Flex} from '@urban-ui/flex'
import {Text} from '@urban-ui/text'
import {cva} from 'cva'
import cx from 'clsx'
import {header, padding} from './panel.css.ts'

const paddingVariants = cva('', {
  variants: {
    px: {
      true: padding.px,
    },
  },
})

const variants = cva(header)
export interface HeaderProps
  extends VariantProps<typeof paddingVariants>,
    FlexProps,
    React.PropsWithChildren {}
export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({px = true, children, ...props}, ref) => {
    return (
      <Flex
        ref={ref}
        asChild
        {...props}
        className={cx(header, paddingVariants({px}))}>
        <header>{children}</header>
      </Flex>
    )
  },
)

const contentVariants = cva([padding.px, padding.py])
export interface ContentProps
  extends VariantProps<typeof paddingVariants>,
    FlexProps,
    React.PropsWithChildren {}
export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({px = true, children, ...props}, ref) => {
    return (
      <Flex
        ref={ref}
        orientation='v'
        gap='md'
        {...props}
        className={cx(paddingVariants({px}))}>
        {children}
      </Flex>
    )
  },
)
