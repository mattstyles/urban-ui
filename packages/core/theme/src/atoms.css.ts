import {createSprinkles} from '@vanilla-extract/sprinkles'

import {display, flex} from './atoms/display.css.ts'
import {space, size} from './atoms/space.css.ts'
import {type} from './atoms/text.css.ts'
import {focus} from './atoms/focus.css.ts'
import {borders} from './atoms/borders.css.ts'
import {pointer} from './atoms/pointer.css.ts'
import {background, foreground, tone, opacity} from './atoms/colors.css.ts'
import {transitions} from './atoms/transition.css.ts'
import {shadows} from './atoms/shadows.css.ts'

export const atoms = createSprinkles(
  // Display
  flex,
  display,

  // Sizing
  space,
  size,

  // Colors
  background,
  foreground,
  tone,
  opacity,
  borders,

  // Typography
  type,

  // Accessibility
  focus,
  pointer,

  // Transition
  transitions,

  // Shadows
  shadows,
)
export type AtomTypes = Parameters<typeof atoms>[0]
