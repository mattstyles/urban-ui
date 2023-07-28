import {style, createVar} from '@vanilla-extract/css'

const bgColor = createVar()
const bgHover = createVar()
const bgPress = createVar()

const pinkDark = {
  pink1: 'hsl(318, 25.0%, 9.6%)',
  pink2: 'hsl(319, 32.2%, 11.6%)',
  pink3: 'hsl(319, 41.0%, 16.0%)',
  pink4: 'hsl(320, 45.4%, 18.7%)',
  pink5: 'hsl(320, 49.0%, 21.1%)',
  pink6: 'hsl(321, 53.6%, 24.4%)',
  pink7: 'hsl(321, 61.1%, 29.7%)',
  pink8: 'hsl(322, 74.9%, 37.5%)',
  pink9: 'hsl(322, 65.0%, 54.5%)',
  pink10: 'hsl(323, 72.8%, 59.2%)',
  pink11: 'hsl(325, 90.0%, 66.4%)',
  pink12: 'hsl(322, 90.0%, 95.8%)',
}

export const base = style({
  vars: {
    [bgColor]: pinkDark.pink4,
    [bgHover]: pinkDark.pink5,
    [bgPress]: pinkDark.pink6,
  },

  appearance: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
  padding: '8px 12px',
  fontSize: 14,
  outline: 'none',
  backgroundColor: bgColor,
  color: pinkDark.pink12,
  userSelect: 'none',
  WebkitUserSelect: 'none',
  border: 'none',

  selectors: {
    '&[data-focus-visible=true]': {
      outline: '2px solid blue',
      outlineOffset: 2,
    },
    '&[data-hovered=true]': {
      backgroundColor: bgHover,
    },
    '&[data-pressed=true]': {
      backgroundColor: bgPress,
    },
  },
})
