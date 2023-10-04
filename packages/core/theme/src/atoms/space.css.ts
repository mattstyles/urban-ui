import {defineProperties} from '@vanilla-extract/sprinkles'
import {mapValues} from '@urban-ui/utils'
import {theme} from '../theme.css.ts'

function mapMaxWidth<T>(value: T) {
  return {
    maxWidth: value,
  }
}

export const space = defineProperties({
  properties: {
    gap: theme.space,
    paddingTop: theme.space,
    paddingRight: theme.space,
    paddingBottom: theme.space,
    paddingLeft: theme.space,
    padding: theme.space,
  },
  shorthands: {
    p: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    pt: ['paddingTop'],
    pr: ['paddingRight'],
    pb: ['paddingBottom'],
    pl: ['paddingLeft'],
  },
})

export const size = defineProperties({
  properties: {
    width: {
      // ...mapValues(theme.space, mapWidth),
      ...theme.space,
      fit: 'fit-content',
      max: 'max-content',
      min: 'min-content',
      fill: '100%',
      'content-xs': theme.sizes.content.xs,
      'content-sm': theme.sizes.content.sm,
      'content-md': theme.sizes.content.md,
      'content-lg': theme.sizes.content.lg,
      'content-xl': theme.sizes.content.xl,
    },
    height: {
      ...theme.space,
      fit: 'fit-content',
      max: 'max-content',
      min: 'min-content',
      fill: '100%',
      'content-xs': theme.sizes.content.xs,
      'content-sm': theme.sizes.content.sm,
      'content-md': theme.sizes.content.md,
      'content-lg': theme.sizes.content.lg,
      'content-xl': theme.sizes.content.xl,
    },
    content: mapValues(theme.sizes.content, mapMaxWidth),
  },
  shorthands: {
    size: ['width', 'height'],
  },
})
