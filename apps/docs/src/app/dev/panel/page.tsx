import {Flex} from '@urban-ui/flex'
import {Text} from '@urban-ui/text'
import {SearchIcon} from '@urban-ui/icons'
import {atoms} from '@urban-ui/theme/atoms'
import {Panel} from '@urban-ui/panel'

export default function ColorPage() {
  return (
    <Flex orientation='v' gap='md' className={atoms({p: 'md'})}>
      <Panel.Root bg='element' prominence='base' tone='primary'>
        <Flex alignment='center' gap='sm'>
          <SearchIcon size='xl' />
          <Text>Text within a panel</Text>
        </Flex>
      </Panel.Root>
      <Panel.Root bg='element' prominence='subtle' tone='critical' fg='invert'>
        <Flex alignment='center' gap='sm'>
          <SearchIcon size='xl' />
          <Text>Text within a panel</Text>
        </Flex>
      </Panel.Root>
    </Flex>
  )
}
