'use client'

import { Text, type TextProps } from '@urban-ui/text'
import type { TextProps as AriaTextProps } from 'react-aria-components'
import { Text as AriaText } from 'react-aria-components'

import type { ListBox2Size } from './listbox'

const fontSizeMap: Record<ListBox2Size, TextProps['size']> = {
  sm: 'sm',
  md: 'md',
  lg: 'md',
}

export interface ListBox2ItemTextProps
  extends Omit<TextProps, 'asChild'>,
    Pick<AriaTextProps, 'slot'> {
  /**
   * The slot for this text element.
   * Use "label" for primary text and "description" for secondary text.
   */
  slot: 'label' | 'description'
  /**
   * Size variant - affects font size
   */
  size?: ListBox2Size
}

/**
 * Text component for use within ListBox2Item.
 * Supports "label" and "description" slots for semantic structure.
 * Uses @urban-ui/text for consistent typography styling.
 */
export function ListBox2ItemText({
  children,
  slot,
  size: sizeProp = 'md',
  ...props
}: ListBox2ItemTextProps) {
  const textSize = fontSizeMap[sizeProp]
  return (
    <Text asChild {...props} size={textSize}>
      <AriaText slot={slot}>{children}</AriaText>
    </Text>
  )
}
ListBox2ItemText.displayName = '@urban-ui/listbox-2/ListBox2ItemText'

/**
 * Text component for use within ListBox2Item with inline layout.
 * This is used for simple string children where no wrapper is needed.
 * Supports "label" and "description" slots for semantic structure.
 */
export function ListBox2ItemTextInline({
  children,
  slot,
  size: sizeProp = 'md',
  style,
  ...props
}: ListBox2ItemTextProps) {
  const textSize = fontSizeMap[sizeProp]
  return (
    <Text
      asChild
      style={Array.isArray(style) ? style : [style]}
      {...props}
      size={textSize}
    >
      <AriaText slot={slot}>{children}</AriaText>
    </Text>
  )
}
ListBox2ItemTextInline.displayName =
  '@urban-ui/listbox-2/ListBox2ItemTextInline'
