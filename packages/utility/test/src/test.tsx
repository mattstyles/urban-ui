'use client'

import type {VariantProps} from 'cva'

import React, {useRef, forwardRef, useMemo} from 'react'
import {Flex} from '@urban-ui/flex'
import {atoms} from '@urban-ui/theme/atoms'
import {cva} from 'cva'
import {content as contentStyle, inner} from './test.css.ts'

const variants = cva([], {
  variants: {
    size: {
      sm: atoms({padding: 'sm'}),
      md: atoms({padding: 'md'}),
      lg: atoms({padding: 'lg'}),
    },
  },
})

export interface TestComponentProps
  extends VariantProps<typeof variants>,
    React.PropsWithChildren {
  content: string
  className?: string
}

export const TestComponent = forwardRef<HTMLDivElement, TestComponentProps>(
  ({children, content, size, className, ...passProps}, ref) => {
    return (
      <Flex ref={ref} className={variants({size, className})} {...passProps}>
        <span className={contentStyle}>{content}</span>
        <span className={inner}>{children}</span>
      </Flex>
    )
  },
)
