import type { CSSProperties, ReactNode } from 'react'

export interface RowProps {
  children: ReactNode
  gap?: number
  align?: CSSProperties['alignItems']
}

/**
 * Layout component for grouping multiple components in a row for visual testing.
 * Used to capture multiple variants/states in a single screenshot.
 */
export function Row({ children, gap = 12, align = 'center' }: RowProps) {
  return (
    <div style={{ display: 'flex', alignItems: align, gap, width: 'fit-content' }}>
      {children}
    </div>
  )
}
