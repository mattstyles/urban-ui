// https://github.com/microsoft/TypeScript/issues/48212, https://github.com/stitchesjs/stitches/issues/1055#issuecomment-1243663948
import type {} from '@stitches/react'
import {styled} from '@urban-ui/theme'

export const Flex = styled('div', {
  display: 'flex',
  position: 'relative',

  defaultVariants: {
    orientation: 'h',
  },

  variants: {
    inline: {
      true: {
        display: 'inline-flex',
      },
    },
    orientation: {
      h: {
        flexDirection: 'row',
      },
      v: {
        flexDirection: 'column',
      },
    },
    alignment: {
      center: {
        alignItems: 'center',
      },
      start: {
        alignItems: 'flex-start',
      },
      end: {
        alignItems: 'flex-end',
      },
      baseline: {
        alignItems: 'baseline',
      },
    },
    justify: {
      start: {
        justifyContent: 'flex-start',
      },
      end: {
        justifyContent: 'flex-end',
      },
      center: {
        justifyContent: 'center',
      },
      spread: {
        justifyContent: 'space-between',
      },
    },
    size: {
      full: {
        flex: 1,
      },
      half: {
        flex: 1 / 2,
      },
      third: {
        flex: 1 / 3,
      },
      quarter: {
        flex: 1 / 4,
      },
      fifth: {
        flex: 1 / 5,
      },
    },
  },
})
