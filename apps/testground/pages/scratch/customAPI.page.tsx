import {CheckIcon, ChevronDownIcon, ChevronUpIcon} from '@radix-ui/react-icons'
import * as React from 'react'
import {useState} from 'react'
import type {} from '@stitches/react'

import {Container, Stack} from '@urban-ui/layout'
import {Content} from '@urban-ui/content'
import {Text, Heading, H2, H3, P} from '@urban-ui/text'
import * as SelectPrimitive from '@urban-ui/select'
import * as RadioPrimitive from '@urban-ui/radio'
import * as CheckboxPrimitive from '@urban-ui/checkbox'
import {Layout} from './layout'

export default function Page() {
  return (
    <Container padding='md' alignment='center' size='full'>
      <Content>
        <H2>Custom component API</H2>
        <P>
          Many components wrap radix-ui components but do not always expose a
          particularly clean API. This is to make them more flexible.
        </P>
        <P>
          Creating stricter variants with a cleaner API is a common first step
          for utilising urban-ui components. These will probably be exposed in a
          package at some point.
        </P>

        <form>
          <Stack>
            <Stack orientation='h' alignment='center'>
              <Text as='label' id='a1'>
                Select component
              </Text>
              <Select placeholder='Select something'>
                <SelectItem value='one'>One</SelectItem>
                <SelectItem value='two'>Two</SelectItem>
              </Select>
            </Stack>

            <Radio>
              <RadioItem value='b1' id='one'>
                One
              </RadioItem>
              <RadioItem value='b2' id='two'>
                Two
              </RadioItem>
            </Radio>

            <Stack gap='xs'>
              <Checkbox value='c1'>One</Checkbox>
              <Checkbox value='c2'>Two</Checkbox>
              <Checkbox value='c3'>Three</Checkbox>
            </Stack>
          </Stack>
        </form>
      </Content>
    </Container>
  )
}
Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

const Select = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof SelectPrimitive.Root> & {
    as?: string
    placeholder: string
  }
>(({children, placeholder, ...props}, forwardedRef) => {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger ref={forwardedRef}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content>
          <SelectPrimitive.ScrollUpButton>
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton>
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
})
Select.displayName = 'select'

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SelectPrimitive.Item>
>(({children, ...props}, forwardedRef) => {
  return (
    <SelectPrimitive.Item {...props} ref={forwardedRef}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
})
SelectItem.displayName = 'select-item'

const Radio = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RadioPrimitive.Root>
>(({children, ...props}, forwardedRef) => {
  return <RadioPrimitive.Root {...props}>{children}</RadioPrimitive.Root>
})
Radio.displayName = 'radio'

const RadioItem = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof RadioPrimitive.Root> & {value: string}
>(({children, value, ...props}, forwardedRef) => {
  return (
    <Stack orientation='h' gap='sm' alignment='center'>
      <RadioPrimitive.Item
        value={value}
        id={value}
        size='sm'
        tone='primary'
        ref={forwardedRef}>
        <RadioPrimitive.Indicator>
          <RadioPrimitive.Dot size='sm' />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Item>
      <Text as='label' htmlFor={value}>
        {children}
      </Text>
    </Stack>
  )
})
RadioItem.displayName = 'radio-item'

const Checkbox = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof CheckboxPrimitive.Root> & {value: string}
>(({children, value, ...props}, forwardedRef) => {
  return (
    <Stack orientation='h' alignment='start' gap='sm'>
      <CheckboxPrimitive.Root
        id={value}
        tone='primary'
        size='sm'
        ref={forwardedRef}>
        <CheckboxPrimitive.Indicator size='sm'>
          <CheckIcon width='100%' height='100%' />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <CheckboxPrimitive.Content size='sm'>
        <Text as='label' htmlFor={value}>
          {children}
        </Text>
      </CheckboxPrimitive.Content>
    </Stack>
  )
})
Checkbox.displayName = 'checkbox'
