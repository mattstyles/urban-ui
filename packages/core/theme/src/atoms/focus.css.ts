import {defineProperties} from '@vanilla-extract/sprinkles'

import {theme} from '../theme.css.ts'

export const focus = defineProperties({
  properties: {
    focusRing: {
      // React-aria handles text inputs a little better than natively and visible should be preferred
      visible: {
        selectors: {
          '&[data-focus-visible=true]': {
            outline: `2px solid ${theme.colors.core.focus}`,
            outlineOffset: '2px',
            boxShadow: `0px 0px 0px 2px ${theme.colors.app.bg.muted}`,
          },
        },
      },
      // Use native if you need to support the native focus visible pseudo rather than that provided by react-aria
      native: {
        ':focus-visible': {
          outline: `2px solid ${theme.colors.core.focus}`,
          outlineOffset: '2px',
          boxShadow: `0px 0px 0px 2px ${theme.colors.app.bg.muted}`,
        },
        ':focus': {
          outline: '2px solid blue',
        },
      },
    },
  },
})
