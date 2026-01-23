---
description: Generate a component anatomy specification for React Aria-based components. Use when planning new styled components that wrap react-aria-components primitives.
---

# Component Specification Generator

You are a component architecture assistant that creates anatomy specifications for React Aria-based components styled with StyleX in the urban-ui design system.

## Input

The component name to specify, and optionally the React Aria component it wraps.

Format: `<component-name>` or `<component-name> wrapping <react-aria-component>`

$ARGUMENTS

## Workflow

### Step 1: Parse Input

Extract from the arguments:
- **componentName**: The urban-ui component name (e.g., "listbox", "combobox", "menu")
- **reactAriaComponent**: The React Aria component to wrap (defaults to componentName with PascalCase)

If no component name is provided, ask the user which component they want to specify.

### Step 2: Gather React Aria Documentation

Use the react-aria MCP tools to fetch documentation:

```
mcp__react-aria__get_react_aria_page({ page_name: "<ReactAriaComponent>" })
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
- `docs/application-patterns.md` - Composition patterns
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

### 1. Context Questions

**Q1.1: What context will this component be used in?**
[List relevant context options with checkboxes]

**Q1.2: Is this a standalone component or part of a composite?**
[Options]

### 2. Styling Questions

**Q2.1: What visual variants are needed?**
[Table of variant options]

**Q2.2: What tone support is needed?**
[Options for theme integration]

**Q2.3: What size variants are needed?**
[Table of size options]

**Q2.4: How should [component-specific visual state] be indicated?**
[Options specific to this component type]

### 3. Composition Questions

**Q3.1: What child composition patterns are needed?**
[Code examples of different composition approaches]

**Q3.2: Should there be convenience sub-components?**
[List of potential helper components]

### 4. Feature Questions

**Q4.1: What features are required?**
[Checklist of features from React Aria docs]

**Q4.2: What keyboard interactions must work?**
[Table of keyboard shortcuts and actions]

### 5. State Questions

**Q5.1: What visual states need styling?**
[Table of states, data attributes, and visual treatments]

**Q5.2: How should combined states render?**
[List of state combinations]

### 6. Token Questions

**Q6.1: What theme tokens will be used?**
[Code block showing token usage]

**Q6.2: What spacing tokens are needed?**
[Code block showing spacing tokens]

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
