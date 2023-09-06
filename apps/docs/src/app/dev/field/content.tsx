'use client'

import {Flex} from '@urban-ui/flex'
import {Field} from '@urban-ui/field'
import {Input} from '@urban-ui/input'
import {Text} from '@urban-ui/text'

export function Content() {
  return (
    <Flex orientation='v' gap='xl'>
      <Field.Root orientation='v' gap='sm' alignment='start' id='footy'>
        <Text asChild slot='label'>
          <label>Some label</label>
        </Text>
        <Input slot='field' />
        <Text slot='description'>Some description</Text>
        <Text slot='errorMessage' tone='primary'>
          Some description
        </Text>
      </Field.Root>

      <Field.Root orientation='v' gap='sm' alignment='start'>
        <Text asChild slot='label'>
          <label>Another label</label>
        </Text>
        <Input slot='field' />
        <Text slot='description'>Some description</Text>
        <Text slot='errorMessage' tone='primary'>
          Some description
        </Text>
      </Field.Root>
    </Flex>
  )
}
