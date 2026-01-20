# Button

Styled button component built on React Aria's Button. Provides visual styling while React Aria handles accessibility, keyboard interactions, and press states.

## Basic Usage

```tsx
import { Button } from '@urban-ui/button'

<Button onPress={() => console.log('clicked')}>Click me</Button>

<Button tone="primary" variant="solid">
  Submit
</Button>
```

## Variants

Visual styles for different contexts:

| Variant | Use |
|---------|-----|
| `solid` | Primary actions with filled background (default) |
| `muted` | Secondary actions with subtle background |
| `outline` | Bordered style for less emphasis |
| `ghost` | Minimal style, background only on hover |
| `clear` | No styling, useful for custom button content |

```tsx
<Button variant="solid">Submit</Button>
<Button variant="muted">Cancel</Button>
<Button variant="outline">Details</Button>
<Button variant="ghost">More</Button>
```

## Tones

Color tones for semantic meaning:

| Tone | Use |
|------|-----|
| `primary` | Main actions (default) |
| `neutral` | General actions |
| `accent` | Secondary brand emphasis |
| `positive` | Success/confirm actions |
| `warning` | Caution actions |
| `critical` | Destructive actions |
| `info` | Informational actions |

```tsx
<Button tone="primary">Save</Button>
<Button tone="critical">Delete</Button>
<Button tone="positive">Confirm</Button>
```

## Sizes

| Size | Use |
|------|-----|
| `md` | Standard buttons (default) |
| `lg` | Prominent actions |
| `md-equal` | Square icon buttons |
| `lg-equal` | Large square icon buttons |

```tsx
<Button size="md">Standard</Button>
<Button size="lg">Large</Button>
<Button size="md-equal"><Icon /></Button>
```

## Shapes

| Shape | Use |
|-------|-----|
| `rounded` | Standard rounded corners (default) |
| `pill` | Fully rounded ends |
| `square` | No border radius |

```tsx
<Button shape="rounded">Default</Button>
<Button shape="pill">Pill</Button>
<Button shape="square">Square</Button>
```

## Disabled State

```tsx
<Button isDisabled>Cannot click</Button>
```

## Event Handling

Use `onPress` for click/tap handling (React Aria pattern):

```tsx
<Button onPress={() => handleSubmit()}>Submit</Button>
<Button onPress={(e) => console.log(e.pointerType)}>Press me</Button>
```

## Custom Styling

Pass additional StyleX styles via the `style` prop:

```tsx
import * as stylex from '@stylexjs/stylex'

const customStyles = stylex.create({
  wide: { minWidth: 200 },
})

<Button style={customStyles.wide}>Wide button</Button>
```

## Accessibility

- Built on React Aria's Button component
- Keyboard navigation (Enter/Space to activate)
- Focus ring on keyboard focus
- Press states for visual feedback
- Proper button semantics
