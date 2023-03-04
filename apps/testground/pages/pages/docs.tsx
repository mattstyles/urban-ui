import {TextBlock, NavBlock} from 'components/lorem'
import {StitchesLogoIcon, HamburgerMenuIcon} from '@radix-ui/react-icons'
import {DocsFull} from '@urban-ui/page'
import {Spacer} from '@urban-ui/spacer'
import {Stack} from '@urban-ui/stack'
import {Flex} from '@urban-ui/flex'
import {styled} from '@urban-ui/theme'

// @TODO sort out sidebar scroll
// @TODO sort out Stack size param to sm, md, lg

export default function Page() {
  return (
    <DocsFull.Root>
      <DocsFull.Aside css={{backgroundColor: 'hotpink'}}>
        <NavTop />
        <NavContainer>
          <NavBlock size={45} />
        </NavContainer>
      </DocsFull.Aside>
      <DocsFull.Main css={{backgroundColor: 'cornsilk'}}>
        <DocsFull.Article>
          <h1>Main / Article</h1>
          <TextBlock size={10} />
        </DocsFull.Article>
      </DocsFull.Main>
      <DocsFull.Additional css={{backgroundColor: 'rebeccapurple'}}>
        Some additional content
      </DocsFull.Additional>
    </DocsFull.Root>
  )
}

const NavContainer = styled('div', {
  display: 'block',
  overflowY: 'scroll',
  height: 'auto',

  '@sm': {
    display: 'none',
  },
})

function NavTop() {
  return (
    <Flex orientation={{'@initial': 'h', '@md+': 'v'}}>
      <StyledMenuButton onClick={() => alert('Menu button example')}>
        <HamburgerMenuIcon />
      </StyledMenuButton>
      <Flex orientation='v'>
        <Spacer size={{'@initial': 'sm', '@md+': 'lg'}} />
        <Stack orientation='h' size='medium' alignment='center'>
          <StitchesLogoIcon />
          <span>Urban UI</span>
        </Stack>
        <p>Built with Stitches</p>
        <Spacer size={{'@initial': 'sm', '@md+': 'lg'}} />
      </Flex>
    </Flex>
  )
}

const StyledMenuButton = styled('button', {
  display: 'block',
  margin: '$4',
  padding: '$3',

  '@md+': {
    display: 'none',
  },
})
