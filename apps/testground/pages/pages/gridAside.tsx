import {TextBlock, NavBlock} from 'components/lorem'
import {Flex} from '@urban-ui/flex'
import {Spacer} from '@urban-ui/spacer'
import {styled} from '@urban-ui/theme'

export default function Page() {
  return (
    <Root>
      <Header></Header>
      <Aside>
        <AsideContent>
          <h1>Some aside stuff</h1>
          <NavBlock size={45} />
        </AsideContent>
      </Aside>
      <Main>
        <Article>
          <h1>Main / Article</h1>
          <h2>Aside page layout</h2>
          <p>Page layout with a left aside panel, and a header.</p>
          <Spacer />
          <TextBlock size={10} />
        </Article>
      </Main>
      <MainAside>
        <MainAsideContent>
          <div>Some more aside stuff</div>
          <NavBlock size={45} />
        </MainAsideContent>
      </MainAside>
    </Root>
  )
}

const Root = styled('div', {
  display: 'grid',
  gridTemplateAreas: '"hd" "main"',
  gridTemplateRows: '64px 1fr',
  gridTemplateColumns: '100%',
  minHeight: '100vh',

  '@md+': {
    gridTemplateAreas: '"hd hd" "as main"',
    gridTemplateRows: '64px 1fr',
    gridTemplateColumns: '272px 1fr',
  },
  '@max': {
    gridTemplateAreas: '"hd hd hd hd hd" "as as main mas mas"',
    gridTemplateRows: '64px 1fr',
    gridTemplateColumns: '1fr 272px 896px 272px 1fr',
  },
})

// If the header is sticky then the asides need some padding to account for it (or top)
const Header = styled('header', {
  position: 'sticky',
  top: 0,
  width: '100vw',
  gridArea: 'hd',
  backgroundColor: 'aquamarine',
})

const Aside = styled('aside', {
  gridArea: 'as',
  display: 'none',
  alignItems: 'flex-end',
  flexDirection: 'column',
  backgroundColor: 'hotpink',

  '@md+': {
    display: 'flex',
  },
})
const AsideContent = styled('div', {
  position: 'sticky',
  top: 64, // 0 if header is position block, but 64 (headerheight) if position sticky and adjust height
  width: '272px',
  backgroundColor: 'hsla(0, 0%, 0%, 0.1)',
  height: 'calc(100vh - 64px)',
  // height: '100vh',
  overflowY: 'scroll',
})

const Main = styled('main', {
  gridArea: 'main',
  backgroundColor: 'cornsilk',
})
const Article = styled('article', {
  margin: '0 auto',
  width: '100%',
  maxWidth: '688px',
})

const MainAside = styled('aside', {
  gridArea: 'mas',
  backgroundColor: 'cornsilk',
  display: 'none',

  '@max': {
    display: 'block',
  },
})
const MainAsideContent = styled('div', {
  position: 'sticky',
  top: 64, // 0 if header is position block, but 64 (headerheight) if position sticky
  width: '272px',
  backgroundColor: 'hsla(0, 0%, 0%, 0.1)',
  height: 'calc(100vh - 64px)',
  // height: '100vh',
  overflowY: 'scroll',
})
