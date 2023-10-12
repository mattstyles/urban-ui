import {LoremIpsum} from 'lorem-ipsum'
import {Flex} from '@urban-ui/flex'
import {Text} from '@urban-ui/text'
import {atoms} from '@urban-ui/theme/atoms'
import {Panel} from '@urban-ui/panel'
import {Spacer} from '@urban-ui/spacer'

const lorem = new LoremIpsum()

export default function PanelExamplesPage() {
  return (
    <Flex orientation='v' gap='xl' className={atoms({p: 'xl'})}>
      <Text size='xl' weight='light' kerning='sm'>
        Examples of panels
      </Text>
      <Spacer gap='md' />
      <Panel.Root padding='lg' width='md' bg='app' prominence='muted'>
        <Panel.Header>
          <Text>Panel with header</Text>
        </Panel.Header>
        <Panel.Content>
          <Text asChild>
            <p>
              <Text
                font='mono'
                asChild
                className={atoms({display: 'inline-block'})}>
                <code>Panel.header</code>
              </Text>{' '}
              component sets the text size and weight.
            </p>
          </Text>
          <Text asChild>
            <p>{lorem.generateWords(25)}</p>
          </Text>
        </Panel.Content>
      </Panel.Root>
    </Flex>
  )
}
