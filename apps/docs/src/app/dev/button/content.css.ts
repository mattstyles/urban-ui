import {createTheme, style, assignVars} from '@vanilla-extract/css'
import {precomputeValues} from '@capsizecss/vanilla-extract'
import {size, color, anatomy} from '@urban-ui/button/anatomy'
import {anatomy as textAnatomy} from '@urban-ui/text/anatomy'
// @ts-expect-error metrics does not export type information
import interMetrics from '@capsizecss/metrics/inter'

export const custom = createTheme(anatomy, {
  ...anatomy,
  bg: {
    base: 'aqua',
    hover: 'blue',
    press: 'red',
  },
})

export const customTextStyle = style([
  {
    vars: assignVars(
      textAnatomy.size,
      precomputeValues({
        fontSize: 35,
        leading: 45,
        fontMetrics: interMetrics,
      }),
    ),
    fontFamily: 'monospace',
  },
])
