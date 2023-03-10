# @urban-ui/button

> control | button

[![npm](https://img.shields.io/npm/v/@urban-ui/button?style=flat-square)](https://www.npmjs.com/package/@urban-ui/button)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/button?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/button)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Button component

## Getting started

```sh
pnpm add -S @urban-ui/button
```

```js
import {Button} from '@urban-ui/button'

export function MyComponent() {
  return <Button />
}
```

## Details

Buttons are 36px high currently, which is problematic in 2 ways:

1. 36px is aligned only on the soft grid size of 4px (from spacing scale)
2. 36px is smaller than the minimum size for touchable elements, which is generally considered to be either 38px ([MIT Touch Labs](http://touchlab.mit.edu/publications/2003_009.pdf)) or 44px ([Apple human interface guidelines](https://developer.apple.com/design/human-interface-guidelines/components/menus-and-actions/buttons))

The default height is liable to change, and will become configurable to align with the underlying grid (this is important for establishing vertical rhythm).

### Link and anchors

Use the `as` prop to specify that your button should be an anchor. Styling will persist so it will _look_ like a button but actually be an anchor (it even gets the correct cursor).

```js
<Button as='a' type='transparent' href='#'>
  I'm an anchor
</Button>
```

### Text wrapping

Defaults to `no-wrap` which will mean that content can 'break-out' from the layout.

Generally you should not hit this constraint but if you have a special circumstance where you need a lot of text content within a button then you can tell the button to wrap using the `wrap` boolean prop.

Note that setting `wrap` to true will not cause the button to grow in height if wrapping occurs. To work around this use the `fill` prop and use a layout component to size the button.

```js
<Box css={{width: '200px'}}>
  <Button wrap fill>
    Button component with a lot of text that will break on to multiple lines
  </Button>
</Box>
```

## API

| Prop | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |
