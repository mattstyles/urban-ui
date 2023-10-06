import {defineProperties} from '@vanilla-extract/sprinkles'
import {theme} from '../theme.css.ts'

export const display = defineProperties({
  properties: {
    display: [
      'flex',
      'block',
      'none',
      'inline-block',
      'inline-flex',
      'grid',
      'unset',
    ],
    position: ['absolute', 'fixed', 'relative', 'sticky', 'static'],
    visibility: ['visible', 'hidden', 'collapse'],
  },
})

export const position = defineProperties({
  properties: {
    top: theme.space,
    right: theme.space,
    bottom: theme.space,
    left: theme.space,
  },
  shorthands: {
    topRight: ['top', 'right'],
    topLeft: ['top', 'left'],
    bottomRight: ['bottom', 'right'],
    bottomLeft: ['bottom', 'left'],
  },
})

export const flex = defineProperties({
  properties: {
    flex: {
      full: {
        flex: '1 1 0%',
      },
      auto: {
        flex: '1 1 auto',
      },
      initial: {
        flex: '0 1 auto',
      },
      none: {
        flex: 'none',
      },
    },
    flexDirection: ['row', 'column'],
    alignItems: ['flex-start', 'center', 'flex-end', 'baseline'],
    justifyContent: ['flex-start', 'center', 'flex-end', 'space-between'],
    alignSelf: ['flex-start', 'center', 'flex-end', 'baseline', 'stretch'],
    justifySelf: ['flex-start', 'center', 'flex-end', 'stretch'],
    flexWrap: ['wrap', 'wrap-reverse', 'nowrap', 'unset'],
    inset: {
      [0]: '0',
      ...theme.space,
    },
  },
  shorthands: {
    orientation: ['flexDirection'],
    alignment: ['alignItems'],
    justify: ['justifyContent'],
    placeItems: ['alignItems', 'justifyContent'],
  },
})
