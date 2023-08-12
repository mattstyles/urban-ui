import {style} from '@vanilla-extract/css'
import {theme} from '@urban-ui/theme'
import {atoms} from '@urban-ui/theme/atoms'

export const button = style([
  atoms({
    display: 'inline-flex',
    placeItems: 'center',
    flex: 'none',
  }),
  {
    appearance: 'none',
    lineHeight: 1,
    padding: '8px 12px',
    fontSize: 14,
    outline: 'none',

    userSelect: 'none',
    WebkitUserSelect: 'none',

    border: 'none',
  },
])

export const buttonSolid = style({
  backgroundColor: theme.colors.base.bg.strong.base,
  color: theme.colors.base.foreground.invert.hi,

  ':hover': {
    backgroundColor: theme.colors.base.bg.strong.hover,
  },

  ':active': {
    backgroundColor: theme.colors.base.bg.strong.press,
  },
})

export const buttonGhost = style({
  backgroundColor: theme.colors.base.bg.muted.base,
  color: theme.colors.base.foreground.hi,

  ':hover': {
    backgroundColor: theme.colors.base.bg.muted.hover,
  },

  ':active': {
    backgroundColor: theme.colors.base.bg.muted.press,
  },
})

export const buttonText = style({
  backgroundColor: theme.colors.core.transparent,
  color: theme.colors.base.foreground.lo,

  ':hover': {
    color: theme.colors.base.foreground.hi,
  },
})

export const buttonOutline = style({
  backgroundColor: theme.colors.core.transparent,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: theme.colors.base.border.base,

  ':hover': {
    borderColor: theme.colors.base.border.hover,
  },

  ':active': {
    borderColor: theme.colors.base.border.press,
  },
})

export const card = style({
  backgroundColor: theme.colors.base.surface.base,
  padding: theme.space.xl,
  color: theme.colors.base.foreground.hi,
  borderRadius: 3,
})

export const cardSubtle = style({
  backgroundColor: theme.colors.base.surface.subtle,
})

export const cardMuted = style({
  backgroundColor: theme.colors.base.surface.muted,
})

export const cardBackground = style({
  backgroundColor: theme.colors.base.bg.muted.base,
})
