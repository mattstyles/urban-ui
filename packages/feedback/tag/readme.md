# @urban-ui/tag

Tag component for Urban UI.

## Installation

```bash
bun add @urban-ui/tag
```

## Usage

```tsx
import { Tag } from '@urban-ui/tag'

export function Example() {
  return (
    <div>
      <Tag>Default</Tag>
      <Tag variant='accent'>Accent</Tag>
      <Tag variant='positive' size='lg'>Large Positive</Tag>
    </div>
  )
}
```

## API

### Tag

A tag component that supports different variants and sizes.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'neutral' \| 'accent' \| 'positive' \| 'warning' \| 'danger' \| 'info' | 'neutral' | Visual style variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Controls text size and padding |
| style | StyleXStyles | - | Additional styles to apply |
| children | ReactNode | - | Content to display |
