# @urban-ui/text

> typography | text

[![npm](https://img.shields.io/npm/v/@urban-ui/text?style=flat-square)](https://www.npmjs.com/package/@urban-ui/text)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/text?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/text)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Component for rendering text

## Getting started

```sh
pnpm add -S @urban-ui/text
```

## Details

Text components, sets default styling for components.

`Text` and `Heading` components do not have margins applied to them, this is so that layout components can control their layout without having to fight with component margins.

`H1`, `H2`, `H3`, and `P` components can be used for copy text. Note that most containers in this library are `flex` components and won’t allow margin-collapse; use a `div` or the `Content` component (from `@urban-ui/content`) to wrap copy.

The copy text elements are functional, but boring. You will likely want to apply some additional styling if you want long-form copy to spice things up a bit and add some character.

| Exports | Description             |
| ------- | ----------------------- |
| Text    | Generic text component  |
| Heading | Used to render headings |
| H1      | Heading h1              |
| H2      | Heading h2              |
| H3      | Heading h3              |
| P       | Paragraph               |

## Components

### Text

```js
import {Text} from '@urban-ui/text'

export function MyComponent() {
  return <Text>Hello world!</Text>
}
```

| Prop  | Type                            | Description |
| ----- | ------------------------------- | ----------- |
| type  | 'system' \| 'mono'              |             |
| size  | 'sm' \| 'md' \| 'lg'            |             |
| color | 'text' \| 'subtle' \| 'primary' |             |

### Heading

```js
import {Heading} from '@urban-ui/text'

export function MyComponent() {
  return (
    <Heading as='h2' type='h2' color='subtle'>
      Hello world!
    </Heading>
  )
}
```

The `Heading` component defaults to rendering as a `span` element. The `type` prop is used to define styling and can be used independently of the rendered element, using the `as` prop to define semantics where required.

There are no margins applied which allows this component to be used within a layout component without having to fight with additional white-space created by children.

> `<Heading>` should be used with the `as` prop to define an element to render as. This is in addition to the `type` prop i.e. `<Heading as='h2' type='h2'>H2</Heading>`. This is to give flexibility on semantics vs styling.

| Prop  | Type                            | Description |
| ----- | ------------------------------- | ----------- |
| type  | 'h1' \| 'h2' \| 'h3'            |             |
| color | 'text' \| 'subtle' \| 'primary' |             |

### P

```js
import {P} from '@urban-ui/text'

export function MyComponent() {
  return <P>Hello world!</P>
}
```

The paragraph component has no props for customisation. Use `Text` when you need more flexibility over styling text.

### H1, H2, H3

```js
import {P} from '@urban-ui/text'

export function MyComponent() {
  return <P>Hello world!</P>
}
```

These heading components have no props for customisation. Use `Heading` when you need more flexibility over styling headings.
