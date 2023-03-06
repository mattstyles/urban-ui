/**
 * Main content area with header bar and aside.
 * Page content will remain within a set page max width.
 */

import {styled} from '@urban-ui/theme'
import {Flex} from '@urban-ui/flex'

export const Root = styled(Flex, {
  minHeight: '100vh',

  defaultVariants: {
    orientation: 'h',
  },
})

export const Header = styled('header', {
  display: 'flex',
  position: 'relative',
  width: '100vw',
  height: '$tokens$header2',
  // @TODO use zIndex scale
  zIndex: '10000',

  variants: {
    fixed: {
      true: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
      },
    },
  },
})

export const HeaderContent = styled(Flex, {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',

  '@md+': {
    maxWidth: '$tokens$page1',
  },

  defaultVariants: {
    alignment: 'center',
  },
})

export const HeaderLogo = styled(Flex, {
  width: 'auto',
  paddingLeft: '$3',
  paddingRight: '$3',

  '@lg+': {
    width: '$tokens$aside2',
  },

  defaultVariants: {
    alignment: 'center',
  },
})

export const Aside = styled(Flex, {
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  paddingTop: '$tokens$header2',
  minWidth: '$tokens$aside2',
  height: '100vh',
  overflowY: 'scroll',
  display: 'none',

  '@lg+': {
    height: '100vh',
    width: 'calc( (100vw - $tokens$page1) / 2 + $tokens$aside2 )',
    paddingLeft: 'calc((100vw - $tokens$page1) / 2)',
    display: 'block',
  },

  defaultVariants: {
    orientation: 'v',
  },
})

export const Main = styled(Flex, {
  width: '100%',

  '@max': {
    width:
      'calc(((100vw - $tokens$page1) / 2) - $tokens$aside2 + $tokens$page1)',
    paddingRight: 'calc((100vw - $tokens$page1) / 2)',
  },

  defaultVariants: {
    orientation: 'h',
    size: 'full',
  },
})

export const Article = styled('article', {
  paddingLeft: '$3',
  paddingRight: '$3',
  paddingTop: '$tokens$header2',
  marginLeft: 0,
  flex: 1,
  maxWidth: '$tokens$content3',
  width: '100%',

  '@max': {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

export const MainAside = styled(Flex, {
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  paddingTop: '$tokens$header2',
  minWidth: '$tokens$aside2',
  height: '100vh',
  overflowY: 'scroll',
  display: 'none',

  '@max': {
    display: 'block',
  },

  defaultVariants: {
    orientation: 'v',
  },
})
