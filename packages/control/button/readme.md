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

### Variants

#### Tone

- Primary -> Uses the primary colour scale
- Critical -> For destructive actions, uses the critical scale (usually red)
- Neutral -> Often for secondary actions, or de-emphasis. Uses the background scale.

#### Type

Uses the specified tonal colour

- Solid -> Solid fill of the tonal colour
- Transparent -> Transparent fill, hover colour on hover
- Outline -> Border colour outline, transparent to hover colour
- Ghost -> Uses UI element background and hovers
- Emphasis -> Uses UI elements but shifted 1 step more colourful
- Clear -> Clears most applied styling, useful for wrapping other clickable elements

### Link and anchors

Use the `as` prop to specify that your button should be an anchor. Styling will persist so it will _look_ like a button but actually be an anchor (it even gets the correct cursor).

```js
<Button as='a' type='transparent' href='#'>
  I'm an anchor
</Button>
```

### Icons

There is no complicated syntax or special props for adding icons to your button, put them in as children and `button` will render them.

```jsx
import {Button} from '@urban-ui/button'
import {Spacer} from '@urban-ui/spacer'
import {StitchesLogoIcon} from '@radix-ui/react-icons'

function someComponent() {
  return (
    <Button>
      <StitchesLogoIcon />
      <Spacer orientation='h' size='xs' />
      With logo
    </Button>
  )
}
```

You can use a stack to add a gap but remember to set the orientation and alignment properties.

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

### Disabled

Disabled state is consistent across all buttons. This uses `!important`, which makes it impossible to style otherwise.

### Creating additional semantic buttons

Extend the button component to add additional restrictions and semantics based on your design language.

```js
import {Button as UrbanButton} from '@urban-ui/button'

const SecondaryButton = styled(UrbanButton, {
  backgroundColor: 'rebeccapurple',
  color: 'white
})
```

Stitches won't allow you to specify variants _and_ keep the original Button variants, but you can specify your own variant set.

## API

| Prop | Type                                                                      | Description                                |
| ---- | ------------------------------------------------------------------------- | ------------------------------------------ |
| tone | 'primary' \| 'critical' \| 'neutral'                                      |                                            |
| type | 'solid' \| 'transparent' \| 'outline' \| 'ghost' \| 'emphasis' \| 'clear' |                                            |
| wrap | boolean                                                                   | Defaults to false                          |
| fill | boolean                                                                   | Defaults to false. Will fit its container. |
