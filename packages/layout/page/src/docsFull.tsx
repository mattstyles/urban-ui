/**
 * Full page layout.
 * Triple layout on large screens -> sidebar, main, additional (supplementary)
 * Dual layout on medium screens -> sidebar, main
 * Stacked on small screens -> sidebar then main
 *
 * Sidebar must be responsive to contain horizontal and vertical alignment variants.
 */

import {styled} from '@urban-ui/theme'

export const Root = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto',

  '@md': {
    gridTemplateColumns: '20em auto',
  },
  '@lg': {
    gridTemplateColumns: '20em auto',
  },

  '@max': {
    gridTemplateColumns: '20em auto 20em',
  },
})

export const Aside = styled('aside', {
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  height: '100vh',
})

export const Main = styled('main', {})
export const Article = styled('article', {
  padding: '$3 $5',
})

export const Additional = styled('aside', {
  display: 'none',

  '@max': {
    display: 'block',
  },
})

// We could use grid here with a named template and expect that children contain a grid-template-name on them so that they can be arranged by this layout component?
// Or, add each slot as a prop on the layout component.
// The alternative is to expose each part of the layout and let the consumer dump them in.
// Which is best for slot-based layout component? We should probably follow the same principle for other slot-based layout components (and document it, alongside common style props such as orientation, sm, md, lg, etc etc)
// Given that we style a lot of radix-ui components, and they use the third method, it probably makes sense to go that way. It's more flexible and will allow more complex layouts to emerge.
