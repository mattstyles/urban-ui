'use client'

import {useState} from 'react'
import {Flex} from '@urban-ui/flex'
import {Input, TextArea} from '@urban-ui/input'
import {Text} from '@urban-ui/text'
import {Button} from '@urban-ui/button'
import {atoms} from '@urban-ui/theme/atoms'
import cx from 'clsx'
import {SearchIcon} from '@urban-ui/icons'
import {Checkbox} from '@urban-ui/checkbox'

export function Content() {
  return (
    <Flex orientation='v' gap='xl'>
      <Text size='lg' weight='semibold'>
        Checkbox
      </Text>
      <Flex orientation='v' gap='xs'>
        <Checkbox radii='lg' variant='solid'>
          Hello world
        </Checkbox>
        <Checkbox isDisabled>Disabled</Checkbox>
        <Checkbox isDisabled isSelected>
          Disabled selected
        </Checkbox>
      </Flex>
      <Text size='lg' weight='semibold'>
        Sizes
      </Text>
      <Flex orientation='h' gap='xl' alignment='center'>
        <Checkbox size='sm'>Small</Checkbox>
        <Checkbox size='md'>Medium</Checkbox>
        <Checkbox size='lg'>Large</Checkbox>
      </Flex>
      <Text size='lg' weight='semibold'>
        Inherit tonality
      </Text>
      <Flex orientation='v' gap='xs' className={atoms({tone: 'primary'})}>
        <Checkbox>Inherit tone from parent</Checkbox>
      </Flex>
      <Text size='lg' weight='semibold'>
        Supplied tonality
      </Text>
      <Flex orientation='h' gap='xl' className={atoms({tone: 'primary'})}>
        <Checkbox tone='critical'>Critical</Checkbox>
        <Checkbox tone='primary'>Primary</Checkbox>
        <Checkbox tone='neutral'>Neutral</Checkbox>
      </Flex>
    </Flex>
  )
}
