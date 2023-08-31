'use client'

import {Flex} from '@urban-ui/flex'
import {Input} from '@urban-ui/input'
import {Text} from '@urban-ui/text'

export function Content() {
  return (
    <Flex orientation='v' gap='xl'>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text size='xl'>Default</Text>
        <Flex orientation='v' gap='xs'>
          <label id='inputlabel' htmlFor='input'>
            input
          </label>
          <Input id='input' aria-labelledby='inputlabel' />
        </Flex>
        <Flex orientation='v' gap='xs'>
          <label id='dislabel' htmlFor='dis'>
            Disabled
          </label>
          <Input id='dis' aria-labelledby='dislabel' isDisabled />
        </Flex>
      </Flex>
    </Flex>
  )
}
