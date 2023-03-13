import {Spacer} from '@urban-ui/spacer'
import {Container} from '@urban-ui/container'
import {Content} from '@urban-ui/content'
import {Heading} from '@urban-ui/text'
import {Layout} from './layout'

export default function Page() {
  return (
    <Container alignment='center' padding='md' size='full'>
      <Content>
        <Spacer size='lg' />
        <Heading>Components</Heading>
        <div>stuff</div>
      </Content>
    </Container>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
