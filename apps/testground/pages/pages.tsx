import Link from 'next/link'
import {useMemo} from 'react'

import {Spacer} from '@urban-ui/spacer'
import {Container} from '@urban-ui/container'
import {Content} from '@urban-ui/content'
import {Anchor, Text, Heading} from '@urban-ui/text'
import {Stack} from '@urban-ui/stack'

export default function Pages() {
  return (
    <Container padding='lg' alignment='center'>
      <Content>
        <Stack>
          <Heading as='h1'>Page layout examples</Heading>
          <Text as='p'>Generic page layouts as components to compose</Text>
        </Stack>
        <Spacer />
        <TOC links={toc} />
      </Content>
    </Container>
  )
}

type LinkType = {name: string; link: string}
const toc: Array<LinkType> = [
  {name: 'Triple', link: '/pages/triple'},
  {name: 'Aside', link: '/pages/aside'},
  {name: 'Constrained Aside', link: '/pages/constrainedAside'},
  {name: 'Single - Full Bleed', link: '/pages/singleFullbleed'},
]
function TOC({links}: {links: Array<LinkType>}) {
  const content = useMemo(() => {
    return links.map((link) => {
      return (
        <Text key={link.name} as='li'>
          <Anchor as={Link} href={link.link}>
            {link.name}
          </Anchor>
        </Text>
      )
    })
  }, [links])

  return (
    <Stack as='ul' css={{listStyleType: 'none', padding: 0}}>
      {content}
    </Stack>
  )
}
