import Link from 'next/link'
import {useMemo} from 'react'

import {Spacer} from '@urban-ui/spacer'
import {Container} from '@urban-ui/container'
import {Content} from '@urban-ui/content'
import {Anchor, Text, Heading} from '@urban-ui/text'
import {Stack} from '@urban-ui/stack'

export default function Docs() {
  return (
    <Container padding='lg' alignment='center'>
      <Content>
        <Stack>
          <Heading as='h1'>Testground</Heading>
          <Text as='p'>Dev environment for developing components</Text>
        </Stack>
        <Spacer />
        <TOC links={toc} />
      </Content>
    </Container>
  )
}

type LinkType = {name: string; link: string}
const toc: Array<LinkType> = [
  {name: 'Spacer', link: '/spacer'},
  {name: 'Flex', link: '/flex'},
  {name: 'Stack', link: '/stack'},
  {name: 'Shadows', link: '/shadows'},
  {name: 'Text', link: '/text'},
  {name: 'Layout examples', link: '/pages'},
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
