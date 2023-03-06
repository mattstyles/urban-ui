import {styled} from '@urban-ui/theme'
import {Flex} from '@urban-ui/flex'

export const Root = styled('div', {
  display: 'grid',
  gridTemplateAreas: '"hd" "main"',
  gridTemplateRows: '$tokens$header2 1fr',
  gridTemplateColumns: '100%',
  minHeight: '100vh',

  '@lg+': {
    gridTemplateAreas: '"hd hd" "as main"',
    gridTemplateRows: '$tokens$header2 1fr',
    gridTemplateColumns: '$tokens$aside2 1fr',
  },
  '@max': {
    gridTemplateAreas: '"hd hd hd hd hd" "as as main mas mas"',
    gridTemplateRows: '$tokens$header2 1fr',
    gridTemplateColumns:
      '1fr $tokens$aside2 minmax($tokens$content3, 4fr) $tokens$aside2 1fr',
  },
})

// If the header is not sticky then asides need to change their top to 0 and height to 100vh
export const Header = styled('header', {
  display: 'flex',
  position: 'sticky',
  top: 0,
  width: '100vw',
  gridArea: 'hd',
})

export const HeaderContent = styled(Flex, {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',

  '@md+': {
    maxWidth: 'calc(($tokens$aside2 * 2) + $tokens$content3)',
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

export const Aside = styled('aside', {
  gridArea: 'as',
  display: 'none',
  alignItems: 'flex-end',
  flexDirection: 'column',

  '@lg+': {
    display: 'flex',
  },
})
export const AsideContent = styled('div', {
  position: 'sticky',
  top: '$tokens$header2', // 0 if header is position block, but 64 (headerheight) if position sticky and adjust height
  width: '$tokens$aside2',
  height: 'calc(100vh - $tokens$header2)',
  // height: '100vh',
  overflowY: 'scroll',
})

export const Main = styled('main', {
  gridArea: 'main',
  padding: '0 $7',
})
export const Article = styled('article', {
  margin: '0 auto',
  width: '100%',
  maxWidth: '$tokens$content2',
})

export const MainAside = styled('aside', {
  gridArea: 'mas',
  display: 'none',

  '@max': {
    display: 'block',
  },
})
