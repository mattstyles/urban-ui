import {
  StitchesLogoIcon,
  GitHubLogoIcon,
  FigmaLogoIcon,
  DiscordLogoIcon,
} from '@radix-ui/react-icons'
import {TextBlock, NavBlock} from 'components/lorem'
import {Flex} from '@urban-ui/flex'
import {Spacer} from '@urban-ui/spacer'
import {Stack} from '@urban-ui/stack'
import {styled} from '@urban-ui/theme'
import {ConstrainedAside} from '@urban-ui/page'

export default function Page() {
  return (
    <ConstrainedAside.Root>
      <ConstrainedAside.Header>
        <ConstrainedAside.HeaderContent>
          <ConstrainedAside.HeaderLogo>
            <StitchesLogoIcon />
          </ConstrainedAside.HeaderLogo>
          <HeaderNav>
            <div>Some header stuff</div>
            <Stack orientation='h' alignment='center'>
              <GitHubLogoIcon />
              <FigmaLogoIcon />
              <DiscordLogoIcon />
            </Stack>
          </HeaderNav>
        </ConstrainedAside.HeaderContent>
      </ConstrainedAside.Header>
      <ConstrainedAside.Aside>
        <ConstrainedAside.AsideContent>
          <h1>Some aside stuff</h1>
          <NavBlock size={45} />
        </ConstrainedAside.AsideContent>
      </ConstrainedAside.Aside>
      <ConstrainedAside.Main>
        <ConstrainedAside.Article>
          <h1>Main / Article</h1>
          <h2>Aside page layout</h2>
          <p>Page layout with a left aside panel, and a header.</p>
          <Spacer />
          <TextBlock size={10} />
        </ConstrainedAside.Article>
      </ConstrainedAside.Main>
      <ConstrainedAside.MainAside>
        <ConstrainedAside.AsideContent>
          <div>Some more aside stuff</div>
          <NavBlock size={45} />
        </ConstrainedAside.AsideContent>
      </ConstrainedAside.MainAside>
    </ConstrainedAside.Root>
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
