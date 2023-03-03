// We are using ranged queries for handling screen widths.
// These are not supported everywhere, safari being the most notable problem https://caniuse.com/css-media-range-syntax. Having said that, works fine for me on 16.2 which is apparently unsupported??? Ooooh, stitches converts it, nice.
// We need ranged queries due to how stitches currently generates CSS, without a range we could get specificity problems where multiple breakpoints apply.
// See https://github.com/stitchesjs/stitches/issues/885, https://github.com/stitchesjs/stitches/issues/725, and others.
// Not that range queries do not 'stack', i.e. medium only refers to the medium range and does not include the small variant.
export const media = {
  // Breakpoints
  sm: '(width < 40em)',
  md: '(40em <= width < 52em)',
  lg: '(52em <= width)',

  // Specific breakpoints, need to be careful with these, they should probably *not* be specified alongside the regular breakpoints
  max: '(96em <= width)',
  'md+': '(40em <= width)',

  // Additional media queries
  motion: '(prefers-reduced-motion)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
}
