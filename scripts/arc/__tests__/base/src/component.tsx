'use client'

// import type {VariantProps} from 'cva'

// import {cva} from 'cva'
import * as stylex from '@stylexjs/stylex'
import { forwardRef } from 'react'
// import cx from 'clsx'
import { anatomy, sizes } from './anatomy.stylex.ts'

const styles = stylex.create({
  base: {
    padding: `${sizes.x} ${sizes.y}`,
    background: anatomy.background,
    color: anatomy.foreground,
  },
})

/**
 * Variant API instead of cva.
 * Default prop is supplied via prop destructuring.
 * Compound variants is not supported.
 */
const sizeVariants = stylex.create({
  sm: {
    padding: '3px 18px',
    fontSize: 18,
  },
  md: {
    padding: '6px 24px',
    fontSize: 32,
  },
  lg: {
    padding: '9px 32px',
    fontSize: 48,
  },
})

const tones = stylex.create({
  primary: {
    backgroundColor: 'hotpink',
    color: 'white',
  },
  critical: {
    backgroundColor: 'red',
    color: 'white',
  },
  neutral: {
    backgroundColor: 'cornsilk',
    color: 'hsl(0, 0%, 15%)',
  },
})

export interface TestxProps extends React.PropsWithChildren {
  className?: string
  size?: keyof typeof sizeVariants
  tone?: keyof typeof tones
}
type ElementType = HTMLDivElement

export const Testx = forwardRef<ElementType, TestxProps>(
  ({ size = 'md', tone = 'primary', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        {...stylex.props(styles.base, sizeVariants[size], tones[tone])}
      >
        Hello world
      </div>
    )
  },
)
Testx.displayName = 'Urban.Testx'
