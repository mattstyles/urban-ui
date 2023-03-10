import {StitchesLogoIcon} from '@radix-ui/react-icons'
import {Flex} from '@urban-ui/flex'
import {Spacer} from '@urban-ui/spacer'
import {Container} from '@urban-ui/container'
import {Content} from '@urban-ui/content'
import {Text, H1, H2} from '@urban-ui/text'
import {Layout} from './layout'

export default function FlexPage() {
  return (
    <Container padding='md' alignment='center'>
      <Content>
        <H1>Flex</H1>
        <H2>Alignment</H2>
        <Flex alignment='center'>
          <StitchesLogoIcon />
          <Text>Center</Text>
        </Flex>
        <Spacer size='sm' />
        <Flex>
          <StitchesLogoIcon />
          <Text>Default alignment</Text>
        </Flex>
      </Content>
    </Container>
  )
}

FlexPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
