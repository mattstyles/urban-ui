// We are using ranged queries for handling screen widths.
// These are not supported everywhere, safari being the most notable problem https://caniuse.com/css-media-range-syntax. Having said that, works fine for me on 16.2 which is apparently unsupported???
// We need ranged queries due to how stitches currently generates CSS, without a range we could get specificity problems where multiple breakpoints apply.
// See https://github.com/stitchesjs/stitches/issues/885, https://github.com/stitchesjs/stitches/issues/725, and others.
export const media = {
  // sm: '(max-width: 40em)',
  // md: '(max-width: 52em)',
  // lg: '(max-width: 64em)',
  sm: '(width < 40em)',
  md: '(40em <= width < 52em)',
  lg: '(52em <= width)',
  motion: '(prefers-reduced-motion)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
}
