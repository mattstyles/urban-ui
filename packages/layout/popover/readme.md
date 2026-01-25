# @urban-ui/popover

Popover component for positioning overlay content relative to a trigger element.

## Installation

```bash
bun add @urban-ui/popover
```

## Usage

```tsx
import { DialogTrigger, Popover } from '@urban-ui/popover'
import { Button } from '@urban-ui/button'
import { Dialog } from 'react-aria-components'

<DialogTrigger>
  <Button>Open</Button>
  <Popover>
    <Dialog>Popover content</Dialog>
  </Popover>
</DialogTrigger>
```

## Props

### Inherited from react-aria-components

The following props are passed directly to react-aria-components Popover without modification:

- `placement` - Position relative to trigger (`top`, `bottom`, `left`, `right`, `top start`, `bottom end`, etc.)
- `offset` - Distance from trigger in pixels (default: 8)
- `crossOffset` - Offset along the cross axis
- `shouldFlip` - Whether to flip when constrained (default: true)

See [react-aria Popover docs](https://react-spectrum.adobe.com/react-aria/Popover.html) for full API.

### Custom props

- `showArrow` - Renders an SVG arrow pointing to the trigger (default: false). Automatically hidden for MenuTrigger and SubmenuTrigger.
- `style` - StyleX styles for the popover container
- `arrowStyle` - StyleX styles for the arrow SVG

## Arrow

```tsx
<Popover showArrow placement="top">
  <Dialog>Content with arrow</Dialog>
</Popover>
```

The arrow automatically rotates based on the resolved placement (including after flipping).
