# @urban-ui/icon

Icon component for Urban UI.

## Installation

```bash
bun add @urban-ui/icon
```

## Usage

Icon determines the size and colour, supply an SVG as a child to determine what renders.

```tsx
import { Icon } from '@urban-ui/icon'

export function Example() {
  return (
    <div>
      <Icon>
        // @TODO
      </Icon>
      <Icon tone='accent'>
        // @TODO
      </Icon>
      <Icon size='lg'>
        // @TODO
      </Icon>
    </div>
  )
}
```

## API

### Icon

Icon is a layout component which defines the size and colour of the children it renders. Supply SVG as children.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| tone | 'neutral' \| 'accent' \| 'positive' \| 'warning' \| 'danger' \| 'info' | 'neutral' | Visual colour tone |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Controls size |
| style | StyleXStyles | - | Additional styles to apply |
| children | ReactNode | - | Content to display |
