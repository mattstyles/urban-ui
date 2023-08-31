'use client'

import {Flex} from '@urban-ui/flex'
import {Input} from '@urban-ui/input'
import {Text} from '@urban-ui/text'

export function Content() {
  return (
    <Flex orientation='v' gap='xl'>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text size='xl'>Default</Text>
        <Input />
        <Input isDisabled />
      </Flex>
    </Flex>
  )
}
