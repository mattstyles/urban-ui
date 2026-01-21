import * as stylex from '@stylexjs/stylex'
import { space } from '@urban-ui/theme/layout.stylex'

/**
 * FormField styles for consistent form field layout.
 * Apply to form field containers (e.g., AriaTextField) to get
 * proper spacing between label, input, description, and error.
 */
export const formField = stylex.create({
  /**
   * Base layout for form fields - flex column with appropriate gap
   */
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[100],
  },
})
