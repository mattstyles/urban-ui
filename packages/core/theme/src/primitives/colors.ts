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

export const core = {
  transparent: 'transparent',
  current: 'currentcolor',
  currentcolor: 'currentcolor',
  disabled: {
    fg: 'hsl(0, 0%, 42%)',
    bg: 'hsl(0, 0%, 76%)',
  },
  focus: 'hsl(0, 0%, 0%)',
}

export const coreApp = {
  bg: {
    muted: 'hsl(0, 0%, 100%)',
    base: 'hsl(0, 0%, 96%)',
    subtle: 'hsl(0, 0%, 91%)',
    emphasis: 'hsl(0, 0%, 82%)',
  },
  fg: {
    base: {
      hi: 'hsl(0, 0%, 23%)',
      lo: 'hsl(0, 0%, 38%)',
    },
    invert: {
      hi: 'hsl(0, 0%, 100%)',
      lo: 'hsl(0, 0%, 72%)',
    },
  },
}

export const tones = {
  primary: {
    fg: {
      invert: {
        hi: 'hsl(300, 82%, 96%)',
        lo: 'hsl(310, 72%, 69%)',
      },
      base: {hi: 'hsl(320, 70%, 42%)', lo: 'hsl(323, 75%, 55%)'},
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
      strong: {
        base: 'hsl(322, 65.0%, 54.5%)',
        hover: 'hsl(322, 63.9%, 50.7%)',
        press: 'hsl(323, 61.9%, 46.7%)',
        selected: 'hsl(321, 60.9%, 42.7%)',
      },
    },
    border: {
      muted: 'hsl(323, 70.6%, 90.6%)',
      base: 'hsl(323, 66.3%, 86.6%)',
      subtle: 'hsl(323, 62.0%, 80.1%)',
      emphasis: 'hsl(323, 60.3%, 72.4%)',
    },
  },
}
