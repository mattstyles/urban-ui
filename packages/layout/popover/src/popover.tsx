'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { radii } from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { shadows } from '@urban-ui/theme/shadows.stylex'
import type { PopoverProps as AriaPopoverProps } from 'react-aria-components'
import { Popover as AriaPopover } from 'react-aria-components'

const styles = stylex.create({
  base: {
    backgroundColor: tone.surface,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tone.border,
    borderRadius: radii.lg,
    boxShadow: shadows.md,
    outline: 'none',
  },
})

const placements = stylex.create({
  top: {
    // Add slight margin to separate from trigger
    marginBottom: 4,
  },
  bottom: {
    marginTop: 4,
  },
  left: {
    marginRight: 4,
  },
  right: {
    marginLeft: 4,
  },
})

export interface PopoverProps extends Omit<AriaPopoverProps, 'style'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Popover component for positioning overlay content relative to a trigger.
 * Used as a foundation for tooltips, dropdowns, selects, and other overlay components.
 *
 * @example
 * ```tsx
 * <DialogTrigger>
 *   <Button>Open</Button>
 *   <Popover>
 *     <Dialog>Content here</Dialog>
 *   </Popover>
 * </DialogTrigger>
 * ```
 */
export function Popover({ children, style, placement = 'bottom', ...props }: PopoverProps) {
  // Extract base placement direction for margin styles
  const basePlacement = placement.split(' ')[0] as keyof typeof placements

  return (
    <AriaPopover
      placement={placement}
      {...props}
      {...stylex.props([
        styles.base,
        basePlacement in placements && placements[basePlacement],
        style,
      ])}
    >
      {children}
    </AriaPopover>
  )
}
Popover.displayName = '@urban-ui/popover'
