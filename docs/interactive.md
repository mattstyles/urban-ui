# Interactive Elements

Interactive elements should _feel_ like a cohesive unit so they can work together seamlessly. They should be balanced alongside text and other UI elements to create a harmonious interface.

## Input Mechanism Categories

Interactive elements are categorised by their input mechanism and typical use case:

### Default (40px base height)

Elements that users interact with frequently and benefit from larger touch targets:

- Inputs
- Select
- TextArea

### Intermediate (32px base height)

Elements here have a different base scale, but typically have size variants that will match up (e.g. button-lg = input-md).

- Buttons

### Small (24px base height)

Compact elements that are typically used in groups or as secondary controls:

- Checkboxes
- Radio buttons
- Switches

## Text Sizes

Font sizes use a fluid type scale that responds to viewport width.

| Size | Min (320px) | Max (1240px) | Use Case |
|------|-------------|--------------|----------|
| xxs  | 0.579rem (~9px) | 0.667rem (~11px) | Fine print, labels |
| xs   | 0.694rem (~11px) | 0.889rem (~14px) | Captions, metadata |
| sm   | 0.833rem (~13px) | 1.185rem (~19px) | Secondary text, descriptions |
| md   | 1rem (16px) | 1.25rem (20px) | Body text (baseline) |
| lg   | 1.2rem (~19px) | 1.666rem (~27px) | Subheadings |
| xl   | 1.44rem (~23px) | 2.221rem (~36px) | Headings |
| xxl  | 1.728rem (~28px) | 2.961rem (~47px) | Display headings |

## Interactive Element Size Composition

Element minimum height is calculated using:

```
minHeight = lineHeight + ((paddingBlock + borderWidth) * 2)
```

| Size | Button | Input |
|------|--------|-------|
| sm   | - | fontSize: sm, lineHeight: md, paddingBlock: 4px |
| md   | fontSize: sm, lineHeight: md, paddingBlock: 4px | fontSize: md, lineHeight: lg, paddingBlock: 8px |
| lg   | fontSize: md, lineHeight: lg, paddingBlock: 8px | - |

Both Button and Input use:
- `borderRadius: radii.lg` (8px)
- `borderWidth: borderWidths.md` (2px)

### Calculated Heights at 320px viewport (min)

| lineHeight | paddingBlock | borderWidth | minHeight |
|------------|--------------|-------------|-----------|
| 16px (md)  | 4px | 2px | 28px |
| 19px (lg)  | 8px | 2px | ~39px |

### Calculated Heights at 1240px viewport (max)

| lineHeight | paddingBlock | borderWidth | minHeight |
|------------|--------------|-------------|-----------|
| 20px (md)  | 4px | 2px | 32px |
| 27px (lg)  | 8px | 2px | ~47px |

### Button and Input Heights (max viewport)

| Size | Button | Input |
|------|--------|-------|
| sm   | -      | 32px  |
| md   | 32px   | ~47px |
| lg   | ~47px  | -     |

## Focus States

Focus states provide visual feedback when users interact with elements via keyboard navigation.

### Buttons

Buttons display a focus ring (outline) on `:focus-visible`:

- Outline colour derived from focus tokens
- Outline offset for visual separation from the element
- Box shadow to ensure visibility against backgrounds

### Inputs / Selects

Text inputs and selects change their border colour on focus:

- Border changes to `accent.solid` on `:focus-visible`
- No outline ring (border change provides sufficient feedback)
- Transition animation for smooth state change
