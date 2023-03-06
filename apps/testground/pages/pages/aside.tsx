import {TextBlock, NavBlock} from 'components/lorem'
import {
  StitchesLogoIcon,
  GitHubLogoIcon,
  FigmaLogoIcon,
  DiscordLogoIcon,
} from '@radix-ui/react-icons'
import {Aside} from '@urban-ui/page'
import {Spacer} from '@urban-ui/spacer'
import {Stack} from '@urban-ui/stack'
import {Flex} from '@urban-ui/flex'
import {styled} from '@urban-ui/theme'

export default function Page() {
  return (
    <Aside.Root>
      <Aside.Header fixed css={{backgroundColor: 'aquamarine'}}>
        <Aside.HeaderContent>
          <Aside.HeaderLogo>
            <StitchesLogoIcon />
          </Aside.HeaderLogo>
          <HeaderNav>
            <div>Some header stuff</div>
            <Stack orientation='h' alignment='center'>
              <GitHubLogoIcon />
              <FigmaLogoIcon />
              <DiscordLogoIcon />
            </Stack>
          </HeaderNav>
        </Aside.HeaderContent>
      </Aside.Header>
      <Aside.Aside css={{backgroundColor: 'hotpink'}}>
        <h1>Some aside stuff</h1>
        <NavBlock size={45} />
      </Aside.Aside>
      <Aside.Main css={{backgroundColor: 'cornsilk'}}>
        <Aside.Article>
          <h1>Main / Article</h1>
          <h2>Aside page layout</h2>
          <p>Page layout with a left aside panel, and a header.</p>
          <Spacer />
          <TextBlock size={10} />
        </Aside.Article>
        <Aside.MainAside css={{backgroundColor: 'hsla(0, 0%, 0%, 0.3)'}}>
          <div>Some more aside stuff</div>
          <NavBlock size={45} />
        </Aside.MainAside>
      </Aside.Main>
    </Aside.Root>
  )
}

const HeaderNav = styled(Flex, {
  padding: '$3',
  paddingRight: '$6',
  defaultVariants: {
    justify: 'spread',
    size: 'full',
  },
})
