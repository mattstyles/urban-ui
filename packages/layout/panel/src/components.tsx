import type {VariantProps} from 'cva'

import {forwardRef} from 'react'
import {Flex} from '@urban-ui/flex'
import {Text} from '@urban-ui/text'
import {cva} from 'cva'
import cx from 'clsx'
import {header, appliedPadding} from './panel.css.ts'

const variants = cva(header)
export interface HeaderProps extends React.PropsWithChildren {}
export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({children}, ref) => {
    return (
      <Flex ref={ref} className={variants()}>
        {children}
      </Flex>
    )
  },
)

const contentVariants = cva([appliedPadding])
export interface ContentProps extends React.PropsWithChildren {}
export const Content = forwardRef<HTMLDivElement, HeaderProps>(
  ({children}, ref) => {
    return (
      <Flex ref={ref} className={contentVariants()}>
        {children}
      </Flex>
    )
  },
)
