import {Container, Spacer} from '@urban-ui/layout'
import {Content} from '@urban-ui/content'
import {H2, P} from '@urban-ui/text'
import {Layout} from './layout'

export default function Page() {
  return (
    <Container alignment='center' padding='md' size='full'>
      <Content>
        <Spacer gap='lg' />
        <H2>Content</H2>
        <P>Components related to page/feature content</P>
      </Content>
    </Container>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
