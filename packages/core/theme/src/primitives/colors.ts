// The base nature of a theme, denoted by how light or dark the typical colour range is, defines how alpha transparency should affect colours those components are laid over.
// For example, lightening a very dark shade is a way to add some contrast to a change, but lightening a very light shade is usually invisible. In this case, typically a component will want to darken the light shade and lighten a dark shade. This operation is an 'accent' of the overlaid colour. The reverse operation we call a deepening as it is moving deeper within the lightness shade i.e. _towards_ a lighter shade or _towards_ a darker shade.

// @radix-ui/colors/white-alpha
// lighten
export const accent = {
  0: 'hsla(0, 0%, 100%, 0)',
  50: 'hsla(0, 0%, 100%, 0.013)',
  75: 'hsla(0, 0%, 100%, 0.034)',
  100: 'hsla(0, 0%, 100%, 0.056)',
  200: 'hsla(0, 0%, 100%, 0.086)',
  300: 'hsla(0, 0%, 100%, 0.124)',
  400: 'hsla(0, 0%, 100%, 0.176)',
  500: 'hsla(0, 0%, 100%, 0.249)',
  600: 'hsla(0, 0%, 100%, 0.386)',
  700: 'hsla(0, 0%, 100%, 0.446)',
  800: 'hsla(0, 0%, 100%, 0.592)',
  900: 'hsla(0, 0%, 100%, 0.923)',
}

// @radix-ui/colors/black-alpha
// darken
export const deepen = {
  0: 'hsla(0, 0%, 0%, 0.012)',
  50: 'hsla(0, 0%, 0%, 0.027)',
  75: 'hsla(0, 0%, 0%, 0.047)',
  100: 'hsla(0, 0%, 0%, 0.071)',
  200: 'hsla(0, 0%, 0%, 0.090)',
  300: 'hsla(0, 0%, 0%, 0.114)',
  400: 'hsla(0, 0%, 0%, 0.141)',
  500: 'hsla(0, 0%, 0%, 0.220)',
  600: 'hsla(0, 0%, 0%, 0.439)',
  700: 'hsla(0, 0%, 0%, 0.478)',
  800: 'hsla(0, 0%, 0%, 0.565)',
  900: 'hsla(0, 0%, 0%, 0.910)',
}
