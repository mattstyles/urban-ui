'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import type { ListBoxItemProps as AriaListBoxItemProps } from 'react-aria-components'
import {
  ListBoxItem as AriaListBoxItem,
  composeRenderProps,
} from 'react-aria-components'

import { ListboxItemTextInline } from './listbox-item-text'

export interface ListboxItemProps<T extends object>
  extends Omit<AriaListBoxItemProps<T>, 'style' | 'className'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * ListboxItemPrimitive component for use when creating ListBox-Item variants.
 * Provides styled items with hover, focus-visible, pressed, selected, and disabled states.
 *
 * Visual states are modeled using CSS :is() selectors to handle both
 * native CSS pseudo-classes and react-aria data attributes.
 */
export function ListboxItemPrimitive<T extends object>({
  children,
  style,
  ...props
}: ListboxItemProps<T>) {
  return (
    <AriaListBoxItem {...props}>
      {composeRenderProps(children, (children) =>
        typeof children === 'string' ? (
          <ListboxItemTextInline slot="label">{children}</ListboxItemTextInline>
        ) : (
          children
        ),
      )}
    </AriaListBoxItem>
  )
}
ListboxItemPrimitive.displayName = '@urban-ui/listbox/ListboxItemPrimitive'
