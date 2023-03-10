import {Spacer} from '@urban-ui/spacer'
import {Content} from '@urban-ui/content'
import {Heading} from '@urban-ui/text'
import {Layout} from './layout'

export default function Page() {
  return (
    <Content>
      <Spacer size='lg' />
      <Heading>Components</Heading>
      <div>stuff</div>
    </Content>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
