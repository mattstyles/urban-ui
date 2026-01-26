import type { ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { sizes, space } from '@urban-ui/theme/layout.stylex'

export interface RowProps {
  children: ReactNode
  gap?: keyof typeof gaps
  align?: keyof typeof alignment
}

const styles = stylex.create({
  base: {
    display: 'flex',
    width: sizes.fit,
  },
})

const alignment = stylex.create({
  start: { alignItems: 'flex-start' },
  center: { alignItems: 'center' },
  end: { alignItems: 'flex-end' },
  stretch: { alignItems: 'stretch' },
  baseline: { alignItems: 'baseline' },
})

const gaps = stylex.create({
  0: { gap: space[0] },
  25: { gap: space[25] },
  50: { gap: space[50] },
  100: { gap: space[100] },
  200: { gap: space[200] },
  300: { gap: space[300] },
  400: { gap: space[400] },
  500: { gap: space[500] },
  600: { gap: space[600] },
  700: { gap: space[700] },
  800: { gap: space[800] },
  900: { gap: space[900] },
  1000: { gap: space[1000] },
})

/**
 * Layout component for grouping multiple components in a row for visual testing.
 * Used to capture multiple variants/states in a single screenshot.
 */
export function Row({ children, gap = 300, align = 'center' }: RowProps) {
  return (
    <div {...stylex.props(styles.base, alignment[align], gaps[gap])}>
      {children}
    </div>
  )
}
