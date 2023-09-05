import type {MapType} from './shared.ts'

import {createThemeContract} from '@vanilla-extract/css'
import {mapValues} from '@urban-ui/utils'
import {precomputeValues} from '@capsizecss/core'
import {
  sizeScale,
  extendedSizeScale,
  restrictedSizeScale,
  numericScale,
} from './shared.ts'

/**
 * Semantic space scale for UI elements
 */
export const space = createThemeContract({
  none: null,
  ...extendedSizeScale,
})

/**
 * Semantic sizes for UI elements
 */
export const sizes = createThemeContract({
  control: restrictedSizeScale,
  focusRing: null,
})

/**
 * Font size is controlled by capsize
 */
export type Capsize = ReturnType<typeof precomputeValues>
const typeCapsize: MapType<Capsize, null> = {
  fontSize: null,
  lineHeight: null,
  capHeightTrim: null,
  baselineTrim: null,
}

/**
 * Typography has a couple of different variables it supports
 */
export const typography = createThemeContract({
  size: mapValues(sizeScale, () => {
    return typeCapsize
  }),
  capHeight: mapValues(sizeScale, () => {
    return null
  }),
  font: {
    system: null,
    heading: null,
    copy: null,
    mono: null,
  },
  weight: {
    light: null,
    normal: null,
    semibold: null,
    bold: null,
  },
  kerning: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },
})

/**
 * Transparency is not a semantic scale
 */
export const alpha = createThemeContract({
  50: null,
  75: null,
  ...numericScale,
})

/**
 * App colours are different from standard tonal colours.
 * App colours are expected as background colours.
 * The 4 modes form a scale either of decreasing or increasing lightness and/or saturation i.e. light mode lightest colour will be muted, and darkest colour will be emphasis.
 */
export const background = createThemeContract({
  muted: null,
  base: null,
  subtle: null,
  emphasis: null,
})

/**
 * Interactive state colours
 */
export const interaction = {
  base: null,
  hover: null,
  press: null,
  selected: null,
}

/**
 * Refers to elements which are always foreground, primarily text and iconography.
 * High and low contrast modes should be supplied, note that low contrast should still pass accessibility standards.
 */
export const foreground = createThemeContract({
  hi: null,
  lo: null,
})

export const fullForeground = createThemeContract({
  base: foreground,
  invert: foreground,
})

/**
 * Colour tone.
 * Each tone is comprised of surface, element, border, and foreground components.
 * Surfaces are designed as backdrops for background elements.
 * Element are backdrops for foreground elements (comprised of muted and standard colours, with interaction states).
 * Foreground colours are for both foreground and background components, such as text on buttons and icons on surfaces.
 * Borders represent component borders and support a couple of prominences.
 */
export const tone = createThemeContract({
  // Refers to top-level foreground components like text and icons
  fg: fullForeground,
  // Background element backgrounds (panels, surfaces, etc)
  surface: background,
  // Foreground element backgrounds (buttons, badges, etc)
  element: {
    muted: interaction,
    strong: interaction,
  },
  // Mid-range lightness borders
  border: background,
})

/**
 * Core colour values are shared across the entire system colour spectrum
 */
export const coreColor = createThemeContract({
  transparent: null,
  current: null,
  currentcolor: null,
  disabled: {
    bg: null,
    fg: null,
  },
  focus: null,
})

export const transition = createThemeContract({
  duration: restrictedSizeScale,
  easing: {
    easeInOut: null,
    bounce: null,
  },
})

export const radii = createThemeContract({
  circular: null,
  ...restrictedSizeScale,
})
