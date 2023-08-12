import {defineProperties} from '@vanilla-extract/sprinkles'

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
  },
  shorthands: {
    orientation: ['flexDirection'],
    alignment: ['alignItems'],
    justify: ['justifyContent'],
    placeItems: ['alignItems', 'justifyContent'],
  },
})
