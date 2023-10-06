import {createGlobalTheme, globalStyle} from '@vanilla-extract/css'
import {precomputeValues} from '@capsizecss/vanilla-extract'
import {getCapHeight} from '@capsizecss/core'
import {mapValues} from '@urban-ui/utils'
import {theme} from './theme.css.ts'
import {accent, deepen, core, coreApp, tones} from './primitives/colors.ts'
import {space} from './primitives/space.ts'
import {control, borderWidth, content} from './primitives/size.ts'
import {radii} from './primitives/radii.ts'
import {type, fonts, weights, kerning} from './primitives/typography.ts'
import {shadows} from './primitives/shadows.ts'
import {px} from '@urban-ui/utils'

globalStyle('body', {
  fontFamily: fonts.system,
  backgroundColor: theme.colors.app.bg.base,
  color: theme.colors.app.fg.base.hi,
})

export const base = {
  space: space,

  sizes: {
    control: control,
    focusRing: '2px',
    content: content,
  },

  radii: radii,
  borderWidth: borderWidth,

  shadows: shadows,

  colors: {
    /** --------------------------- Core --------------------------- */
    core: core,
    transparency: {
      accent: accent,
      deepen: deepen,
    },
    app: coreApp,
    fg: {
      hi: 'hsl(0, 0%, 23%)',
      lo: 'hsl(0, 0%, 38%)',
    },

    /** --------------------------- Tones --------------------------- */
    primary: tones.primary,
    neutral: tones.neutral,
    critical: tones.critical,

    /** --------------------------- Dynamic --------------------------- */
    current: tones.neutral,
  },

  type: {
    size: mapValues(type, precomputeValues),
    capHeight: mapValues(type, ({fontSize, fontMetrics}) =>
      px(getCapHeight({fontSize, fontMetrics})),
    ),
    font: {
      system: fonts.system,
      mono: fonts.mono,
      heading: fonts.system,
      copy: fonts.system,
    },
    weight: weights,
    kerning: kerning,
  },

  transition: {
    duration: {
      sm: '120ms',
      md: '200ms',
      lg: '360ms',
    },
    easing: {
      easeInOut: 'ease-in-out',
      bounce: 'cubic-bezier(.34,1.56,1,1.65)',
    },
  },
}

createGlobalTheme(':root', theme, base)
