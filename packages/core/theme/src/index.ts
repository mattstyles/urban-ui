import type * as Stitches from '@stitches/react'

import {createStitches} from '@stitches/react'
import {reset} from './reset'
import {colours} from './colours'
import {fonts, fontSizes, lineHeights, kerning} from './typography'
import {radii, space, layoutSizes} from './scales'
import {shadows} from './shadows'
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
    },
  },
})

export type CSS = Stitches.CSS<typeof config>

export const globalStyles = globalCss(reset, {
  body: {
    fontFamily: fonts.system,
  },
})
