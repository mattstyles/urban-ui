'use client'

import {useState} from 'react'
import {Flex} from '@urban-ui/flex'
import {Input} from '@urban-ui/input'
import {Text} from '@urban-ui/text'
import {atoms} from '@urban-ui/theme/atoms'
import * as styles from './content.css.ts'
import cx from 'clsx'

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
      <Flex>
        <ControlledInput />
      </Flex>

      <Flex gap='md'>
        <Flex
          orientation='v'
          alignment='start'
          gap='md'
          fit
          className={atoms({px: 'lg', py: 'lg', surface: 'base', radii: 'sm'})}>
          <Text size='lg'>Panel</Text>
          <Text size='md'>Some more text within this panel</Text>
          <Flex orientation='v' gap='xs'>
            <label id='l1' htmlFor='i1'>
              <Text>Input:</Text>
            </label>
            <Input
              id='i1'
              aria-labelledby='l1'
              placeholder='placeholder text'
            />
          </Flex>
        </Flex>
        <Flex
          orientation='v'
          alignment='start'
          gap='md'
          fit
          className={cx(
            atoms({px: 'lg', py: 'lg', surface: 'base', radii: 'sm'}),
            styles.primary,
          )}>
          <Text size='lg'>Panel</Text>
          <Text size='md'>Applying a tone</Text>
          <Flex orientation='v' gap='xs'>
            <label id='l1' htmlFor='i1'>
              <Text>Input:</Text>
            </label>
            <Input
              id='i1'
              aria-labelledby='l1'
              placeholder='placeholder text'
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

function ControlledInput() {
  const [value, setValue] = useState('')

  return (
    <Flex orientation='v' alignment='start' gap='sm'>
      <label id='name' htmlFor='name'>
        <Text size='md'>Name:</Text>
      </label>
      <Input
        id='name'
        aria-labelledby='name'
        aria-describedby='name-desc'
        placeholder='Mary Anning'
        value={value}
        onChange={setValue}
      />
      <Text size='sm'>Descriptive element</Text>
      <Text size='md'>{value}</Text>
    </Flex>
  )
}
