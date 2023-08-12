/**
 * Josh's Custom CSS Reset
 * https://www.joshwcomeau.com/css/custom-css-reset/
 */

import {globalStyle} from '@vanilla-extract/css'

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
})

globalStyle('*', {
  margin: 0,
})

globalStyle('html, body', {
  height: '100vh',
})

globalStyle('body', {
  lineHeight: 1.5,
  WebkitFontSmoothing: 'antialiased',
})

globalStyle('img, picture, video, canvas, svg', {
  display: 'block',
  maxWidth: '100%',
})

globalStyle('input, button, textarea, select', {
  font: 'inherit',
})

globalStyle('p, h1, h2, h3, h4, h5, h6', {
  overflowWrap: 'break-word',
})

globalStyle('.js-root, #root, #__next', {
  isolation: 'isolate',
})

/**
 * Eric Bailey, CSS Tricks
 * https://css-tricks.com/revisiting-prefers-reduced-motion/
 */
globalStyle('*', {
  '@media': {
    'screen and (prefers-reduced-motion: reduce), (update: slow)': {
      animationDuration: '0.001ms !important',
      animationIterationCount:
        '1 !important' /* Hat tip Nick/cssremedy (https://css-tricks.com/revisiting-prefers-reduced-motion-the-reduced-motion-media-query/#comment-1700170) */,
      transitionDuration: '0.001ms !important',
    },
  },
})
