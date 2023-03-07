import {blackA} from '@radix-ui/colors'

export const shadows = {
  // Standard scale
  // These are fairly subtle, and the differences between them are also subtle
  0: '0px 0px transparent',
  1: `0 1px 2px 0 ${blackA.blackA2}, 0 2px 3px -1px ${blackA.blackA2}`,
  2: `0 2px 4px 0px ${blackA.blackA2}, 0 4px 6px -1px ${blackA.blackA2}, 0 12px 16px 0px ${blackA.blackA1}`,
  3: `0 4px 8px -1px ${blackA.blackA2}, 0 12px 20px 0px ${blackA.blackA2}`,
  4: `0 8px 12px -1px ${blackA.blackA2}, 0 16px 24px -1px ${blackA.blackA1}, 0 20px 28px 0px ${blackA.blackA1}`,
  5: `0 16px 24px -1px ${blackA.blackA2}, 0 20px 28px 0px ${blackA.blackA1}`,

  // Comeau scale - created using [Josh Comeau's Shadow Palette Generator](https://www.joshwcomeau.com/shadow-palette/)
  // Low, medium, high makes more sense but we will stick to the library convention of sm, md, lg for consistency
  none: '$0',
  sm: `0px 0.6px 0.6px ${blackA.blackA6},
  0px 0.9px 0.9px -1.6px ${blackA.blackA5},
  0.1px 2.1px 2.2px -3.1px ${blackA.blackA4}`,
  md: `0px 0.6px 0.6px ${blackA.blackA6},
  0px 1.5px 1.5px -1px ${blackA.blackA6},
  0.1px 4.1px 4.2px -2.1px ${blackA.blackA5},
  0.3px 10.5px 10.8px -3.1px ${blackA.blackA4}`,
  lg: `0px 0.6px 0.6px ${blackA.blackA6},
  0.1px 2.3px 2.4px -0.4px ${blackA.blackA6},
  0.1px 4.3px 4.4px -0.9px ${blackA.blackA5},
  0.2px 7.4px 7.6px -1.3px ${blackA.blackA5},
  0.3px 12.5px 12.8px -1.8px ${blackA.blackA4},
  0.5px 20.3px 20.9px -2.2px ${blackA.blackA4},
  0.8px 31.7px 32.6px -2.7px ${blackA.blackA3},
  1.2px 47.4px 48.7px -3.1px ${blackA.blackA3}`,
}

// const blackA = {
//   blackA1: 'hsla(0, 0%, 0%, 0.012)',
//   blackA2: 'hsla(0, 0%, 0%, 0.027)',
//   blackA3: 'hsla(0, 0%, 0%, 0.047)',
//   blackA4: 'hsla(0, 0%, 0%, 0.071)',
//   blackA5: 'hsla(0, 0%, 0%, 0.090)',
//   blackA6: 'hsla(0, 0%, 0%, 0.114)',
//   blackA7: 'hsla(0, 0%, 0%, 0.141)',
//   blackA8: 'hsla(0, 0%, 0%, 0.220)',
//   blackA9: 'hsla(0, 0%, 0%, 0.439)',
//   blackA10: 'hsla(0, 0%, 0%, 0.478)',
//   blackA11: 'hsla(0, 0%, 0%, 0.565)',
//   blackA12: 'hsla(0, 0%, 0%, 0.910)',
// }
