import {TextBlock, NavBlock} from 'components/lorem'
import {StitchesLogoIcon, HamburgerMenuIcon} from '@radix-ui/react-icons'
import {Triple} from '@urban-ui/page'
import {Spacer} from '@urban-ui/spacer'
import {Stack} from '@urban-ui/stack'
import {Flex} from '@urban-ui/flex'
import {styled} from '@urban-ui/theme'

export default function Page() {
  return (
    <Triple.Root>
      <Triple.Aside css={{backgroundColor: 'hotpink'}}>
        <NavTop />
        <NavContainer>
          <NavBlock size={45} />
        </NavContainer>
      </Triple.Aside>
      <Triple.Main css={{backgroundColor: 'cornsilk'}}>
        <Triple.Article>
          <h1>Main / Article</h1>
          <p>Change the screen size.</p>
          <p>
            Triple will be a three column layout on very wide screens and a two
            column on smaller.
          </p>
          <p>
            The final (third) column should contain additional content that is
            not crucial to the page as it will disappear on smaller screens. If
            it is useful content then consider placing it in the menu somehow.
          </p>
          <Spacer />
          <TextBlock size={10} />
        </Triple.Article>
      </Triple.Main>
      <Triple.Additional css={{backgroundColor: 'rebeccapurple'}}>
        <NavContainer>
          <NavBlock size={45} />
        </NavContainer>
      </Triple.Additional>
    </Triple.Root>
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
        <Stack orientation='h' gap='md' alignment='center'>
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
