import {defineProperties} from '@vanilla-extract/sprinkles'
import {createStyleObject} from '@capsizecss/core'
import {mapValues} from '@urban-ui/utils'

import {theme} from '../theme.css.ts'

// Creating text properties here means that we can avoid duplicated styles.
// This still pulls from the theme, which would allow consumers to generate different font sizes for theming using the precompute function from capsize.
export const type = defineProperties({
  properties: {
    type: mapValues(theme.type.size, createStyleObject),
    fontFamily: theme.type.font,
    fontWeight: {
      light: 300,
      normal: 400,
      semibold: 500,
      bold: 700,
    },
    fontStyle: ['italic', 'normal'],
    letterSpacing: {
      tight: '-1px',
      narrow: '-0.5px',
      standard: '0px',
      loose: '1px',
      expanded: '2.5px',
    },
  },
})
