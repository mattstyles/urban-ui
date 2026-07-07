---
tags: [theme, tokens, philosophy]
prose-ignore: [defineVars, createTheme]
---

# Theme — token philosophy

> **Stub.** The current token set is a deliberately small placeholder proving
> the style pipeline ([[0005-style-shipping-and-package-build]]); the real
> token architecture (scales, tones, semantic layers) is designed with the
> design-system structural rules and will replace it.

## Principles (to be expanded)

- Tokens are StyleX `defineVars` groups in `*.stylex.ts` modules; consumers
  and components import them from `@urban-ui/theme/tokens.stylex` directly —
  never through re-exports, which the StyleX compiler cannot resolve.
- Components style exclusively through tokens; raw values in component styles
  are a review error.
- Theming is `createTheme` over the published var groups — the group is the
  public contract, individual CSS custom property names are not.
