import type {NavType} from 'components/navigation'

import {Spacer} from '@urban-ui/spacer'
import {Flex} from '@urban-ui/flex'
import {Text, Heading} from '@urban-ui/text'
import {Stack} from '@urban-ui/stack'

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
      <Flex orientation='v'>
        <Spacer size='lg' />
        <Stack>
          <Heading as='h1'>Testground</Heading>
          <Text as='p'>Dev environment for developing components</Text>
        </Stack>
      </Flex>
    </Layout>
  )
}
