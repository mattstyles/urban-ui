import {style, fallbackVar, assignVars} from '@vanilla-extract/css'
import {createTextStyle} from '@capsizecss/vanilla-extract'
import {anatomy} from './anatomy.css.ts'
import {sizeVars} from './variants.css.ts'
import {theme} from '@urban-ui/theme'

/**
 * Applies fallback styles.
 * Allows anatomy variables set higher up the tree to take precedence over these fallback styles (which are the `md` theme type capsize variables).
 */
export const fallbackSize = style({
  vars: {
    [sizeVars.fontSize]: fallbackVar(
      anatomy.size.fontSize,
      theme.type.size.md.fontSize,
    ),
    [sizeVars.lineHeight]: fallbackVar(
      anatomy.size.lineHeight,
      theme.type.size.md.lineHeight,
    ),
    [sizeVars.capHeightTrim]: fallbackVar(
      anatomy.size.capHeightTrim,
      theme.type.size.md.capHeightTrim,
    ),
    [sizeVars.baselineTrim]: fallbackVar(
      anatomy.size.baselineTrim,
      theme.type.size.md.baselineTrim,
    ),
  },
})

// This creates duplicate capsize classes (here and via the global theme style generation)
export const base = style([
  createTextStyle(sizeVars, 'text_base'),
  // {
  //   vars: assignVars(anatomy.color, {
  //     hi: theme.colors.foreground.hi,
  //     lo: theme.colors.foreground.lo,
  //   }),
  // },
  {
    fontWeight: fallbackVar(anatomy.weight, 'inherit'),
    fontStyle: fallbackVar(anatomy.style, 'inherit'),
    fontFamily: fallbackVar(anatomy.font, 'inherit'),
    letterSpacing: fallbackVar(anatomy.kerning, 'inherit'),
    // color: fallbackVar(anatomy.color, theme.colors.foreground.hi),
  },
])
