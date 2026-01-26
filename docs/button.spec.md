# Button Component Specification

This document specifies the anatomy of a Button component, providing a template for component generation.

## Overview

The Button component enables user interactions through mouse, touch, and keyboard inputs. It wraps React Aria's Button component to provide accessible, cross-platform interaction handling with urban-ui styling.

**Key note:** Button styling is implemented in the shared `@urban-ui/styles` package (`packages/core/styles/src/button.ts`) to enable style reuse with other components that need button-like appearance (e.g., Link components styled as buttons).

---

## Anatomy

### Component Tree

```
Button (AriaButton wrapper)
├── Content (children)
│   ├── Icon (optional leading/trailing)
│   └── Text label
└── Loading indicator (when isPending)
```

### Visual Hierarchy

```
┌─ Button ────────────────────────────────┐
│ ┌─ [data-content] ───────────────────┐  │
│ │ [Icon?] Label Text [Icon?]         │  │
│ └────────────────────────────────────┘  │
│ ┌─ ProgressBar (when isPending) ─────┐  │
│ │ ◐ Spinner (absolute, centered)     │  │
│ └────────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Interior Content Element

The Button component uses an interior `<span data-content>` element to wrap children. This element is required because:

1. **Pending state overlay:** When `isPending` is true, the content must be hidden (via `opacity: 0`) while maintaining layout so the button doesn't collapse. The spinner overlays this content using absolute positioning.

2. **Gap control:** The interior element provides the `gap` between child elements (e.g., icon and text). Moving gap to the button itself would affect the spinner positioning.

3. **External styling target:** The `data-content` attribute allows external consumers to target the content wrapper for custom styling if needed.

**Why not remove it?** We explored using CSS descendant selectors with `display: contents` on the spinner to hide children without a wrapper, but this approach doesn't work for text node children (which aren't matched by `> *` selectors).

---

## Usage Examples

### Basic Usage

```tsx
import { Button } from '@urban-ui/button'

<Button onPress={() => console.log('pressed')}>
  Click me
</Button>
```

### With Variants and Tones

```tsx
<Button variant="solid" tone="primary">Primary Action</Button>
<Button variant="muted" tone="neutral">Secondary</Button>
<Button variant="outline" tone="critical">Danger</Button>
<Button variant="ghost" tone="accent">Ghost</Button>
```

### With Icons

```tsx
import { Icon } from '@urban-ui/icon'

<Button variant="solid" tone="primary">
  <Icon name="plus" />
  Add Item
</Button>

<Button size="md-equal" variant="muted" shape="rounded">
  <Icon name="settings" />
</Button>
```

### Disabled State

```tsx
<Button isDisabled>Cannot Click</Button>
```

### Pending/Loading State

```tsx
<Button isPending>
  <Spinner /> Saving...
</Button>
```

---

## Component Breakdown

### Button (Container)

Wraps React Aria's `Button` component with urban-ui styling system integration. Uses shared styles from `@urban-ui/styles/button`.

**Key Props from React Aria:**

| Prop | Type | Description |
|------|------|-------------|
| `onPress` | `(e: PressEvent) => void` | Handler called when pressed (normalized for mouse/touch/keyboard) |
| `onPressStart` | `(e: PressEvent) => void` | Handler called when press starts |
| `onPressEnd` | `(e: PressEvent) => void` | Handler called when press ends |
| `onPressChange` | `(isPressed: boolean) => void` | Handler called when pressed state changes |
| `isDisabled` | `boolean` | Whether the button is disabled |
| `isPending` | `boolean` | Whether the button shows loading state (remains focusable) |
| `type` | `'button' \| 'submit' \| 'reset'` | Form submission behavior |
| `form` | `string` | Associates button with a form element |
| `autoFocus` | `boolean` | Whether to auto-focus on mount |
| `excludeFromTabOrder` | `boolean` | Whether to remove from tab order |

**Render Props (from React Aria):**

| Prop | Type | Description |
|------|------|-------------|
| `isHovered` | `boolean` | Whether button is hovered |
| `isPressed` | `boolean` | Whether button is pressed |
| `isFocused` | `boolean` | Whether button has focus |
| `isFocusVisible` | `boolean` | Whether focus ring should be visible |
| `isDisabled` | `boolean` | Whether button is disabled |
| `isPending` | `boolean` | Whether button is in pending state |

**urban-ui Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'solid' \| 'muted' \| 'outline' \| 'ghost' \| 'clear'` | `'solid'` | Visual style variant |
| `tone` | `'neutral' \| 'primary' \| 'accent' \| 'positive' \| 'warning' \| 'critical' \| 'info'` | `'primary'` | Color semantic |
| `size` | `'md' \| 'lg' \| 'md-equal' \| 'lg-equal'` | `'md'` | Size variant |
| `shape` | `'rounded' \| 'pill' \| 'square'` | `'rounded'` | Border radius style |
| `style` | `StyleXStyles` | - | Additional StyleX styles |

