import {createGlobalTheme, globalStyle} from '@vanilla-extract/css'
import {precomputeValues} from '@capsizecss/vanilla-extract'
import {getCapHeight} from '@capsizecss/core'
import {mapValues} from '@urban-ui/utils'
import {theme} from './theme.css.ts'
import {accent, deepen} from './primitives/colors.ts'
import {space} from './primitives/space.ts'
import {type, fonts, weights, kerning} from './primitives/typography.ts'
import {px} from '@urban-ui/utils'

const pink = {
  pink1: 'hsl(322, 100%, 99.4%)',
  pink2: 'hsl(323, 100%, 98.4%)',
  pink3: 'hsl(323, 86.3%, 96.5%)',
  pink4: 'hsl(323, 78.7%, 94.2%)',
  pink5: 'hsl(323, 72.2%, 91.1%)',
  pink6: 'hsl(323, 66.3%, 86.6%)',
  pink7: 'hsl(323, 62.0%, 80.1%)',
  pink8: 'hsl(323, 60.3%, 72.4%)',
  pink9: 'hsl(322, 65.0%, 54.5%)',
  pink10: 'hsl(322, 63.9%, 50.7%)',
  pink11: 'hsl(322, 75.0%, 46.0%)',
  pink12: 'hsl(320, 70.0%, 13.5%)',
}

globalStyle('body', {
  fontFamily: fonts.system,
})

export const base = {
  space: space,

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
    // @TODO should be current, not base
    base: {
      // muted: {
      //   bg: {
      //     base: 'hsl(0, 0%, 90%)',
      //     aux: 'hsl(0, 0%, 86%)',
      //     emphasis: 'hsl(0, 0%, 80%)',
      //   },
      //   fg: {
      //     hi: 'hsl(0, 0%, 27%)',
      //     lo: 'hsl(0, 0%, 46%)',
      //   },
      // },
      // border: {
      //   base: 'hsl(0, 0%, 78%)',
      //   aux: 'hsl(0, 0%, 72%)',
      //   emphasis: 'hsl(0, 0%, 68%)',
      // },
      // tone: {
      //   bg: {
      //     base: 'hsl(0, 0%, 47%)',
      //     aux: 'hsl(0, 0%, 53%)',
      //     emphasis: 'hsl(0, 0%, 56%)',
      //   },
      //   fg: {
      //     hi: 'hsl(0, 0%, 96%)',
      //     lo: 'hsl(0, 0%, 79%)',
      //   },
      // },
      // disabled: 'hsl(0, 0%, 45%)',
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
      // muted: {
      //   bg: {
      //     base: 'hsl(323, 86.3%, 96.5%)', // pink3
      //     aux: 'hsl(323, 78.7%, 94.2%)', // pink4
      //     emphasis: 'hsl(323, 72.2%, 91.1%)', // pink5
      //   },
      //   fg: {
      //     hi: 'hsl(320, 70.0%, 13.5%)', // pink12
      //     lo: 'hsl(322, 75.0%, 46.0%)', // pink11
      //   },
      // },
      // border: {
      //   base: 'hsl(323, 62.0%, 86.1%)', // pink6
      //   aux: 'hsl(323, 60.3%, 80.1%)', // pink7
      //   emphasis: 'hsl(323, 60.3%, 72.4%)', // pink8
      // },
      // tone: {
      //   bg: {
      //     base: 'hsl(322, 65.0%, 54.5%)', // pink9
      //     aux: 'hsl(322, 63.9%, 50.7%)', // pink10
      //     emphasis: 'hsl(322, 75.0%, 46.0%)', // pink11
      //   },
      //   fg: {
      //     hi: 'hsl(300, 92%, 98%)', // near pink2
      //     lo: 'hsl(300, 72%, 76%)', // nearish pink8
      //   },
      // },
      // disabled: 'hsl(300, 12%, 67%)',
      fg: {
        invert: {
          hi: 'hsl(300, 82%, 96%)',
          lo: 'hsl(310, 82%, 69%)',
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
}

createGlobalTheme(':root', theme, base)
