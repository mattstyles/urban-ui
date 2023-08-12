import {createSprinkles} from '@vanilla-extract/sprinkles'

import {display, flex} from './atoms/display.css.ts'
import {space, size} from './atoms/space.css.ts'
import {type} from './atoms/text.css.ts'

export const atoms = createSprinkles(
  // Display
  flex,
  display,

  // Sizing
  space,
  size,

  // Typography
  type,
)
export type AtomTypes = Parameters<typeof atoms>[0]
