import type {MapType} from './shared.ts'

import {createThemeContract} from '@vanilla-extract/css'
// import mapValues from 'just-map-values'
import {mapValues} from '@urban-ui/utils'
import {precomputeValues} from '@capsizecss/core'
import {semanticScale, extendedSemanticScale, numericScale} from './shared.ts'

export type Capsize = ReturnType<typeof precomputeValues>
const typeCapsize: MapType<Capsize, null> = {
  fontSize: null,
  lineHeight: null,
  capHeightTrim: null,
  baselineTrim: null,
}

/**
 * Semantic space scale for UI elements
 */
export const space = createThemeContract({
  none: null,
  ...extendedSemanticScale,
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
 * Typography has a couple of different variables it supports
 */
export const typography = createThemeContract({
  size: mapValues(semanticScale, () => {
    return typeCapsize
  }),
  font: {
    system: null,
    heading: null,
    copy: null,
    mono: null,
  },
  fontWeights: {
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
 * Background colours have 2 primary modes: base and active.
 * There are 2 additional colours that must be defined to denote hover and disabled states.
 */
export const bg = createThemeContract({
  base: null,
  aux: null,
  emphasis: null,
})

/**
 * Foreground colours have two modes, either high or low contrast.
 * Foreground colours should have enough contrast with every background colour to meet accessibility standards.
 */
export const fg = createThemeContract({
  hi: null,
  lo: null,
})

/**
 * A colour must define background and foreground colours, 4 bg, 2 fg.
 */
export const color = createThemeContract({
  bg,
  fg,
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

export const interaction = {
  base: null,
  hover: null,
  press: null,
  selected: null,
}

/**
 * Colour tone.
 * Each colour has a muted and block colour mode, and within each mode are 2 primary colours (base and emphasis). Aux forms an intermediary between the two.
 *
 * This gives 4 primary colours, 2 muted and 2 block colours.
 * Each of these pairs must define foreground colours.
 * There are 2 additional colours, intermediary colours between base and emphasised colours for each colour.
 * `tone.base` has the most chroma of any value defined within a tone.
 * Each tone must define a disabled colour to act as background for disabled elements.
 */
export const tone = createThemeContract({
  // muted: color,
  // tone: color,
  // border: bg,
  // disabled: null,

  foreground: {
    invert: fg,
    ...fg,
  },
  surface: background,
  bg: {
    muted: interaction,
    strong: interaction,
  },
  border: interaction,
})

export const textColor = createThemeContract({
  muted: fg,
  tone: fg,
  disabled: null,
})

export const coreColor = createThemeContract({
  transparent: null,
  current: null,
  currentcolor: null,
  disabled: {
    bg: null,
    fg: null,
  },
})
