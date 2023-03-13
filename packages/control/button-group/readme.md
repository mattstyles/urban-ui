# @urban-ui/button-group

> control | button-group

[![npm](https://img.shields.io/npm/v/@urban-ui/button-group?style=flat-square)](https://www.npmjs.com/package/@urban-ui/button-group)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/button-group?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/button-group)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Styling for a group of buttons

## Getting started

```sh
pnpm add -S @urban-ui/button-group
```

```js
import {Button} from '@urban-ui/button'
import {ButtonGroup} from '@urban-ui/button-group'

export function MyComponent() {
  return (
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  )
}
```

## Details

ButtonGroup only applies some border styling to a collection of buttons. For general layout you do not need it, and it is trivial to create your own variant of ButtonGroup to apply different styling (or even functionality such as hover/active UI state that transitions between children).

ButtonGroup is designed to work best with children that are all urban-ui buttons. Typescript will not enforce this in case you want to extend Button to include your own button types.

ButtonGroup works by applying styling to children via `'*'`, this has the potential to break in some use-cases but is generally fine.

Due to how CSS flexbox works there can be cases where ButtonGroup does not have the width you might expect (leading to a broken UI), in most cases surrounding in a `Box` component will fix this.

## API

| Prop   | Type                           | Description                       |
| ------ | ------------------------------ | --------------------------------- |
| radius | 'none' \| 'sm' \| 'md' \| 'lg' | The themed border-radius to apply |
| color  | string                         | The theme colour for the border   |
