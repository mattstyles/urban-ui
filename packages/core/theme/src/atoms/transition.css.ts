import {defineProperties} from '@vanilla-extract/sprinkles'
import {assignVars} from '@vanilla-extract/css'
import {theme} from '../theme.css.ts'

export const transitions = defineProperties({
  properties: {
    transition: {
      // @TODO assign variables for transition easing, duration, and attribute
      // sm: {
      //   vars: assignVars('theme.current.transition.duration', theme.transition.duration.sm)
      // },
      opacity: {
        transition: `opacity ${theme.transition.easing.easeInOut} ${theme.transition.duration.md}`,
      },
    },
  },
})
