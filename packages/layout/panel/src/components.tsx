import type {VariantProps} from 'cva'
import type {FlexProps} from '@urban-ui/flex'

import {forwardRef} from 'react'
import {Flex} from '@urban-ui/flex'
import {Text} from '@urban-ui/text'
import {cva} from 'cva'
import cx from 'clsx'
import {header, padding} from './panel.css.ts'
import {atoms} from '@urban-ui/theme/atoms'

const paddingVariants = cva('', {
  variants: {
    px: {
      true: padding.px,
    },
    py: {
      true: padding.py,
      sm: atoms({py: 'sm'}),
      md: atoms({py: 'md'}),
      lg: atoms({py: 'lg'}),
    },
  },
})

const variants = cva(header)
export interface HeaderProps
  extends VariantProps<typeof paddingVariants>,
    FlexProps,
    React.PropsWithChildren {}
export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({px = true, py, children, ...props}, ref) => {
    return (
      <Flex
        ref={ref}
        alignment='center'
        justify='spread'
        asChild
        {...props}
        className={cx(header, paddingVariants({px, py}))}>
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
  ({px = true, py, children, ...props}, ref) => {
    return (
      <Flex
        ref={ref}
        orientation='v'
        gap='md'
        {...props}
        className={cx(paddingVariants({px, py}))}>
        {children}
      </Flex>
    )
  },
)

export interface FooterProps
  extends VariantProps<typeof paddingVariants>,
    FlexProps,
    React.PropsWithChildren {}
export const Footer = forwardRef<HTMLDivElement, FooterProps>(
  ({px = true, py, children, ...props}, ref) => {
    return (
      <Flex
        ref={ref}
        alignment='end'
        asChild
        {...props}
        className={cx(header, paddingVariants({px, py}))}>
        <footer>{children}</footer>
      </Flex>
    )
  },
)
