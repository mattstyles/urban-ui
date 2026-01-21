'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { radii } from '@urban-ui/theme/borders.stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { shadows } from '@urban-ui/theme/shadows.stylex'
import type { PopoverProps as AriaPopoverProps } from 'react-aria-components'
import { Popover as AriaPopover } from 'react-aria-components'

import { OverlayArrow } from './overlay-arrow'

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

// Triggers that should not show arrows (dropdown-style menus)
const noArrowTriggers = ['MenuTrigger', 'SubmenuTrigger']

export interface PopoverProps extends Omit<AriaPopoverProps, 'style'> {
  /**
   * Whether to show the arrow indicator pointing to the trigger.
   * Automatically hidden for MenuTrigger and SubmenuTrigger.
   * @default false
   */
  showArrow?: boolean

  /**
   * Additional styles to apply
   */
  style?: StyleXStyles

  /**
   * Additional styles to apply to the SVG arrow
   */
  arrowStyle?: StyleXStyles
}

/**
 * Popover component for positioning overlay content relative to a trigger.
 * Used as a foundation for tooltips, dropdowns, selects, and other overlay components.
 *
 * @example
 * ```tsx
 * <DialogTrigger>
 *   <Button>Open</Button>
 *   <Popover showArrow>
 *     <Dialog>Content here</Dialog>
 *   </Popover>
 * </DialogTrigger>
 * ```
 */
export function Popover({
  children,
  style,
  arrowStyle,
  placement = 'bottom',
  showArrow = false,
  trigger,
  ...props
}: PopoverProps) {
  return (
    <AriaPopover
      placement={placement}
      trigger={trigger}
      {...props}
      {...stylex.props([styles.base, style])}
    >
      {(renderProps) => {
        // Determine if arrow should be shown based on trigger type
        const shouldShowArrow =
          showArrow && !noArrowTriggers.includes(trigger ?? '')

        return (
          <>
            {shouldShowArrow && <OverlayArrow svgStyle={arrowStyle} />}
            {typeof children === 'function' ? children(renderProps) : children}
          </>
        )
      }}
    </AriaPopover>
  )
}
Popover.displayName = '@urban-ui/popover'
