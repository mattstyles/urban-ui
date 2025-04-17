import { createTheme } from '@stylexjs/stylex'

import { tone } from './tokens/colors.stylex'
import { shadows as shadowVars } from './tokens/shadows.stylex'

/**
 * Used to alter shadows to use the tonal variant.
 * Will use the tone from a **parent** element (or the same element), and not from a child element.
 */
export const shadows = createTheme(shadowVars, {
  sm: `0px 0.8px 0.9px oklch(from ${tone.shadow} l c h / 0.34), 
        0px 2.7px 3.2px -2.2px oklch(from ${tone.shadow} l c h / 0.39)`,
  md: `0px 0.8px 0.9px oklch(from ${tone.shadow} l c h / 0.32),
      0px 3.6px 4.2px -1.1px oklch(from ${tone.shadow} l c h / 0.35),
      0px 13.3px 15.6px -2.2px oklch(from ${tone.shadow} l c h / 0.38)`,
  lg: `0px 0.8px 0.9px oklch(from ${tone.shadow} l c h / 0.36),
      0px 6.1px 6.1px -0.5px oklch(from ${tone.shadow} l c h/ 0.37),
      0px 13.8px 16.1px -1.1px oklch(from ${tone.shadow} l c h / 0.39),
      0px 29.1px 34px -1.6px oklch(from ${tone.shadow} l c h / 0.41),
      0px 57.3px 67px -2.2px oklch(from ${tone.shadow} l c h / 0.43)`,
})
