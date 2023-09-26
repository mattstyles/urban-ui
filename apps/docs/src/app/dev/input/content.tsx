'use client'

import {useState} from 'react'
import {Flex} from '@urban-ui/flex'
import {Input} from '@urban-ui/input'
import {Text} from '@urban-ui/text'
import {Button} from '@urban-ui/button'
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
      <Flex orientation='v' gap='md' alignment='start'>
        <Text asChild>
          <label id='primaryinputlabel' htmlFor='primaryinput'>
            Tone manually applied
          </label>
        </Text>
        <Input
          id='primaryinput'
          aria-labelledby='primaryinputlabel'
          tone='primary'
          placeholder='primary'
        />
        <Input
          id='primaryinput'
          aria-labelledby='primaryinputlabel'
          tone='critical'
          placeholder='critical'
        />
      </Flex>
      <Flex orientation='v' gap='md'>
        <Text size='lg' weight='semibold'>
          Sizes
        </Text>
        <Text asChild>
          <label htmlFor='size_sm'>Small</label>
        </Text>
        <Input size='sm' aria-labelledby='size_sm' id='size_sm' />
        <Text asChild>
          <label htmlFor='size_md'>Medium</label>
        </Text>
        <Input size='md' aria-labelledby='size_md' id='size_md' />
        <Text asChild>
          <label htmlFor='size_lg'>Large</label>
        </Text>
        <Input size='lg' aria-labelledby='size_lg' id='size_lg' />
      </Flex>
      <Flex
        orientation='v'
        gap='md'
        alignment='start'
        style={{background: 'white'}}
        className={atoms({p: 'lg'})}>
        <Text asChild>
          <label id='eminputlabel' htmlFor='eminput'>
            Background tonal colour applied
          </label>
        </Text>
        <Input
          id='eminput'
          aria-labelledby='eminputlabel'
          background='surface'
          placeholder='surface, muted'
        />
        <Input
          id='eminput'
          aria-labelledby='eminputlabel'
          placeholder='app, not muted'
          background='app'
          muted={false}
        />
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
            atoms({
              px: 'lg',
              py: 'lg',
              surface: 'base',
              radii: 'sm',
              tone: 'primary',
              // fg: 'primary',
            }),
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
        <Flex
          orientation='v'
          alignment='start'
          gap='md'
          fit
          className={cx(
            atoms({
              px: 'lg',
              py: 'lg',
              surface: 'muted',
              radii: 'sm',
              tone: 'primary',
              fg: 'primary',
            }),
          )}>
          <Text size='lg'>Panel</Text>
          <Text size='md'>Applying a tone from panel</Text>
          <Flex orientation='v' gap='xs'>
            <label id='l2' htmlFor='i2'>
              <Text>Input:</Text>
            </label>
            <Input
              id='i2'
              aria-labelledby='l2'
              placeholder='placeholder text'
              background='surface'
              muted={false}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex orientation='v' gap='md' alignment='start'>
        <Text asChild>
          <label id='clearinputlabel' htmlFor='clearinput'>
            With clear button
          </label>
        </Text>
        <Input
          id='clearinput'
          aria-labelledby='clearinputlabel'
          placeholder='With clear button'
          onClear={() => console.log('onClear')}
        />
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
        onChange={(value) => {
          console.log('on change', value)
          setValue(value)
        }}
      />
      <Text size='sm'>Descriptive element</Text>
      <Text size='md'>{value}</Text>
    </Flex>
  )
}
