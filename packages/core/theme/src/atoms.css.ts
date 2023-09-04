import {createSprinkles} from '@vanilla-extract/sprinkles'

import {display, flex} from './atoms/display.css.ts'
import {space, size} from './atoms/space.css.ts'
import {type} from './atoms/text.css.ts'
import {focus} from './atoms/focus.css.ts'
import {radii} from './atoms/radii.css.ts'
import {pointer} from './atoms/pointer.css.ts'
import {background, tone} from './atoms/colors.css.ts'

export const atoms = createSprinkles(
  // Display
  flex,
  display,

  // Sizing
  space,
  size,
  radii,

  // Colors
  background,
  tone,

  // Typography
  type,

  // Accessibility
  focus,
  pointer,
)
export type AtomTypes = Parameters<typeof atoms>[0]
