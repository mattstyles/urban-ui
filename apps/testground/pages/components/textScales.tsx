import {Spacer} from '@urban-ui/spacer'
import {Stack} from '@urban-ui/stack'
import {Container} from '@urban-ui/container'
import {Content} from '@urban-ui/content'
import {Text, Heading} from '@urban-ui/text'

import {Layout} from './layout'

const textSizes = ['xs', 'sm', 'md', 'lg', 'xl']
const headingTypes = ['h1', 'h2', 'h3']

export default function Page() {
  return (
    <Container size='full' alignment='center' padding='md'>
      <Content>
        <Stack gap='lg'>
          <Stack gap='md'>
            <Heading>Text sizes</Heading>
            {textSizes.map((size) => {
              return (
                <Text key={size} size={size}>
                  {size}
                </Text>
              )
            })}
            <Spacer size='sm' />
            <Text>
              The following scale rises because it is aligned to bottom and the
              line-heights differ.
            </Text>
            <Stack orientation='h' gap='sm' alignment='end'>
              {textSizes.map((size) => {
                return (
                  <Text key={size} size={size}>
                    {size}
                  </Text>
                )
              })}
            </Stack>
            <Spacer size='sm' />
            <Text>
              The following scale aligns to the baseline which makes it a little
              easier to discern font size differences.
            </Text>
            <Stack orientation='h' gap='sm' alignment='baseline'>
              {textSizes.map((size) => {
                return (
                  <Text key={size} size={size}>
                    {size}
                  </Text>
                )
              })}
            </Stack>
          </Stack>
          <Stack gap='md'>
            <Heading>Heading types</Heading>
            {headingTypes.map((type) => {
              return (
                <Heading key={type} type={type}>
                  {type}
                </Heading>
              )
            })}
            <Stack orientation='h' gap='sm' alignment='end'>
              {headingTypes.map((type) => {
                return (
                  <Heading key={type} type={type}>
                    {type}
                  </Heading>
                )
              })}
            </Stack>
          </Stack>
        </Stack>
      </Content>
    </Container>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
