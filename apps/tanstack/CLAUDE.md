# Tanstack Demo App

Demo application for urban-ui components using TanStack Router.

## Route Generation

This app uses TanStack Router's file-based routing. The route tree is auto-generated.

**Important:** After adding new routes, linting and typecheck will fail until the route tree is regenerated. Run:

```bash
bun run build
```

This generates `src/routeTree.gen.ts` with the updated routes. The dev server also regenerates routes on file changes.

## Adding New Routes

1. Create a new route file at `src/routes/patterns/<component>/route.tsx`
2. Run `bun run build` to generate the route tree
3. Typecheck will pass after regeneration
