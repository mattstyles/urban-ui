/*
  
*/

export const reset = {
  /**
   * Josh's Custom CSS Reset
   * https://www.joshwcomeau.com/css/custom-css-reset/
   */
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
  '*': {
    margin: 0,
  },
  'html, body': {
    height: '100%',
  },
  body: {
    lineHeight: 1.5,
    '-webkit-font-smoothing': 'antialiased',
  },
  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },
  'input, button, textarea, select': {
    font: 'inherit',
  },
  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word',
  },
  '.js-root, #root, #__next': {
    isolation: 'isolate',
  },

  /**
   * Eric Bailey, CSS Tricks
   * https://css-tricks.com/revisiting-prefers-reduced-motion/
   */
  '@media screen and (prefers-reduced-motion: reduce), (update: slow)': {
    '*': {
      animationDuration: '0.001ms !important',
      animationIterationCount:
        '1 !important' /* Hat tip Nick/cssremedy (https://css-tricks.com/revisiting-prefers-reduced-motion-the-reduced-motion-media-query/#comment-1700170) */,
      transitionDuration: '0.001ms !important',
    },
  },
}
