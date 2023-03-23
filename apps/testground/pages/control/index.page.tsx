import {Spacer} from '@urban-ui/spacer'
import {Container} from '@urban-ui/container'
import {Content} from '@urban-ui/content'
import {H1, P} from '@urban-ui/text'
import {Layout} from './layout'

export default function Page() {
  return (
    <Container alignment='center' padding='md' size='full'>
      <Content>
        <Spacer gap='lg' />
        <H1>Control</H1>
        <P>
          Control elements are interactive elements such as button, select, and
          checkbox.
        </P>
      </Content>
    </Container>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
