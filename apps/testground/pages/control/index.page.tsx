import {Spacer} from '@urban-ui/spacer'
import {Content} from '@urban-ui/content'
import {H1, P} from '@urban-ui/text'
import {Layout} from './layout'

export default function Page() {
  return (
    <Content>
      <Spacer size='lg' />
      <H1>Control</H1>
      <P>
        Control elements are interactive elements such as button, select, and
        checkbox.
      </P>
    </Content>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
