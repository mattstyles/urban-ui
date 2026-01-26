import * as stylex from '@stylexjs/stylex'
import { presets } from '@urban-ui/theme'
import { sizes } from '@urban-ui/theme/layout.stylex'
import type { ReactNode } from 'react'

const styles = stylex.create({
  base: {
    width: sizes.fit,
    height: sizes.fit,
  },
})

export interface BodyProps {
  children: ReactNode
}

/**
 * Applies default body typography and color styles for visual testing.
 * Wraps components to simulate real-world usage with urban-ui defaults.
 */
export function Body({ children }: BodyProps) {
  return <div {...stylex.props(presets.body, styles.base)}>{children}</div>
}
