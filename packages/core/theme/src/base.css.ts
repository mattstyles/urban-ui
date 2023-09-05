import {createGlobalTheme, globalStyle} from '@vanilla-extract/css'
import {precomputeValues} from '@capsizecss/vanilla-extract'
import {getCapHeight} from '@capsizecss/core'
import {mapValues} from '@urban-ui/utils'
import {theme} from './theme.css.ts'
import {accent, deepen, core, coreApp, tones} from './primitives/colors.ts'
import {space} from './primitives/space.ts'
import {control} from './primitives/size.ts'
import {radii} from './primitives/radii.ts'
import {type, fonts, weights, kerning} from './primitives/typography.ts'
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
  },

  radii: radii,

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

    /** --------------------------- Dynamic --------------------------- */
    current: {
      fg: {
        invert: {
          hi: 'hsl(0, 0%, 97%)',
          lo: 'hsl(0, 0%, 86%)',
        },
        base: {hi: 'hsl(0, 0%, 23%)', lo: 'hsl(0, 0%, 38%)'},
      },
      surface: {
        muted: 'hsl(0, 0%, 96%)',
        base: 'hsl(0, 0%, 94%)',
        subtle: 'hsl(0, 0%, 91%)',
        emphasis: 'hsl(0, 0%, 86%)',
      },
      element: {
        muted: {
          base: 'hsl(0, 0%, 80%)',
          hover: 'hsl(0, 0%, 78%)',
          press: 'hsl(0, 0%, 75%)',
          selected: 'hsl(0, 0%, 71%)',
        },
        strong: {
          base: 'hsl(0, 0%, 52%)',
          hover: 'hsl(0, 0%, 49%)',
          press: 'hsl(0, 0%, 45%)',
          selected: 'hsl(0, 0%, 42%)',
        },
      },
      border: {
        muted: 'hsl(0, 0%, 88%)',
        base: 'hsl(0, 0%, 82%)',
        subtle: 'hsl(0, 0%, 79%)',
        emphasis: 'hsl(0, 0%, 72%)',
      },
    },
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
