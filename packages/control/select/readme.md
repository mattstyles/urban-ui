# @urban-ui/select

> control | select

[![npm](https://img.shields.io/npm/v/@urban-ui/select?style=flat-square)](https://www.npmjs.com/package/@urban-ui/select)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/select?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/select)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Styled radix-ui/select component

## Getting started

```sh
pnpm add -S @urban-ui/select
```

```js
import {Select} from '@urban-ui/select'

export function MyComponent() {
  return (
    <Select.Root>
      <Select.Trigger aria-label='Food' size='md'>
        <Select.Value placeholder='Select a fruit…' />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.ScrollUpButton>
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport>
            <Select.Group>
              <Select.Label>Fruits</Select.Label>
              <Item value='apple'>Apple</Item>
              <Item value='banana'>Banana</Item>
              <Item value='blueberry'>Blueberry</Item>
              <Item value='grapes'>Grapes</Item>
              <Item value='pineapple'>Pineapple</Item>
            </Select.Group>

            <Select.Separator />

            <Select.Group>
              <Select.Label>Vegetables</Select.Label>
              <Item value='aubergine'>Aubergine</Item>
              <Item value='broccoli'>Broccoli</Item>
              <Item value='carrot' disabled>
                Carrot
              </Item>
              <Item value='courgette'>Courgette</Item>
              <Item value='leek'>Leek</Item>
            </Select.Group>

            <Select.Separator />

            <Select.Group>
              <Select.Label>Meat</Select.Label>
              <Item value='beef'>Beef</Item>
              <Item value='chicken'>Chicken</Item>
              <Item value='lamb'>Lamb</Item>
              <Item value='pork'>Pork</Item>
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton>
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
```

## Details

The Select component adds styling to [radix-ui/select](https://www.radix-ui.com/docs/primitives/components/select) and all props are applicable. Select is a complex component with a high degree of flexibility. See the later section on creating a smaller (but less flexible) API to use in your design system.

Select is split into a couple of groups of components:

- Root
- Trigger
- Content
- Item

Select must always be wrapped in a `Root` component.

The trigger is made up of a few components:

```js
<Select.Trigger aria-label='Food' size='md'>
  <Select.Value placeholder='Select a fruit…' />
  <Select.Icon>
    <ChevronDownIcon />
  </Select.Icon>
</Select.Trigger>
```

The content block, which forms the viewport for the select content, is also made of a few pieces. It requires a portal to render into, you can include buttons if required (it is a good idea to do so, they will only render when required), content and viewport components, and then the items you wish to render.

```js
<Select.Portal>
  <Select.Content>
    <Select.ScrollUpButton>
      <ChevronUpIcon />
    </Select.ScrollUpButton>
    <Select.Viewport>{children}</Select.Viewport>
    <Select.ScrollDownButton>
      <ChevronDownIcon />
    </Select.ScrollDownButton>
  </Select.Content>
</Select.Portal>
```

An item component is made up of a few pieces also:

```js
<Select.Item>
  <Select.ItemText>{children}</Select.ItemText>
  <Select.ItemIndicator>
    <CheckIcon />
  </Select.ItemIndicator>
</Select.Item>
```

### Custom API

A less flexible but cleaner API can be created to reduce the effort required to create a select component ([original](https://www.radix-ui.com/docs/primitives/components/select#custom-apis)):

```
<Select placeholder='Select something'>
  <SelectItem value='one'>One</SelectItem>
  <SelectItem value='two'>Two</SelectItem>
</Select>

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
```
