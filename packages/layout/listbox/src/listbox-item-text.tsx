'use client'

import * as stylex from '@stylexjs/stylex'
import { Text, type TextProps } from '@urban-ui/text'
import { space } from '@urban-ui/theme/layout.stylex'
import type { TextProps as AriaTextProps } from 'react-aria-components'
import { Text as AriaText } from 'react-aria-components'

const styles = stylex.create({
  inline: {
    padding: space[150],
  },
})

export interface ListboxItemTextProps
  extends Omit<TextProps, 'asChild'>,
    Pick<AriaTextProps, 'slot'> {
  /**
   * The slot for this text element.
   * Use "label" for primary text and "description" for secondary text.
   */
  slot: 'label' | 'description'
}

/**
 * Text component for use within ListboxItem.
 * Supports "label" and "description" slots for semantic structure.
 * Uses @urban-ui/text for consistent typography styling.
 */
export function ListboxItemText({
  children,
  slot,
  ...props
}: ListboxItemTextProps) {
  return (
    <Text asChild {...props}>
      <AriaText slot={slot}>{children}</AriaText>
    </Text>
  )
}
ListboxItemText.displayName = '@urban-ui/listbox/ListboxItemText'

/**
 * Text component for use within ListboxItem with inline padding.
 * Includes padding for standalone use without additional wrapper styling.
 * Supports "label" and "description" slots for semantic structure.
 */
export function ListboxItemTextInline({
  children,
  slot,
  style,
  ...props
}: ListboxItemTextProps) {
  return (
    <Text
      asChild
      style={[styles.inline, ...(Array.isArray(style) ? style : [style])]}
      {...props}
    >
      <AriaText slot={slot}>{children}</AriaText>
    </Text>
  )
}
ListboxItemTextInline.displayName = '@urban-ui/listbox/ListboxItemTextInline'
