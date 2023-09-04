import {style, createTheme, createVar, assignVars} from '@vanilla-extract/css'
import {precomputeValues} from '@capsizecss/vanilla-extract'
import {anatomy} from '@urban-ui/text/anatomy'
import {theme} from '@urban-ui/theme'
// @ts-expect-error metrics does not export type information
import interMetrics from '@capsizecss/metrics/inter'

/**
 * The entire anatomy can be applied as a theme and inherited by the text component children.
 */
export const customTextTheme = createTheme(anatomy, {
  ...anatomy,
  size: precomputeValues({
    fontSize: 28,
    leading: 42,
    fontMetrics: interMetrics,
  }),
  weight: 'light',
  style: 'normal',
  font: 'var(--font-inter)',
})

export const custom = style([
  {
    vars: assignVars(anatomy.color, {
      hi: 'rebeccapurple',
      lo: 'hotpink',
    }),
  },
  {
    vars: {
      [anatomy.weight]: '900',
      // [anatomy.color.hi]: 'rebeccapurple',
      // [theme.colors.foreground.hi]: 'rebeccapurple'
    },
    // Color won't affect text, setting the anatomy color (or global foregroudn colour) will though
    color: 'blue',
  },
  // {
  //   // Assign manually or use capsize precompute values
  //   vars: assignVars(anatomy.size, {
  //     fontSize: '35px',
  //     lineHeight: '45px',
  //     capHeightTrim: '-0.3447em',
  //     baselineTrim: '-0.3676em',
  //   }),
  // },
  {
    vars: assignVars(
      anatomy.size,
      precomputeValues({
        fontSize: 35,
        leading: 45,
        fontMetrics: interMetrics,
      }),
    ),
  },
])
