'use client'

import {Flex} from '@urban-ui/flex'
import {Field} from '@urban-ui/field'
import {Input, TextArea} from '@urban-ui/input'
import {Text} from '@urban-ui/text'
import {TextField} from '@urban-ui/text-field'

export function Content() {
  return (
    <Flex orientation='h' gap='xl'>
      <Flex orientation='v' gap='xl'>
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
            <label>Input label</label>
          </Text>
          <Input slot='field' />
          <Text slot='description'>Some description</Text>
          <Text slot='errorMessage' tone='primary'>
            Some description
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
      </Flex>
      <Flex orientation='v' gap='xl'>
        <TextField
          label='TextField label'
          validation={validation.maxLength(10)}
        />
      </Flex>
    </Flex>
  )
}

const validation = {
  maxLength: (len: number) => (value: string) => {
    return value.length <= len
  },
}
