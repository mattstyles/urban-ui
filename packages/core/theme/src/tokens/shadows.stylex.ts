import { defineVars } from '@stylexjs/stylex'
import { neutral, tone } from './colors.stylex'

export const DARK = '@media (prefers-color-scheme: dark)'

/**
 * @tokens shadows
 * @css box-shadow
 * Neutral shadows. When the background colour is known consider using the tonal shadow scale
 */
export const shadows = defineVars({
  sm: {
    default: `0px 0.8px 0.9px oklch(from ${neutral.shadow} l c h / 0.34), 
      0px 2.7px 3.2px -2.2px oklch(from ${neutral.shadow} l c h / 0.39)`,
    [DARK]: '',
  },
  md: {
    default: `0px 0.8px 0.9px oklch(from ${neutral.shadow} l c h / 0.32),
    0px 3.6px 4.2px -1.1px oklch(from ${neutral.shadow} l c h / 0.35),
    0px 13.3px 15.6px -2.2px oklch(from ${neutral.shadow} l c h / 0.38)`,
    [DARK]: '',
  },
  lg: {
    default: `0px 0.8px 0.9px oklch(from ${neutral.shadow} l c h / 0.36),
    0px 6.1px 6.1px -0.5px oklch(from ${neutral.shadow} l c h/ 0.37),
    0px 13.8px 16.1px -1.1px oklch(from ${neutral.shadow} l c h / 0.39),
    0px 29.1px 34px -1.6px oklch(from ${neutral.shadow} l c h / 0.41),
    0px 57.3px 67px -2.2px oklch(from ${neutral.shadow} l c h / 0.43)`,
    [DARK]: '',
  },
})

/**
 * @tokens shadows
 * @css box-shadow
 * Tonal shadows. Will match the current tonal range, this is not always what you want as shadows should match the tone of the background they are placed upon, not necessarily the component background itself.
 * Use shadows scale for neutral shadows.
 */
export const tonal = defineVars({
  sm: {
    default: `0px 0.8px 0.9px oklch(from ${tone.shadow} l c h / 0.34), 
      0px 2.7px 3.2px -2.2px oklch(from ${tone.shadow} l c h / 0.39)`,
    [DARK]: '',
  },
  md: {
    // default: `0px 0.8px 0.9px oklch(from ${tone.shadow} l c h / 0.32),
    // 0px 3.6px 4.2px -1.1px oklch(from ${tone.shadow} l c h / 0.35),
    // 0px 13.3px 15.6px -2.2px oklch(from ${tone.shadow} l c h / 0.38)`,
    default: `0px 0px 2px 10px ${tone.shadow}`,
    [DARK]: '',
  },
  lg: {
    default: `0px 0.8px 0.9px oklch(from ${tone.shadow} l c h / 0.36),
    0px 6.1px 6.1px -0.5px oklch(from ${tone.shadow} l c h/ 0.37),
    0px 13.8px 16.1px -1.1px oklch(from ${tone.shadow} l c h / 0.39),
    0px 29.1px 34px -1.6px oklch(from ${tone.shadow} l c h / 0.41),
    0px 57.3px 67px -2.2px oklch(from ${tone.shadow} l c h / 0.43)`,
    [DARK]: '',
  },
})

// export const inner = defineVars({})
