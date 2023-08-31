import {style, createTheme} from '@vanilla-extract/css'
import {theme, baseTheme} from '@urban-ui/theme'
import {atoms} from '@urban-ui/theme/atoms'

export const primary = createTheme(
  theme.colors.current,
  baseTheme.colors.primary,
)

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
  backgroundColor: theme.colors.current.element.base,
  color: theme.colors.current.fg.invert.hi,

  ':hover': {
    backgroundColor: theme.colors.current.element.hover,
  },

  ':active': {
    backgroundColor: theme.colors.current.element.press,
  },
})

export const buttonGhost = style({
  backgroundColor: theme.colors.current.element.muted.base,
  color: theme.colors.current.fg.hi,

  ':hover': {
    backgroundColor: theme.colors.current.element.muted.hover,
  },

  ':active': {
    backgroundColor: theme.colors.current.element.muted.press,
  },
})

export const buttonText = style({
  backgroundColor: theme.colors.core.transparent,
  color: theme.colors.current.fg.lo,

  ':hover': {
    color: theme.colors.current.fg.hi,
  },
})

export const buttonOutlineElement = style({
  backgroundColor: theme.colors.core.transparent,
  color: theme.colors.current.fg.hi,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: theme.colors.current.element.base,

  ':hover': {
    borderColor: theme.colors.current.element.hover,
  },

  ':active': {
    borderColor: theme.colors.current.element.press,
  },
})
// Uses element colour for border (with transparent/muted background)
// This is the only one that works on all different backgrounds
export const buttonOutlineElementGhost = style({
  backgroundColor: theme.colors.core.transparent,
  color: theme.colors.current.fg.hi,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: theme.colors.current.element.base,

  ':hover': {
    backgroundColor: theme.colors.current.element.muted.hover,
  },

  ':active': {
    backgroundColor: theme.colors.current.element.muted.press,
  },
})
// Uses only border-emphasis
export const buttonOutlineEmphasis = style({
  backgroundColor: theme.colors.core.transparent,
  color: theme.colors.current.fg.hi,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: theme.colors.current.border.emphasis,

  ':hover': {
    backgroundColor: theme.colors.current.element.muted.hover,
  },

  ':active': {
    backgroundColor: theme.colors.current.element.muted.press,
  },
})

export const card = style({
  backgroundColor: theme.colors.current.surface.base,
  padding: theme.space.xl,
  color: theme.colors.current.fg.hi,
  borderRadius: 3,
})

export const cardSubtle = style({
  backgroundColor: theme.colors.current.surface.subtle,
})

export const cardMuted = style({
  backgroundColor: theme.colors.current.surface.muted,
})

export const cardEmphasis = style({
  backgroundColor: theme.colors.current.surface.emphasis,
})

export const cardBackground = style({
  backgroundColor: theme.colors.current.element.muted.base,
})

export const cardBorder = style({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.colors.current.border.base,
})
export const cardBorderMuted = style({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.colors.current.border.muted,
})
export const cardBorderSubtle = style({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.colors.current.border.subtle,
})
export const cardBorderEmphasis = style({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.colors.current.border.emphasis,
})

export const badge = style({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.colors.current.border.base,
  backgroundColor: theme.colors.current.element.muted.base,
  color: theme.colors.current.fg.hi,
  padding: '1px 6px',
  fontSize: theme.type.size.sm.fontSize,
  alignSelf: 'flex-start',
  borderRadius: 1000,
})
