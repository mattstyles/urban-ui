'use client'

import * as stylex from '@stylexjs/stylex'
import { radii } from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { edge, space } from '@urban-ui/theme/layout.stylex'
import type { ListBoxProps as AriaListBoxProps } from 'react-aria-components'
import { ListBox as AriaListBox } from 'react-aria-components'

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
  check: {
    marginInlineStart: 'auto',
    transition: 'opacity 0.15s',
    opacity: {
      default: 0,
      [stylex.when.ancestor(':is([data-selected])')]: '1',
    },
  },
})

export function SelectListBox<T extends object>({
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
