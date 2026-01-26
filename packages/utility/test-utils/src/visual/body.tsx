import type { ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { presets } from '@urban-ui/theme'

export interface BodyProps {
  children: ReactNode
}

/**
 * Applies default body typography and color styles for visual testing.
 * Wraps components to simulate real-world usage with urban-ui defaults.
 */
export function Body({ children }: BodyProps) {
  return <div {...stylex.props(presets.body)}>{children}</div>
}
