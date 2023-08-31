import {createGlobalTheme, globalStyle} from '@vanilla-extract/css'
import {precomputeValues} from '@capsizecss/vanilla-extract'
import {getCapHeight} from '@capsizecss/core'
import {mapValues} from '@urban-ui/utils'
import {theme} from './theme.css.ts'
import {accent, deepen} from './primitives/colors.ts'
import {space} from './primitives/space.ts'
import {control} from './primitives/size.ts'
import {type, fonts, weights, kerning} from './primitives/typography.ts'
import {px} from '@urban-ui/utils'

globalStyle('body', {
  fontFamily: fonts.system,
  backgroundColor: theme.colors.app.base,
})

export const base = {
  space: space,

  sizes: {
    control: control,
  },

  colors: {
    core: {
      transparent: 'transparent',
      current: 'currentcolor',
      currentcolor: 'currentcolor',
      disabled: {
        fg: 'hsl(0, 0%, 42%)',
        bg: 'hsl(0, 0%, 76%)',
      },
    },
    transparency: {
      accent: accent,
      deepen: deepen,
    },
    app: {
      muted: 'hsl(0, 0%, 100%)',
      base: 'hsl(0, 0%, 96%)',
      subtle: 'hsl(0, 0%, 91%)',
      emphasis: 'hsl(0, 0%, 82%)',
    },
    foreground: {
      invert: {
        hi: 'hsl(0, 0%, 23%)',
        lo: 'hsl(0, 0%, 38%)',
      },
      hi: 'hsl(0, 0%, 97%)',
      lo: 'hsl(0, 0%, 86%)',
    },
    current: {
      fg: {
        invert: {
          hi: 'hsl(0, 0%, 96%)',
          lo: 'hsl(0, 0%, 79%)',
        },
        hi: 'hsl(0, 0%, 22%)',
        lo: 'hsl(0, 0%, 45%)',
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
        base: 'hsl(0, 0%, 52%)',
        hover: 'hsl(0, 0%, 49%)',
        press: 'hsl(0, 0%, 45%)',
        selected: 'hsl(0, 0%, 42%)',
      },
      border: {
        muted: 'hsl(0, 0%, 88%)',
        base: 'hsl(0, 0%, 82%)',
        subtle: 'hsl(0, 0%, 79%)',
        emphasis: 'hsl(0, 0%, 72%)',
      },
    },
    primary: {
      fg: {
        invert: {
          hi: 'hsl(300, 82%, 96%)',
          lo: 'hsl(310, 72%, 69%)',
        },
        hi: 'hsl(320, 70%, 42%)',
        lo: 'hsl(323, 75%, 55%)',
      },
      surface: {
        muted: 'hsl(322, 100%, 99.4%)',
        base: 'hsl(323, 100%, 98.4%)',
        subtle: 'hsl(317, 97%, 96%)',
        emphasis: 'hsl(319, 99%, 93%)',
      },
      element: {
        muted: {
          base: 'hsl(323, 86.3%, 96.5%)',
          hover: 'hsl(323, 78.7%, 94.2%)',
          press: 'hsl(323, 72.2%, 91.1%)',
          selected: 'hsl(323, 66.3%, 86.6%)',
        },
        base: 'hsl(322, 65.0%, 54.5%)',
        hover: 'hsl(322, 63.9%, 50.7%)',
        press: 'hsl(323, 61.9%, 46.7%)',
        selected: 'hsl(321, 60.9%, 42.7%)',
      },
      border: {
        muted: 'hsl(323, 70.6%, 90.6%)',
        base: 'hsl(323, 66.3%, 86.6%)',
        subtle: 'hsl(323, 62.0%, 80.1%)',
        emphasis: 'hsl(323, 60.3%, 72.4%)',
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
