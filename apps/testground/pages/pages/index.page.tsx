import {Spacer} from '@urban-ui/spacer'
import {Container} from '@urban-ui/container'
import {Content} from '@urban-ui/content'
import {Heading, Text} from '@urban-ui/text'
import {Layout} from './layout'

export default function Page() {
  return (
    <Container alignment='center' padding='md' size='full'>
      <Content>
        <Spacer size='lg' />
        <Heading as='h1'>Page layout examples</Heading>
        <Text as='p'>Generic page layouts as components to compose</Text>
      </Content>
    </Container>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
