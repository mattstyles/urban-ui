import {Content} from '@urban-ui/content'
import {H1, P} from '@urban-ui/text'
import {Spacer, Container} from '@urban-ui/layout'
import {Layout} from './layout'

export default function Page() {
  return (
    <Container alignment='center' padding='md' size='full'>
      <Content>
        <Spacer size='lg' />
        <H1>Scratch</H1>
        <P>Example pages to help with development</P>
      </Content>
    </Container>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
