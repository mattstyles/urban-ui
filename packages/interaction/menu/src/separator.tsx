'use client'

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { tone } from '@urban-ui/theme/colors.stylex'
import { space } from '@urban-ui/theme/layout.stylex'
import type { SeparatorProps as AriaSeparatorProps } from 'react-aria-components'
import { Separator as AriaSeparator } from 'react-aria-components'

const styles = stylex.create({
  separator: {
    height: 1,
    backgroundColor: tone.borderMuted,
    marginBlock: space['50'],
    marginInline: space['100'],
  },
})

export interface SeparatorProps
  extends Omit<AriaSeparatorProps, 'style' | 'className'> {
  /**
   * Additional styles to apply
   */
  style?: StyleXStyles
}

/**
 * Visual divider between menu items or sections.
 *
 * @example
 * ```tsx
 * <Menu>
 *   <MenuItem>Cut</MenuItem>
 *   <MenuItem>Copy</MenuItem>
 *   <Separator />
 *   <MenuItem>Paste</MenuItem>
 * </Menu>
 * ```
 */
export function Separator({ style, ...props }: SeparatorProps) {
  return <AriaSeparator {...props} {...stylex.props(styles.separator, style)} />
}
Separator.displayName = '@urban-ui/separator'
