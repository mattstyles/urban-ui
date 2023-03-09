import type {NavType} from 'components/navigation'

import {Container} from '@urban-ui/container'
import {Spacer} from '@urban-ui/spacer'
import {Text, Heading} from '@urban-ui/text'
import {Content} from '@urban-ui/content'

import {Layout} from 'components/layoutPrimary'

const nav: NavType = [
  {
    title: '',
    block: [
      {name: 'Components', link: '/components'},
      {name: 'Layout examples', link: '/pages'},
    ],
  },
]

export default function Testground() {
  return (
    <Layout nav={nav}>
      <Container alignment='center' padding='md' size='full'>
        <Content>
          <Spacer size='lg' />
          <Heading as='h1'>Testground</Heading>
          <Text as='p'>Dev environment for developing components</Text>
        </Content>
      </Container>
    </Layout>
  )
}