---

## Questions for Implementation

> **Note:** All functionality (keyboard interactions, accessibility features) is inherited verbatim from React Aria Components. These questions focus on defining the visual language for the component.

### 1. Context & Composition

**Q1.1: What context will this component be used in?**
- Standalone buttons for actions
- Form submit/reset buttons
- Icon-only buttons for compact UI
- Button groups (future consideration)

**Q1.2: Is this standalone or part of a composite?**
Standalone export. Styles are shared via `@urban-ui/styles/button` for Link components that need button appearance.

**Q1.3: What child composition patterns are needed?**
- Plain text labels
- Icon + text combinations
- Icon-only (with `md-equal` or `lg-equal` size)
- Loading indicator + text

### 2. Visual States

For each state exposed by React Aria, the visual treatment using theme tokens:

| State | Data Attribute | Background | Text | Border | Other |
|-------|---------------|------------|------|--------|-------|
| Default | - | `tone.solid` | `tone.fgOnBlock` | `base.transparent` | - |
| Hovered | `[data-hovered]` | `tone.solidHover` | `tone.fgOnBlock` | - | - |
| Focused | `[data-focused]` | (same as default) | - | - | - |
| Focus Visible | `[data-focus-visible]` | (same as default) | - | - | Focus ring via `focusVars` |
| Pressed | `[data-pressed]` | `tone.solidActive` | `tone.fgOnBlock` | - | `transform: scale(0.98)` |
| Disabled | `[data-disabled]` | `disabled.background` | `disabled.fg` | - | `opacity: 0.5`, `cursor: not-allowed` |
| Pending | `[data-pending]` | (same as default) | - | - | Loading indicator visible |

**Variant-specific states (muted/outline/ghost):**

| State | Background | Text | Border |
|-------|------------|------|--------|
| Default | `tone.component` / `base.transparent` | `tone.fgHi` | `tone.border` (outline only) |
| Hovered | `tone.componentHover` | `tone.fgHi` | - |
| Pressed | `tone.componentActive` | `tone.fgHi` | - |

### 3. Size Variants

**Q3.1: What size variants are supported?**

| Size | Supported | Padding (inline/block) | Font Size | Line Height | Min Height | Notes |
|------|-----------|------------------------|-----------|-------------|------------|-------|
| `md` | Yes | `space['200']` / `space['50']` | `fontSizes.sm` | `fontSizes.md` | `control.md` | Default size |
| `lg` | Yes | `space['300']` / `space['100']` | `fontSizes.md` | `fontSizes.lg` | `control.lg` | Larger touch target |
| `md-equal` | Yes | `space['50']` all | - | - | `control.md` | Square, icon-only |
| `lg-equal` | Yes | `space['100']` all | - | - | `control.lg` | Square, icon-only large |

### 4. Spacing & Alignment

**Q4.1: What is the padding model?**

