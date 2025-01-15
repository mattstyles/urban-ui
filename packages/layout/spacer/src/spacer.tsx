import type { StyleXStyles } from '@stylexjs/stylex'

import { Slot } from '@radix-ui/react-slot'
import * as stylex from '@stylexjs/stylex'
import { spacing } from '@urban-ui/theme/spacing.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  base: {
    display: 'inline-block',
  },
})

const hPad = stylex.create({
  xs: {
    paddingLeft: spacing.xs,
  },
  sm: {
    paddingLeft: spacing.sm,
  },
  md: {
    paddingLeft: spacing.md,
  },
  lg: {
    paddingLeft: spacing.lg,
  },
  xl: {
    paddingLeft: spacing.xl,
  },
})

const vPad = stylex.create({
  xs: {
    paddingTop: spacing.xs,
  },
  sm: {
    paddingTop: spacing.sm,
  },
  md: {
    paddingTop: spacing.md,
  },
  lg: {
    paddingTop: spacing.lg,
  },
  xl: {
    paddingTop: spacing.xl,
  },
})

export interface SpacerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  orientation?: 'h' | 'v'
  gap?: keyof typeof hPad

  // @TODO is this a good idea to override the html attribute?
  style?: StyleXStyles
  asChild?: boolean
}

export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
  (
    { orientation = 'h', gap = 'md', asChild = false, style, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        {...stylex.props(
          styles.base,
          orientation === 'h' && hPad[gap],
          orientation === 'v' && vPad[gap],
          style,
        )}
        {...props}
      />
    )
  },
)
Spacer.displayName = 'Spacer'
