import type * as Stitches from '@stitches/react'

import {createStitches} from '@stitches/react'
import {reset} from './reset'
import {colours} from './colours'
import {fonts, fontSizes, lineHeights, kerning, fontWeights} from './typography'
import {radii, space, layoutSizes, tokens as scaleTokens} from './scales'
import {shadows} from './shadows'
import {durations, easings} from './animations'
import {media} from './media'
import {utils} from './utils'

export const {
  styled,
  css,
  config,
  globalCss,
  keyframes,
  getCssText,
  createTheme,
  theme,
} = createStitches({
  media,
  utils,
  theme: {
    // Colours
    colors: colours,

    // Typography
    fonts,
    fontSizes,
    lineHeights,
    fontWeights,
    letterSpacings: kerning,

    // Scales
    space,
    sizes: space,
    radii,
    // zIndices,

    // Borders
    // borderWidths,
    // borderStyles,

    // Misc
    shadows,
    // transitions,

    tokens: {
      ...layoutSizes,
      ...scaleTokens,

      // Transitions
      ...prefix('transitionDuration-', durations),
      ...prefix('transitionEasing-', easings),
    },
  },
})

export type CSS = Stitches.CSS<typeof config>

export const globalStyles = globalCss(reset, {
  body: {
    fontFamily: fonts.system,
  },
})

function prefix(
  pre: string,
  styleObject: Record<string, string>
): Record<string, string> {
  const output: Record<string, string> = {}
  for (let [key, value] of Object.entries(styleObject)) {
    output[pre + key] = value
  }
  return output
}
