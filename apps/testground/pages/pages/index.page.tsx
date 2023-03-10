import {Spacer} from '@urban-ui/spacer'
import {Content} from '@urban-ui/content'
import {Heading, Text} from '@urban-ui/text'
import {Layout} from './layout'

export default function Page() {
  return (
    <Content>
      <Spacer size='lg' />
      <Heading as='h1'>Page layout examples</Heading>
      <Text as='p'>Generic page layouts as components to compose</Text>
    </Content>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
