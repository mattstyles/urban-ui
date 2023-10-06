import {Flex} from '@urban-ui/flex'
import {Text} from '@urban-ui/text'
import {SearchIcon, CriticalIcon} from '@urban-ui/icons'
import {atoms} from '@urban-ui/theme/atoms'
import {Panel} from '@urban-ui/panel'

export default function ColorPage() {
  return (
    <Flex orientation='v' gap='md' className={atoms({p: 'md'})}>
      <Panel.Root bg='element' prominence='base' tone='primary'>
        <Panel.Content>
          <Flex alignment='center' gap='sm'>
            <SearchIcon size='xl' />
            <Text>Text within a panel</Text>
          </Flex>
        </Panel.Content>
      </Panel.Root>
      <Panel.Root
        padding='lg'
        bg='element'
        prominence='subtle'
        tone='critical'
        fg='invert'>
        <Panel.Content>
          <Flex alignment='center' gap='sm'>
            <SearchIcon size='xl' />
            <Text>Text within a panel</Text>
          </Flex>
        </Panel.Content>
      </Panel.Root>
      <Panel.Root
        bg='surface'
        prominence='subtle'
        padding='sm'
        tone='neutral'
        border='emphasis'>
        <Panel.Content>
          <Flex alignment='center' gap='sm'>
            <SearchIcon size='xl' />
            <Text>Text within a panel</Text>
          </Flex>
        </Panel.Content>
      </Panel.Root>
      <Panel.Root
        bg='surface'
        prominence='emphasis'
        tone='critical'
        fg='tone'
        border='emphasis'
        radii='md'
        width='xs'>
        <Panel.Content>
          <Flex alignment='center' gap='sm'>
            <CriticalIcon size='xl' />
            <Text weight='semibold'>Danger! High Voltage!</Text>
          </Flex>
        </Panel.Content>
      </Panel.Root>
      <Panel.Root gap='xl'>
        <Panel.Root flex='full' bg='app' prominence='muted'>
          <Panel.Content>
            <Text>Left</Text>
          </Panel.Content>
        </Panel.Root>
        <Panel.Root flex='full' bg='app' prominence='muted'>
          <Panel.Content>
            <Text>Right</Text>
          </Panel.Content>
        </Panel.Root>
      </Panel.Root>
      <Flex orientation='v' gap='md'>
        <Text size='lg' weight='semibold'>
          Content widths
        </Text>
        <Panel.Root width='xs' bg='surface' prominence='emphasis'>
          <Panel.Content>
            <Text>XS</Text>
          </Panel.Content>
        </Panel.Root>
        <Panel.Root width='sm' bg='surface' prominence='emphasis'>
          <Panel.Content>
            <Text>SM</Text>
          </Panel.Content>
        </Panel.Root>
        <Panel.Root width='md' bg='surface' prominence='emphasis'>
          <Panel.Content>
            <Text>MD</Text>
          </Panel.Content>
        </Panel.Root>
        <Panel.Root width='lg' bg='surface' prominence='emphasis'>
          <Panel.Content>
            <Text>LG</Text>
          </Panel.Content>
        </Panel.Root>
        <Panel.Root width='xl' bg='surface' prominence='emphasis'>
          <Panel.Content>
            <Text>XL</Text>
          </Panel.Content>
        </Panel.Root>
      </Flex>
      <Flex orientation='v' gap='md'>
        <Text size='lg' weight='semibold'>
          Shadows
        </Text>

        <Flex gap='lg'>
          <Panel.Root width='xs' bg='app' prominence='muted' shadow='sm'>
            <Panel.Content>
              <Text>Small shadow</Text>
            </Panel.Content>
          </Panel.Root>
          <Panel.Root width='xs' bg='app' prominence='muted' shadow='md'>
            <Panel.Content>
              <Text>Medium shadow</Text>
            </Panel.Content>
          </Panel.Root>
          <Panel.Root width='xs' bg='app' prominence='muted' shadow='lg'>
            <Panel.Content>
              <Text>Large shadow</Text>
            </Panel.Content>
          </Panel.Root>
        </Flex>
      </Flex>
    </Flex>
  )
}
