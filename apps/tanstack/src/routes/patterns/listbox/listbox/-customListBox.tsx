'use client'

import * as stylex from '@stylexjs/stylex'
import { Icon } from '@urban-ui/icon'
import { Text } from '@urban-ui/text'
import { radii } from '@urban-ui/theme/borders.stylex'
import { base, disabled, info, tone } from '@urban-ui/theme/colors.stylex'
import { focusVars } from '@urban-ui/theme/focus.stylex'
import { edge, space } from '@urban-ui/theme/layout.stylex'
import { Check } from 'lucide-react'
import type {
  ListBoxItemProps as AriaListBoxItemProps,
  ListBoxProps as AriaListBoxProps,
} from 'react-aria-components'
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  composeRenderProps,
} from 'react-aria-components'

const styles = stylex.create({
  listbox: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[25],
    padding: edge.sm,
    outline: 'none',

    // Remove all these (or apply as a convenience, see docs/dialog-trigger-patterns)
    backgroundColor: tone.surface,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tone.border,
    borderRadius: radii.xl,
    maxWidth: 300,

    // Or, for convenience, add padding as well as most things will want consistent side/top padding _within_ this pressable region
  },
  item: {
    paddingInline: edge.sm,
    paddingBlock: edge.sm,

    display: 'flex',
    alignItems: 'center',

    borderRadius: radii.lg,
    outline: 'none',
    color: tone.fgHi,
    backgroundColor: base.transparent,
    transition: 'background 0.15s, color 0.15s',
    // Hover state
    ':is([data-hovered])': {
      backgroundColor: tone.componentHover,
    },
    // Focus visible state - keyboard navigation
    ':is([data-focus-visible])': {
      outlineColor: focusVars.outlineColor,
      outlineOffset: focusVars.outlineOffset,
      outlineStyle: focusVars.outlineStyle,
      outlineWidth: focusVars.outlineSize,
      zIndex: 1,
    },
    // Pressed state
    ':is([data-pressed])': {
      backgroundColor: info.solid,
    },
    // Disabled state
    ':is([data-disabled])': {
      backgroundColor: disabled.background,
      color: disabled.fg,
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
  check: {
    marginInlineStart: 'auto',
    transition: 'opacity 0.15s',
    opacity: {
      default: 0,
      [stylex.when.ancestor(':is([data-selected])')]: '1',
    },
  },
})

export function CustomListbox<T extends object>({
  children,
  style,
  ...props
}: AriaListBoxProps<T>) {
  return (
    <AriaListBox {...props} {...stylex.props(styles.listbox)}>
      {children}
    </AriaListBox>
  )
}

export function CustomListBoxItem<T extends object>({
  children,
  style,
  ...props
}: AriaListBoxItemProps<T>) {
  return (
    <AriaListBoxItem
      {...props}
      {...stylex.props(stylex.defaultMarker(), styles.item)}
    >
      {composeRenderProps(children, (children) => {
        return (
          <>
            <Text slot="label" size="md">
              {children}
            </Text>
            <Icon size="md" style={styles.check}>
              <Check />
            </Icon>
          </>
        )
      })}
    </AriaListBoxItem>
  )
}
