import { Slot } from '@radix-ui/react-slot'
import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles, Theme, VarGroup } from '@stylexjs/stylex'
import { content, edge } from '@urban-ui/theme/layout.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
  base: {
    display: 'block',
  },

  // Width
  wide: { maxWidth: content.wide },
  narrow: { maxWidth: content.narrow },

  // Edge Block (paddingBlock)
  edgeBlockNone: { paddingBlock: edge.none },
  edgeBlockXxs: { paddingBlock: edge.xxs },
  edgeBlockXs: { paddingBlock: edge.xs },
  edgeBlockSm: { paddingBlock: edge.sm },
  edgeBlockMd: { paddingBlock: edge.md },
  edgeBlockLg: { paddingBlock: edge.lg },
  edgeBlockXl: { paddingBlock: edge.xl },

  // Edge Inline (paddingInline)
  edgeInlineNone: { paddingInline: edge.none },
  edgeInlineXxs: { paddingInline: edge.xxs },
  edgeInlineXs: { paddingInline: edge.xs },
  edgeInlineSm: { paddingInline: edge.sm },
  edgeInlineMd: { paddingInline: edge.md },
  edgeInlineLg: { paddingInline: edge.lg },
  edgeInlineXl: { paddingInline: edge.xl },
})

const widthStyle = {
  wide: styles.wide,
  narrow: styles.narrow,
}

const edgeBlockStyle = {
  none: styles.edgeBlockNone,
  xxs: styles.edgeBlockXxs,
  xs: styles.edgeBlockXs,
  sm: styles.edgeBlockSm,
  md: styles.edgeBlockMd,
  lg: styles.edgeBlockLg,
  xl: styles.edgeBlockXl,
}

const edgeInlineStyle = {
  none: styles.edgeInlineNone,
  xxs: styles.edgeInlineXxs,
  xs: styles.edgeInlineXs,
  sm: styles.edgeInlineSm,
  md: styles.edgeInlineMd,
  lg: styles.edgeInlineLg,
  xl: styles.edgeInlineXl,
}

// @ts-expect-error typing for var group prefers a known object for its keys, we want a generic object and let the compiler work it out
type GenericTheme = Theme<VarGroup<unknown>> | Array<Theme<VarGroup<unknown>>>

export interface ContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>,
    React.PropsWithChildren {
  /**
   * Maximum width constraint for the content
   */
  width?: 'wide' | 'narrow'

  /**
   * Padding on the block axis (top and bottom)
   */
  edgeBlock?: 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Padding on the inline axis (left and right)
   */
  edgeInline?: 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * StyleX style overrides
   */
  style?: StyleXStyles | GenericTheme | Array<StyleXStyles | GenericTheme>

  /**
   * Whether to use the Slot component instead of a div
   */
  asChild?: boolean
}

export const Content = forwardRef<HTMLDivElement, ContentProps>((props, ref) => {
  const {
    width,
    edgeBlock,
    edgeInline,
    style = [],
    className,
    children,
    asChild = false,
    ...rest
  } = props

  const Element = asChild ? Slot : 'div'

  return (
    <Element
      ref={ref}
      className={className}
      {...rest}
      {...stylex.props(
        styles.base,
        width != null && widthStyle[width],
        edgeBlock != null && edgeBlockStyle[edgeBlock],
        edgeInline != null && edgeInlineStyle[edgeInline],
        style,
      )}
    >
      {children}
    </Element>
  )
})
