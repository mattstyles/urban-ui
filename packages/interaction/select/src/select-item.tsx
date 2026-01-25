'use client'

import * as stylex from '@stylexjs/stylex'
import {
  DropdownItem,
  type DropdownItemProps,
  useDropdownContext,
} from '@urban-ui/dropdown'
import { Icon } from '@urban-ui/icon'
import { Text } from '@urban-ui/text'
import { space } from '@urban-ui/theme/layout.stylex'
import { Check } from 'lucide-react'
import { composeRenderProps } from 'react-aria-components'

const styles = stylex.create({
  item: {
    // Override to row layout for checkmark positioning
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemText: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflowX: 'clip',
    maxWidth: 'calc(100% - 32px)',
  },
  check: {
    marginInlineStart: 'auto',
    flexShrink: 0,
    paddingInlineStart: space[100],
    boxSizing: 'content-box',
  },
})

export type SelectItemProps<T extends object> = DropdownItemProps<T>

/**
 * Individual selectable option within a Select.
 * Wraps ListBoxItem and adds a checkmark indicator for selected state.
 *
 * @example
 * ```tsx
 * <Select placeholder="Select an animal">
 *   <SelectItem id="cat">Cat</SelectItem>
 *   <SelectItem id="dog">Dog</SelectItem>
 * </Select>
 * ```
 */
export function SelectItem<T extends object>({
  children,
  style,
  textValue,
  ...props
}: SelectItemProps<T>) {
  const context = useDropdownContext()
  const size = context?.size ?? 'md'
  const textSize = size === 'md' ? 'sm' : 'md'

  // Auto-derive textValue from string children if not provided
  const derivedTextValue =
    textValue ?? (typeof children === 'string' ? children : undefined)

  return (
    <DropdownItem
      {...props}
      textValue={derivedTextValue}
      style={[styles.item, style]}
    >
      {composeRenderProps(children, (children, { isSelected }) => (
        <>
          {typeof children === 'string' ? (
            <Text slot="label" size={textSize} color="current" style={styles.itemText}>
              {children}
            </Text>
          ) : (
            children
          )}
          {isSelected && (
            <Icon size="md" style={styles.check} color="current">
              <Check />
            </Icon>
          )}
        </>
      ))}
    </DropdownItem>
  )
}
