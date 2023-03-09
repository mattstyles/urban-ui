import Link from 'next/link'
import {useRouter} from 'next/router'

import {Container} from '@urban-ui/container'
import {Screen} from '@urban-ui/screen'
import {Stack} from '@urban-ui/stack'
import {Content} from '@urban-ui/content'
import {Spacer} from '@urban-ui/spacer'
import * as Scrollable from '@urban-ui/scrollable'
import {styled} from '@urban-ui/theme'

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <Screen min>
      <Container fill='all' padding='md' orientation='h'>
        <Aside>
          <Links />
        </Aside>
        <Spacer size='lg' orientation='h' />
        <div>{children}</div>
      </Container>
    </Screen>
  )
}

type LinkType = {name: string; link: string}
const toc: Array<LinkType> = [
  {name: 'Spacer', link: '/components/spacer'},
  {name: 'Flex', link: '/components/flex'},
  {name: 'Stack', link: '/components/stack'},
  {name: 'Shadows', link: '/components/shadows'},
  {name: 'Text', link: '/components/text'},
  {name: 'Responsive', link: '/components/responsive'},
  {name: 'Scrollable', link: '/components/scrollable'},
  // {name: 'Layout examples', link: '/pages'},
]

const Aside = styled('aside', {
  width: '$tokens$aside2',
  borderRadius: '$3',
  backgroundColor: '$primary10',
})

function Links() {
  return (
    <Stack
      as='ul'
      size='md'
      css={{listStyleType: 'none', paddingInlineStart: 0, padding: '$3'}}>
      {toc.map(({name, link}) => {
        return (
          <NavLink key={name} href={link}>
            {name}
          </NavLink>
        )
      })}
    </Stack>
  )
}

const StyledLink = styled('a', {
  padding: '$2 $5',
  backgroundColor: '$transparent',
  color: '$white',
  transition: 'backgroundColor 150ms linear',
  borderRadius: '$2',
  textDecoration: 'none',

  '&:hover': {
    backgroundColor: '$whiteA8',
  },

  '&[aria-current="page"]': {
    backgroundColor: '$white',
    color: '$text',
  },
})

function NavLink({children, href}: {children: React.ReactNode; href: string}) {
  const {asPath, push} = useRouter()
  return (
    <StyledLink
      as={Link}
      aria-current={asPath === href ? 'page' : undefined}
      href={href}>
      {children}
    </StyledLink>
  )
}
