# @urban-ui/scrollable

> layout | scrollable

[![npm](https://img.shields.io/npm/v/@urban-ui/scrollable?style=flat-square)](https://www.npmjs.com/package/@urban-ui/scrollable)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/scrollable?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/scrollable)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Creates a scrollable area

## Getting started

```sh
pnpm add -S @urban-ui/scrollable
```

```js
import {Container} from '@urban-ui/container
import {Scrollable} from '@urban-ui/scrollable'

export function MyComponent() {
  return (
    <Container css={{backgroundColor: '$bg1', width: '200px', height: '250px'}}>
      <Scrollable.Root>
        <Scrollable.Viewport>
          {// content for the scrollable area}
        </Scrollable.Viewport>
        <Scrollable.Scrollbar>
          <Scrollable.Thumb />
        </Scrollable.Scrollbar>
      </Scrollable.Root>
    </Container>
  )
}
```

## Details

Styled version of [radix-ui/scrollarea](https://www.radix-ui.com/docs/primitives/components/scroll-area).

Props that apply to the radix-ui scrollarea component also apply here. Additional props are listed here.

`Scrollable` is a layout component that gives some control over when and how scrollbars appear. It also attaches keyboard listeners for better control.
