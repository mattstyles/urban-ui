import { Slot, Slottable } from '@radix-ui/react-slot'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { spacing } from '@urban-ui/theme/spacing.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  base: {
    display: 'flex',
  },
  isInline: {
    display: 'inline-flex',
  },
  fit: {
    width: 'fit-content',
  },
})

const orientationStyles = stylex.create({
  h: {
    flexDirection: 'row',
  },
  v: {
    flexDirection: 'column',
  },
})

const gapStyles = stylex.create({
  none: {
    gap: '0px',
  },
  xs: {
    gap: spacing.xs,
  },
  sm: {
    gap: spacing.sm,
  },
  md: {
    gap: spacing.md,
  },
  lg: {
    gap: spacing.lg,
  },
  xl: {
    gap: spacing.xl,
  },
})

const alignmentStyles = stylex.create({
  start: {
    alignment: 'flex-start',
  },
  center: {
    alignment: 'center',
  },
  end: {
    alignment: 'flex-end',
  },
  baseline: {
    alignment: 'baseline',
  },
})

const justifyStyles = stylex.create({
  start: {
    justify: 'flex-start',
  },
  center: {
    justify: 'center',
  },
  end: {
    justify: 'flex-end',
  },
  spread: {
    justify: 'space-between',
  },
})

const flexStyles = stylex.create({
  full: {
    flex: '1 1 0%',
  },
  auto: {
    flex: '1 1 auto',
  },
  initial: {
    flex: '0 1 auto',
  },
  none: {
    flex: 'none',
  },
})

const wrapStyles = stylex.create({
  wrap: {
    flexWrap: 'wrap',
  },
  noWrap: {
    flexWrap: 'nowrap',
  },
  reverse: {
    flexWrap: 'wrap-reverse',
  },
})

export interface FlexProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>,
    React.PropsWithChildren {
  orientation?: keyof typeof orientationStyles
  alignment?: keyof typeof alignmentStyles
  justify?: keyof typeof justifyStyles
  gap?: keyof typeof gapStyles
  inline?: boolean
  fit?: boolean
  flex?: keyof typeof flexStyles
  wrap?: keyof typeof wrapStyles

  // @TODO is this a good idea to override the html attribute?
  style?: StyleXStyles
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
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        {...stylex.props(
          styles.base,
          orientation != null && orientationStyles[orientation],
          alignment != null && alignmentStyles[alignment],
          justify != null && justifyStyles[justify],
          gap != null && gapStyles[gap],
          inline && styles.isInline,
          fit && styles.fit,
          flex != null && flexStyles[flex],
          wrap != null && wrapStyles[wrap],
          style,
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)
Flex.displayName = '@urban-ui/flex'
