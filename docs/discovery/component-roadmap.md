---
tags: [discovery, components, roadmap]
---

# Component roadmap

Pre-plan capture of the react-aria component triage from the PR 50 design-language review: every react-aria component sorted by how cleanly it falls out of the design language as written. The tiers and the ordering within them form the initial build roadmap. **This is discovery, not a plan** — it gets refined into a plan while the initial `@urban-ui/theme` build lands, and everything here is blocked behind the [blockers](#blockers) and that theme build.

Triage method: each component assessed against the contract ([[theme-contract]]), the guidelines ([[theme-guidelines]]), and the rule register ([[design-language]]), using react-aria's actual render-state surface (the `react-aria` skill catalogue) as ground truth. React-aria's render-prop styling model composes cleanly with StyleX conditional styles and the state grammar — states arrive as booleans, no data-attribute selector gymnastics.

## Blockers

Ordered by how soon they bite. All component work sits behind these plus the initial theme build (post-merge of PR 50).

| # | blocker | bites | owner |
|---|---|---|---|
| 1 | **Prop grammar / `variant`** — the primitive prop grammar is declared system-defined ([[product-framing]]) but no doc defines the `variant` vocabulary or its mapping to scales/bands | the very first component API — Button can't be written without it | unowned |
| 2 | **Well/track surface** — TextField, NumberField, SearchField, Slider, Switch, ProgressBar, Meter, DropZone all want a recessed input/track surface | first form/control tranche; the well-surface watch's evidence bar is met immediately | watch in [[design-language]] |
| 3 | **Motion tokens** — react-aria hands `entering`/`exiting` to every overlay expecting animation | the entire overlay tier (Modal, Popover, Tooltip, Toast), Disclosure, indeterminate progress | urban-ui-ed9 |
| 4 | **Focus-ring mechanism on cut silhouettes** — structural focus rings vs clip-path polygons: CSS `outline` traces the border-box, not the cut; the ring needs the polygon machinery | any cut interactive element | urban-ui-6yb owns the *vars*; the rendering mechanism is unowned |
| 5 | **Range-span vocabulary** — `selected` covers a cell, nothing covers a span (selection-start/middle/end) | RangeCalendar, DateRangePicker, range Slider | unowned; can wait |
| 6 | **Line-weight/style vocabulary** — edge band has colours but no widths; shape strokes need widths; DropZone wants the dashed affordance | DropZone, shape rendering polish | unowned; can wait |

Blocker ordering is open — #1 is third by component-count but arguably first by dependency (nothing ships without an API grammar).

## Tier 1 — trivial

The design language as written answers every question. Build order within the tier is roughly as listed: controls first (they prove the prop grammar), then layout, then collections, then overlays (gated on blocker 3).

| components | notes |
|---|---|
| Button · ToggleButton · ToggleButtonGroup · FileTrigger | The archetypal conforming components: solid-leaning control, `action` voice, gesture union + `selected`, advance/recede emphasis. First build — proves the prop grammar (blocker 1). |
| Link · Breadcrumbs | Nav-current renders as `selected` ([[state-grammar]]) — fully resolved. |
| Tabs | `selected` + edge band (`line` advances) is the indicator; orientation free. |
| Group · Toolbar · Separator · Form | Pure gap/inset trios + `line`. Near-zero design surface. |
| Menu · ListBox · GridList | Selection/hover via `selected` + advance lifts; `overlay` face for Menu. |
| Tooltip · Popover · Modal | The plane model pre-solved these (child planes, scrim from `shade`, `overlay` face). Gated only on motion (blocker 3). |
| Checkbox · CheckboxGroup · RadioGroup | `indeterminate` is a component-owned glyph per the grammar's growth test. Residual: min-size-vs-cut at `sm` (see accepted consequences). |
| Autocomplete · Virtualizer | Composition/behaviour wrappers; little to no styling surface. |

## Tier 2 — moderate

Good fit, but each lands on a named blocker or open slot.

| components | what it hits |
|---|---|
| TextField · SearchField · NumberField | `invalid` now in the grammar; remaining: input background (blocker 2), placeholder colour (unspecified — presumably `inkTertiary`). |
| Switch · Slider · ProgressBar · Meter | The track/well cluster (blocker 2). Slider adds `dragging` (component-owned) and a thumb focus ring (blocker 4). |
| Select · ComboBox | Field tensions + solved popover/listbox; `expanded` question on the trigger (open question below). |
| Disclosure · DisclosureGroup · Tree | `expanded` (open question below) + expansion motion (blocker 3). |
| Toast | Plane model fits (non-modal child plane / queue region); unshippable without motion (blocker 3). |
| TagGroup | Smallest interactive elements — min-size invariant, remove-button focus rings (blocker 4). |
| Table | The flagship specimen — named priority composed component ([[product-framing]]); selection/sort solved. Residual: column-resize visuals, sticky headers vs the layer model, row-striping vocabulary. High effort, high alignment — the right early proving-ground piece. |

## Tier 3 — tension

The system as written pushes back; sequence these last.

| components | the problem |
|---|---|
| Calendar · RangeCalendar · DatePicker · DateRangePicker · DateField · TimeField | `invalid`/`unavailable`/`placeholder` now answered by the grammar and its growth test, but **range spans** have no vocabulary (blocker 5), and the composition depth (field + button + popover + grid) multiplies every open slot at once. Sequence after blockers 2 and 3 land. |
| DropZone + DnD across GridList/Table/Tree | `drop-target`/`dragging`/insertion indicators are component-owned per the growth test but zero guidance exists; the dashed affordance needs blocker 6. |
| ColorArea · ColorField · ColorPicker · ColorSlider · ColorSwatch · ColorSwatchPicker · ColorWheel | Inherently token-exogenous — gradient fields and swatches *are* arbitrary values, outside what the system governs (sanctioned per the deviation model). The loupe/thumb over arbitrary colour is the materials arbitrary-backdrop contract working as designed. Low archetype priority; genuinely useful for the theming labs. |

## Open questions

- **`expanded` admission.** It passes the grammar's growth test (persistent mode ✓, spans Disclosure/Tree/Select/ComboBox/Menu triggers ✓, composes with gestures ✓) — the first candidate at the door, arriving with the first Disclosure or Tree. Admit now (consistent with the `invalid` reasoning: certain, not speculative) or let the first Tree be the evidence. Leaning admit.
- **Blocker ordering** — see note under Blockers.

## Accepted consequences (flag, don't fix)

- **Cut-min-size at control scale**: the smallest controls (checkboxes, radios, switch thumbs, tag removes, slider thumbs at `xs`/`sm`) simply don't get cuts — the flagship's geometric identity at that scale is carried by emission/colour instead. Deliberate, worth stating in the flagship docs eventually.
- **Colour components stay exogenous**: no attempt to tokenise their internals.
