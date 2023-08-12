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
  backgroundColor: theme.colors.base.element.base,
  color: theme.colors.base.fg.invert.hi,

  ':hover': {
    backgroundColor: theme.colors.base.element.hover,
  },

  ':active': {
    backgroundColor: theme.colors.base.element.press,
  },
})

export const buttonGhost = style({
  backgroundColor: theme.colors.base.element.muted.base,
  color: theme.colors.base.fg.hi,

  ':hover': {
    backgroundColor: theme.colors.base.element.muted.hover,
  },

  ':active': {
    backgroundColor: theme.colors.base.element.muted.press,
  },
})

export const buttonText = style({
  backgroundColor: theme.colors.core.transparent,
  color: theme.colors.base.fg.lo,

  ':hover': {
    color: theme.colors.base.fg.hi,
  },
})

export const buttonOutlineElement = style({
  backgroundColor: theme.colors.core.transparent,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: theme.colors.base.element.base,

  ':hover': {
    borderColor: theme.colors.base.element.hover,
  },

  ':active': {
    borderColor: theme.colors.base.element.press,
  },
})
// Uses element colour for border (with transparent/muted background)
// This is the only one that works on all different backgrounds
export const buttonOutlineElementGhost = style({
  backgroundColor: theme.colors.core.transparent,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: theme.colors.base.element.base,

  ':hover': {
    backgroundColor: theme.colors.base.element.muted.hover,
  },

  ':active': {
    backgroundColor: theme.colors.base.element.muted.press,
  },
})
// Uses only border-emphasis
export const buttonOutlineEmphasis = style({
  backgroundColor: theme.colors.core.transparent,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: theme.colors.base.border.emphasis,

  ':hover': {
    backgroundColor: theme.colors.base.element.muted.hover,
  },

  ':active': {
    backgroundColor: theme.colors.base.element.muted.press,
  },
})

export const card = style({
  backgroundColor: theme.colors.base.surface.base,
  padding: theme.space.xl,
  color: theme.colors.base.fg.hi,
  borderRadius: 3,
})

export const cardSubtle = style({
  backgroundColor: theme.colors.base.surface.subtle,
})

export const cardMuted = style({
  backgroundColor: theme.colors.base.surface.muted,
})

export const cardEmphasis = style({
  backgroundColor: theme.colors.base.surface.emphasis,
})

export const cardBackground = style({
  backgroundColor: theme.colors.base.element.muted.base,
})

export const cardBorder = style({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.colors.base.border.base,
})
export const cardBorderMuted = style({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.colors.base.border.muted,
})
export const cardBorderSubtle = style({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.colors.base.border.subtle,
})
export const cardBorderEmphasis = style({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.colors.base.border.emphasis,
})

export const badge = style({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.colors.base.border.base,
  backgroundColor: theme.colors.base.element.muted.base,
  color: theme.colors.base.fg.hi,
  padding: '1px 6px',
  fontSize: theme.type.size.sm.fontSize,
  alignSelf: 'flex-start',
  borderRadius: 1000,
})
