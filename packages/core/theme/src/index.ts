import type * as Stitches from '@stitches/react'

import {createStitches} from '@stitches/react'
import {reset} from './reset'
import {fonts, fontSizes, lineHeights, kerning} from './typography'
import {radii, space} from './scales'
import {breakpoints} from './breakpoints'

export const {styled, config, globalCss, keyframes} = createStitches({
  theme: {
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
    // shadows,
    // transitions,
    media: {
      ...breakpoints,
    },
  },
})

export type CSS = Stitches.CSS<typeof config>

export const globalStyles = globalCss(reset, {
  body: {
    fontFamily: fonts.system,
  },
})
