---
description: Generate a component anatomy specification for React Aria-based components. Use when planning new styled components that wrap react-aria-components primitives.
---

# Component Specification Generator

You are a component architecture assistant that creates anatomy specifications for React Aria-based components styled with StyleX in the urban-ui design system.

## Input

The component name to specify, and optionally a link to the React Aria component documentation page.

Format: `<component-name>` or `<component-name> <react-aria-docs-url>`

$ARGUMENTS

## Workflow

### Step 1: Parse Input

Extract from the arguments:
- **componentName**: The urban-ui component name (e.g., "listbox", "combobox", "menu")
- **docsUrl**: URL to the React Aria component documentation page (optional)

If no component name is provided, ask the user which component they want to specify.

### Step 2: Gather React Aria Documentation

If a documentation URL was not provided, prompt the user for it:

> Please provide the URL to the React Aria component documentation page.
> Example: `https://react-spectrum.adobe.com/react-aria/ListBox.md`

Once you have the URL, use WebFetch to retrieve the page content:

```
WebFetch({ url: "<docs-url>", prompt: "Extract the full documentation content" })
```

Extract from the documentation:
- Component description and purpose
- API structure (component tree)
- All component parts and their props
- Render props for state access
- Usage examples
- Accessibility considerations

### Step 3: Gather Project Context

Read these project files for context:
- `docs/stylex-authoring-guide.md` - Styling patterns
- `packages/core/theme/llms.md` - Theme tokens
- `packages/action/button/src/button.tsx` - Reference component implementation

### Step 4: Generate Specification Document

Create a specification document at `docs/<component-name>.spec.md` following this structure:

---

```markdown
# <ComponentName> Component Specification

This document specifies the anatomy of a <ComponentName> component, providing a template for component generation.

## Overview

[Brief description of what the component does, derived from React Aria docs]

---

## Anatomy

### Component Tree

[ASCII tree showing component hierarchy]

```
ComponentName
├── SubComponent
│   ├── ChildElement
│   └── ChildElement
└── SubComponent
```

### Visual Hierarchy

[ASCII diagram showing visual layout]

```
┌─────────────────────────────────────────┐
│ Container                               │
│ ┌─────────────────────────────────────┐ │
│ │ Item                                │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## Usage Examples

### Basic Usage

[Minimal example with imports]

### With Additional Features

[Examples showing slots, sections, or other features]

### Dynamic Collection

[Example with items prop and render function, if applicable]

---

## Component Breakdown

### <MainComponent> (Container)

[Description of responsibilities]

**Key Props from React Aria:**
| Prop | Type | Description |
|------|------|-------------|
| ... | ... | ... |

### <SubComponent>

[For each sub-component, list responsibilities and key props]

**Render Props (from React Aria):**
| Prop | Type | Description |
|------|------|-------------|
| ... | ... | ... |

---

## Questions for Implementation

> **Note:** All functionality (selection modes, keyboard interactions, accessibility features) is inherited verbatim from React Aria Components. These questions focus on defining the visual language for the component.

### 1. Context & Composition

**Q1.1: What context will this component be used in?**
[Inline, dropdown, both — affects container styling]

**Q1.2: Is this standalone or part of a composite?**
[Standalone export vs internal to another component]

**Q1.3: What child composition patterns are needed?**
[Simple text, slotted content, custom content]

### 2. Visual States

For each state exposed by React Aria, define the visual treatment:

| State | Data Attribute | Background | Text | Border | Other |
|-------|---------------|------------|------|--------|-------|
| Default | - | | | | |
| Hovered | `[data-hovered]` | | | | |
| Focused | `[data-focused]` | | | | |
| Focus Visible | `[data-focus-visible]` | | | | |
| Pressed | `[data-pressed]` | | | | |
| Selected | `[data-selected]` | | | | |
| Selected + Hovered | `[data-selected][data-hovered]` | | | | |
| Selected + Pressed | `[data-selected][data-pressed]` | | | | |
| Disabled | `[data-disabled]` | | | | |

[Fill in the visual treatment for each state using theme tokens]

### 3. Size Variants

**Q3.1: What size variants are supported?**

| Size | Supported | Padding | Font Size | Notes |
|------|-----------|---------|-----------|-------|
| `sm` | | | | |
| `md` | | | | |
| `lg` | | | | |

### 4. Spacing & Alignment

**Q4.1: What is the padding model?**

| Element | Inline Padding | Block Padding | Purpose |
|---------|---------------|---------------|---------|
| Container | | | |
| Item | | | |
| Section | | | |
| Header | | | |

**Q4.2: How should content align?**
[Describe alignment requirements for text, icons, indicators]

### 5. Theme Tokens

**Q5.1: What tokens are used for each visual treatment?**

```tsx
// Unselected states
[token]  // default
[token]  // hovered
[token]  // pressed

// Selected states
[token]  // selected
[token]  // selected + hovered
[token]  // selected + pressed

// Text
[token]  // primary text
[token]  // secondary text
[token]  // text on selected

// Other
[token]  // disabled
[token]  // focus ring
```

---

## File Structure

```
packages/<category>/<component-name>/
├── src/
│   ├── index.ts
│   ├── <component-name>.tsx
│   ├── <sub-component>.tsx
│   ├── styles.ts
│   └── types.ts
├── llms.md
├── package.json
└── tsconfig.json
```

---

## Implementation Checklist

- [ ] Define component props extending React Aria types
- [ ] Create StyleX styles for all visual states
- [ ] Implement main component with styling
- [ ] Implement sub-components with state-based styling
- [ ] Add convenience components if needed
- [ ] Write tests for rendering and interactions
- [ ] Write type tests for prop types
- [ ] Create llms.md documentation
- [ ] Export from package index

---

## Notes

### Accessibility Considerations

[List accessibility notes from React Aria docs]

### Styling Considerations

[List urban-ui specific styling patterns]
```

---

### Step 5: Ask Clarifying Questions

After generating the specification, ask the user if they want to:
1. Answer any of the implementation questions now
2. Add additional examples or use cases
3. Specify particular features or constraints
4. Proceed to implementation

## Component Categories

Use these categories for file structure:
- `action/` - Buttons, toggles, interactive actions
- `input/` - Form inputs, text fields, checkboxes
- `interaction/` - Select, combobox, menus
- `layout/` - Containers, grids, dividers
- `feedback/` - Alerts, toasts, progress
- `navigation/` - Tabs, breadcrumbs, links
- `utility/` - Modals, popovers, tooltips

If the new component does not fit into one of these categories, then we need to prompt for a new category type, or, at least, confirm the category at the end of the flow.

## Standard Props Pattern

Urban-UI components follow these prop conventions:
- `variant` - Visual style (solid, muted, outline, ghost, clear)
- `tone` - Color semantic (neutral, primary, accent, positive, warning, critical, info)
- `size` - Size scale (sm, md, lg)
- `shape` - Border radius (rounded, pill, square)
- `style` - StyleX styles override

## State Styling Pattern

Use data attributes from React Aria for styling:
```tsx
const styles = stylex.create({
  item: {
    backgroundColor: {
      default: 'transparent',
      ':is([data-hovered], :hover)': tone.componentHover,
      ':is([data-pressed], :active)': tone.componentActive,
      ':is([data-selected])': accent.solid,
      ':is([data-disabled])': disabled.background,
    },
  },
})
```

## Example Usage

```
/component-spec listbox
/component-spec combobox wrapping ComboBox
/component-spec menu wrapping Menu
/component-spec select wrapping Select
```
