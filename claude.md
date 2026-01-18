# Urban-UI

React 19 design system monorepo. Accessibility-first components built on React Aria with StyleX styling.
Project is AI-first.

## Commands

```bash
bun install          # Install dependencies
bun run build        # Build all packages
bun run test         # Run tests
bun run lint         # Lint with Biome
bun run typecheck    # TypeScript checks
bun run format       # Format with Biome
```

## Structure

- `packages/{category}/{component}/` - UI components (action, core, layout, typography, feedback, navigation, display)
- `apps/` - Applications
- `scripts` - Various scripts to run the project
- `tooling` - Shared tooling for packages

## Component Conventions

- RSC ready
- Standard props: `variant`, `tone`, `size`, `shape`
- Tones: neutral, primary, accent, positive, warning, critical, info
- Tests: `*.test.tsx` (Jest + happy-dom)
- Type tests: `*.typetest.tsx` (expect-type)

## Code Style (Biome)

- Single quotes JS, double quotes JSX
- Semicolons as-needed
- Imports: node → packages → local (blank line before local)
- Use Biome for linting and formatting

## Tech Stack

React 19, TypeScript 5.9, StyleX 0.11, rslib, Turbo, Biome, Jest, Node 24+, Bun 1.3.6+
