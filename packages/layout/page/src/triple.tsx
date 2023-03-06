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
    gridTemplateColumns: '12em auto',
  },
  '@lg': {
    gridTemplateColumns: '20em auto',
  },

  '@max': {
    gridTemplateColumns: '20em auto 20em',
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
  maxWidth: '56em',

  '@max': {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

export const Additional = styled('aside', {
  display: 'none',

  '@max': {
    display: 'block',
  },
})