| Size | Inline Padding | Block Padding | Gap | Purpose |
|------|---------------|---------------|-----|---------|
| `md` | `space['200']` (16px) | `space['50']` (4px) | `space['100']` (8px) | Standard button |
| `lg` | `space['300']` (24px) | `space['100']` (8px) | `space['100']` (8px) | Large button |
| `md-equal` | `space['50']` (4px) | `space['50']` (4px) | - | Icon-only square |
| `lg-equal` | `space['100']` (8px) | `space['100']` (8px) | - | Icon-only square large |

**Q4.2: How should content align?**
- Content centered horizontally and vertically (`alignItems: center`, `justifyContent: center`)
- Icon and text separated by gap (`space['100']`)
- Line height matches icon size for vertical alignment

### 5. Theme Tokens

**Q5.1: What tokens are used for each visual treatment?**

```tsx
// Solid variant (default)
tone.solid           // default background
tone.solidHover      // hovered background
tone.solidActive     // pressed background
tone.fgOnBlock       // text color

// Muted variant
tone.component       // default background
tone.componentHover  // hovered background
tone.componentActive // pressed background
tone.fgHi            // text color

// Outline variant
base.transparent     // default background
tone.componentHover  // hovered background
tone.componentActive // pressed background
tone.fgHi            // text color
tone.border          // border color

// Ghost variant
base.transparent     // default/hovered/pressed (background changes)
tone.componentHover  // hovered background
tone.componentActive // pressed background
tone.fgHi            // text color

// Clear variant
base.transparent     // all backgrounds
tone.fgHi            // text color

// Disabled state
disabled.background  // background
disabled.fg          // text

// Focus
focusVars.outlineColor  // focus ring color
focusVars.outlineOffset // focus ring offset
focusVars.outlineStyle  // focus ring style
focusVars.outlineSize   // focus ring width
base.white              // inner shadow for contrast
```

---

## File Structure

```
packages/action/button/
├── src/
│   ├── index.ts          # Re-exports
│   └── button.tsx        # Main component
├── llms.md               # Documentation for LLMs
├── package.json
└── tsconfig.json

packages/core/styles/
├── src/
│   ├── button.ts         # Shared button styles (sizes, shapes, variants)
│   ├── link.ts           # Link styles (may reuse button styles)
│   └── index.ts
├── package.json
└── tsconfig.json
```

---

## Implementation Checklist

- [x] Define component props extending React Aria types
- [x] Create StyleX styles for all visual states (in `@urban-ui/styles`)
- [x] Implement main component with styling
- [ ] Add pending state support with loading indicator
- [ ] Write tests for rendering and interactions
- [ ] Write type tests for prop types
- [ ] Create llms.md documentation
- [x] Export from package index

---

## Notes

### Accessibility Considerations

- Button uses `onPress` instead of `onClick` for normalized cross-browser/device interaction
- Pending state (`isPending`) keeps button focusable while showing loading indicator
- Loading spinner must remain in accessibility tree (use `opacity: 0` not `display: none`)
- For link-like navigation, use Link component instead of Button
- Focus ring uses `focusVars` tokens for consistent focus indication across the design system
- Disabled buttons use `cursor: not-allowed` to communicate non-interactivity

### Styling Considerations

- **Shared styles:** Button styles live in `@urban-ui/styles/button` to enable reuse by Link and other button-like components
- **No cursor: pointer:** Per urban-ui conventions, buttons do not use `cursor: pointer` (only links do)
- **Press feedback:** Subtle scale transform (`scale(0.98)`) on press for tactile feedback
- **Transition:** Smooth transitions on background, border-color, color (0.2s) and transform (0.1s)
- **Focus ring z-index:** Focus ring has `zIndex: 1` to appear above adjacent elements
- **Tone application:** Themes are applied via `themes[tone]` which sets the tone context for all `tone.*` tokens

### Shape Variants

| Shape | Border Radius | Use Case |
|-------|---------------|----------|
| `rounded` | `radii.lg` (8px) | Default, general purpose |
| `pill` | `radii.full` (9999px) | Tags, chips, soft UI |
| `square` | `radii.none` (0) | Sharp, technical UI |
