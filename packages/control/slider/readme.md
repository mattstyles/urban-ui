# @urban-ui/slider

> control | slider

[![npm](https://img.shields.io/npm/v/@urban-ui/slider?style=flat-square)](https://www.npmjs.com/package/@urban-ui/slider)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@urban-ui/slider?style=flat-square)](https://bundlephobia.com/result?p=@urban-ui/slider)
[![License](https://img.shields.io/github/license/mattstyles/urban-ui.svg?style=flat-square)](https://github.com/mattstyles/urban-ui/blob/master/license.md)

> Styled version of radix-ui/slider

## Getting started

```sh
pnpm add -S @urban-ui/slider
```

```js
import * as Slider from '@urban-ui/slider'

export function MyComponent() {
  return (
    <Slider.Root defaultValue={[50]} max={100} step={1} aria-label='Volume'>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb />
    </Slider.Root>
  )
}
```

## Details

Styled wrapper around [radix-ui/slider](https://www.radix-ui.com/docs/primitives/components/slider). Components are named the same and will accept the same props.

## API

### Slider.Root

| Prop  | Type                 | Description                                                             |
| ----- | -------------------- | ----------------------------------------------------------------------- |
| size  | 'sm' \| 'md' \| 'lg' | Applies the control field token scale. Determines the interactive zone. |
| width | 'normal' \| 'full'   | Defaults to normal                                                      |

### Slider.Track

Size `xs` is the default and is smaller than the thumb. The other sizes match the control field token scale and will match the thumb size.

| Prop | Type                                                | Description                          |
| ---- | --------------------------------------------------- | ------------------------------------ |
| tone | 'primary' \| 'critical' \| 'neutral' \| 'highlight' | Defaults to neutral                  |
| size | 'xs' \| 'sm' \| 'md' \| 'lg'                        | Height of the track. Defaults to xs. |

### Slider.Range

The range denotes the ranged part of the track, this is usually left-to-right and so the range will typically be on the left.

Defaults to no tone at all.

| Prop | Type                                                | Description         |
| ---- | --------------------------------------------------- | ------------------- |
| tone | 'primary' \| 'critical' \| 'neutral' \| 'highlight' | Defaults to neutral |

### Slider.Thumb

The `space` prop adds a small external border to the thumb, this will be the current colour and defaults to white. This provides visual separation from the track. If your background is a different colour then use the `css` prop to define a new colour. Be wary of gradient backgrounds.

Disabled state also applies the same coloured external border.

| Prop  | Type                                                | Description                          |
| ----- | --------------------------------------------------- | ------------------------------------ |
| tone  | 'primary' \| 'critical' \| 'neutral' \| 'highlight' | Defaults to neutral                  |
| size  | 'xs' \| 'sm' \| 'md' \| 'lg'                        | Height of the track. Defaults to xs. |
| type  | 'clear'                                             | Clears styling, useful for icons.    |
| space | boolean                                             | Defaults to false                    |
