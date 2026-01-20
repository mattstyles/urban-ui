'use client'

import { Text, type TextProps } from '@urban-ui/text'
import type { TextProps as AriaTextProps } from 'react-aria-components'
import { Text as AriaText } from 'react-aria-components'

export interface DropdownItemTextProps
  extends Omit<TextProps, 'asChild'>,
    Pick<AriaTextProps, 'slot'> {
  /**
   * The slot for this text element.
   * Use "label" for primary text and "description" for secondary text.
   */
  slot: 'label' | 'description'
}

/**
 * Text component for use within DropdownItem.
 * Supports "label" and "description" slots for semantic structure.
 * Uses @urban-ui/text for consistent typography styling.
 */
export function DropdownItemText({
  children,
  slot,
  ...props
}: DropdownItemTextProps) {
  return (
    <Text asChild {...props}>
      <AriaText slot={slot}>{children}</AriaText>
    </Text>
  )
}
DropdownItemText.displayName = '@urban-ui/listbox/DropdownItemText'
