import { Slot } from '@radix-ui/react-slot'
import type { StyleXStyles, Theme, VarGroup } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import {
  fontColors,
  fontFamilies,
  sizes,
  styles,
  textBox,
  tracking as trackingStyles,
  weights,
} from '@urban-ui/styles/text'
import { forwardRef } from 'react'

// @ts-expect-error typing for var group prefers a known object for its keys, we want a generic object and let the compiler work it out
type GenericTheme = Theme<VarGroup<unknown>> | Array<Theme<VarGroup<unknown>>>

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'style'>,
    React.PropsWithChildren {
  /**
   * Font size of the text, with corresponding line height and letter spacing.
   * Follows a consistent scale from smallest (xxs) to largest (xxl).
   * @default 'md'
   */
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  /**
   * Font weight
   * @default normal
   */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  /**
   * Font family
   * @default body
   */
  font?: 'display' | 'body' | 'mono'
  /**
   * Font colours
   * @default foreground
   */
  color?: 'current' | 'hi' | 'lo' | 'onBlock'
  /**
   * Font colour scheme
   * @default foreground
   */
  tone?: 'neutral' | 'primary' | 'critical' | 'positive' | 'warning'
  /**
   * Tracking
   * @default normal
   */
  tracking?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest'
  /**
   * Text-box
   * @default alphabetic
   */
  textBox?: 'alphabetic' | 'auto' | 'none'
  /**
   * Custom stylex styles to apply to the text.
   */
  style?: StyleXStyles | GenericTheme | Array<StyleXStyles | GenericTheme>
  /**
   * Merge props on to immediate child element
   */
  asChild?: boolean
}

export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const {
    size,
    weight,
    font,
    color = 'current',
    tracking,
    textBox: textBoxProp = 'alphabetic',
    style,
    asChild = false,
    children,
    ...rest
  } = props

  const Element = asChild ? Slot : 'span'

  return (
    <Element
      ref={ref}
      {...stylex.props(
        styles.base,
        size != null && sizes[size],
        weight != null && weights[weight],
        font != null && fontFamilies[font],
        color != null && fontColors[color],
        tracking != null && trackingStyles[tracking],
        textBox[textBoxProp],
        style,
      )}
      {...rest}
    >
      {children}
    </Element>
  )
})

Text.displayName = '@urban-ui/text'
