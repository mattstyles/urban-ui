'use client'

import * as React from 'react'
import {Flex} from '@urban-ui/flex'
import {Field} from '@urban-ui/field'
import {Input, TextArea} from '@urban-ui/input'
import {Text} from '@urban-ui/text'
import {TextField} from '@urban-ui/text-field'
import {Button} from '@urban-ui/button'
import {mapAllChildren} from '@urban-ui/slot'

export function Content() {
  return (
    <Flex orientation='h' gap='xl'>
      {/* <Flex orientation='v' gap='xl'>
        <Field.Root
          orientation='v'
          gap='sm'
          alignment='start'
          id='passed-id'
          isDisabled>
          <Text asChild slot='label'>
            <label>Disabled field</label>
          </Text>
          <Input slot='field' placeholder='disabled' />
          <Text slot='description'>Some description</Text>
          <Text slot='errorMessage'>Some description</Text>
        </Field.Root>

        <Field.Root
          orientation='v'
          gap='sm'
          alignment='start'
          validationState='invalid'>
          <Text asChild slot='label'>
            <label>Passing invalid state</label>
          </Text>
          <Input slot='field' />
          <Text slot='description'>Some description</Text>
          <Text slot='errorMessage' tone='primary'>
            Some error message
          </Text>
        </Field.Root>

        <Field.Root orientation='v' gap='sm' alignment='start'>
          <Text asChild slot='label'>
            <label>Textarea label</label>
          </Text>
          <TextArea slot='field' />
          <Text slot='description'>Some description</Text>
          <Text slot='errorMessage' tone='primary'>
            Some description
          </Text>
        </Field.Root>
      </Flex> */}
      <Flex orientation='v' gap='xl'>
        <TextField
          label='TextField label'
          description='maximum length of 10'
          errorMessage='exceeds maximum length of 10'
          validation={validation.maxLength(10)}
          isRequired
        />
        {/* <TestChildMap>
          <div id='foo'>
            <div>
              <div id='target'>Hello</div>
            </div>
          </div>
          <div id='bar'>World</div>
        </TestChildMap> */}
      </Flex>
      {/* <Flex orientation='v' gap='xl'>
        <Text size='xl' weight='semibold'>
          Form
        </Text>
        <Flex asChild orientation='v' gap='lg'>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              const data = new FormData(event.currentTarget)
              console.log(data.get('target'))
            }}>
            <TextField
              label='Required TextField'
              description='This field is required'
              isRequired
              name='target'
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Flex>
      </Flex> */}
    </Flex>
  )
}

const validation = {
  maxLength: (len: number) => (value: string) => {
    return value.length <= len
  },
}

function TestChildMap({children}: React.PropsWithChildren) {
  const mappedChildren = React.useMemo(() => {
    return mapAllChildren(children, (child) => {
      console.log('mapping children', child)

      if (child.props.id === 'target') {
        return React.cloneElement(child, {
          style: {color: 'blue'},
        })
      }

      return React.cloneElement(child, {
        style: {color: 'red'},
      })
    })
  }, [children])

  return mappedChildren
}
