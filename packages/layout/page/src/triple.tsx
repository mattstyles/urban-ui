/**
 * Full page layout.
 * Triple layout on large screens -> sidebar, main, additional (supplementary)
 * Dual layout on medium screens -> sidebar, main
 * Stacked on small screens -> sidebar then main
 *
 * Sidebar must be responsive to contain horizontal and vertical alignment variants.
 */

import {styled} from '@urban-ui/theme'
import {Flex} from '@urban-ui/flex'

export const Root = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto',

  '@md': {
    gridTemplateColumns: '$tokens$aside1 auto',
  },
  '@lg': {
    gridTemplateColumns: '$tokens$aside3 auto',
  },

  '@max': {
    gridTemplateColumns: '$tokens$aside3 auto $tokens$aside3',
  },
})

export const Aside = styled(Flex, {
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,

  '@md+': {
    height: '100vh',
  },

  defaultVariants: {
    orientation: 'v',
  },
})

export const Main = styled('main', {})
export const Article = styled('article', {
  padding: '$3 $5',
  marginLeft: 0,
  maxWidth: '$tokens$content3',

  '@max': {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

export const Additional = styled(Flex, {
  display: 'none',

  '@max': {
    display: 'flex',
    position: 'sticky',
    height: '100vh',
    top: 0,
    left: 0,
    right: 0,
  },

  defaultVariants: {
    orientation: 'v',
  },
})
