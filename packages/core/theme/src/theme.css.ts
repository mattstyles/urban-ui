import {createThemeContract} from '@vanilla-extract/css'
import {
  space,
  alpha,
  typography,
  tone,
  background,
  coreColor,
  foreground,
} from './system.css.ts'

export const theme = createThemeContract({
  space: space,

  // Base colors
  colors: {
    // Alpha transparency scales
    transparency: {
      accent: alpha,
      deepen: alpha,
    },

    // Core colours
    core: coreColor,

    // Core foreground colours
    foreground: foreground,

    /**
     * Base is a dynamic tonal field.
     * Most components will inherit from the base tone, which can change based on context to be another tone. This gives the ability to customise components externally when required.
     * Typically a tone will always be supplied, meaning that base is a placeholder to be injected with real values dynamically.
     */
    base: tone,

    /**
     * App colours denote background colours on a scale of lightess/saturation.
     */
    app: background,

    /** -- Tones -- */

    /**
     * Primary is often used as brand colours or accent colours.
     */
    primary: tone,
  },

  // Typography
  type: typography,
})
