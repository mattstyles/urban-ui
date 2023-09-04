import {style, assignVars, createVar, fallbackVar} from '@vanilla-extract/css'
import {theme} from '@urban-ui/theme'
import {anatomy} from './anatomy.css.ts'
import {mapValues} from '@urban-ui/utils'

/**
 * Scoped capsize variables.
 * This allows us to apply fallback variables when applying createTextStyle.
 */
export const sizeVars = {
  fontSize: createVar(),
  lineHeight: createVar(),
  capHeightTrim: createVar(),
  baselineTrim: createVar(),
}

export const sizes = mapValues(theme.type.size, (capsize) => {
  return style({
    vars: assignVars(sizeVars, capsize),
  })
})

export const font = mapValues(theme.type.font, (value) => {
  return style({
    vars: {
      [anatomy.font]: value,
    },
  })
})

export const weights = mapValues(theme.type.weight, (value) => {
  return style({
    vars: {
      [anatomy.weight]: value,
    },
  })
})

export const kerning = mapValues(theme.type.kerning, (value) => {
  return style({
    vars: {
      [anatomy.kerning]: value,
    },
  })
})

export const strong = style({
  vars: {
    [anatomy.weight]: '700',
  },
})

export const em = style({
  vars: {
    [anatomy.style]: 'italic',
  },
})

export const colors = {
  inherit: style({
    vars: assignVars(anatomy.color, {
      hi: 'inherit',
      lo: 'inherit',
    }),
    // vars: {
    // [anatomy.color]: 'inherit',
    // },
  }),
  fg: {
    hi: style({
      // color: anatomy.color.hi,
      color: fallbackVar(
        anatomy.color.hi,
        theme.colors.current.fg.hi,
        theme.colors.foreground.hi,
      ),
    }),
    lo: style({
      // color: anatomy.color.lo,
      color: fallbackVar(
        anatomy.color.lo,
        theme.colors.current.fg.lo,
        theme.colors.foreground.lo,
      ),
    }),
  },
  invert: style({
    vars: assignVars(anatomy.color, theme.colors.foreground.invert),
  }),
  toneInvert: style({
    vars: assignVars(anatomy.color, theme.colors.current.fg.invert),
  }),

  // fg: {
  //   hi: style({
  //     vars: {
  //       [anatomy.color]: theme.colors.foreground.hi,
  //     },
  //   }),
  //   lo: style({
  //     vars: {
  //       [anatomy.color]: theme.colors.foreground.lo,
  //     },
  //   }),
  //   invert: {
  //     hi: style({
  //       vars: {
  //         [anatomy.color]: theme.colors.foreground.invert.hi,
  //       },
  //     }),
  //     lo: style({
  //       vars: {
  //         [anatomy.color]: theme.colors.foreground.invert.lo,
  //       },
  //     }),
  //   },
  // },
  // tone: {
  //   hi: style({
  //     vars: {
  //       [anatomy.color]: theme.colors.current.fg.hi,
  //     },
  //   }),
  //   lo: style({
  //     vars: {
  //       [anatomy.color]: theme.colors.current.fg.lo,
  //     },
  //   }),
  //   invert: {
  //     hi: style({
  //       vars: {
  //         [anatomy.color]: theme.colors.current.fg.invert.hi,
  //       },
  //     }),
  //     lo: style({
  //       vars: {
  //         [anatomy.color]: theme.colors.current.fg.invert.lo,
  //       },
  //     }),
  //   },
  //   // @TODO there should be an atom for this override of current tonality
  //   primary: style({
  //     vars: assignVars(theme.colors.current, theme.colors.primary),
  //   }),
  // },
}
