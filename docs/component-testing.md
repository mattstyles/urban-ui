# Component Testing

This document outlines the testing strategy for urban-ui components.

## Testing Philosophy

We use two complementary testing approaches:

| Concern | Tool | Purpose |
|---------|------|---------|
| Structure & Behavior | Jest + Testing Library | DOM structure, props, events, accessibility |
| Visual Appearance | Playwright | Screenshot comparison, CSS rendering |

This separation keeps tests focused. Jest tests run fast and verify logic. Playwright tests verify that components look correct in a real browser.

---

## Jest + Testing Library

Use Jest with React Testing Library for functional testing. These tests verify:

- Component renders correctly
- Props are applied
- Events fire as expected
- Accessibility attributes are present
- State changes work correctly

### Example Test

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, jest } from '@jest/globals'

import { Button } from './button'

describe('Button', () => {
  it('renders with text content', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('calls onPress when clicked', async () => {
    const user = userEvent.setup()
    const handlePress = jest.fn()
    render(<Button onPress={handlePress}>Click</Button>)

    await user.click(screen.getByRole('button'))
    expect(handlePress).toHaveBeenCalledTimes(1)
  })

  it('applies disabled state', () => {
    render(<Button isDisabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### Running Jest Tests

```bash
# Run all tests
bun run test

# Run tests for a specific package
bun run test --filter=@urban-ui/button

# Watch mode during development
cd packages/action/button && bun run test:watch
```

---

## Playwright Visual Testing

Use Playwright for visual regression testing. These tests capture screenshots and compare them against baselines to detect unintended visual changes.

### Why Playwright?

- **Real browser rendering** - StyleX CSS is actually applied
- **Local-first** - No cloud service dependency
- **Built-in visual diffing** - `toHaveScreenshot()` with configurable thresholds
- **Interaction states** - Can capture hover, focus, pressed states

### Docker for Consistent Screenshots

Browser rendering varies across operating systems due to font rendering, anti-aliasing, and other platform differences. To ensure screenshots match between local development and CI, we run visual tests inside Docker.

Playwright provides official Docker images based on Ubuntu with all browsers pre-installed.

#### Docker Image

Use the official Playwright image, pinned to match your installed Playwright version:

```bash
docker pull mcr.microsoft.com/playwright:v1.50.0-noble
```

**Important**: The Docker image version must match your project's Playwright version exactly. If they differ, Playwright cannot locate browser executables.

#### Running Visual Tests in Docker

```bash
# Run visual tests in Docker
docker run --rm -it \
  --ipc=host \
  -v $(pwd):/work \
  -w /work \
  mcr.microsoft.com/playwright:v1.50.0-noble \
  npx playwright test --project=visual

# Update baseline screenshots
docker run --rm -it \
  --ipc=host \
  -v $(pwd):/work \
  -w /work \
  mcr.microsoft.com/playwright:v1.50.0-noble \
  npx playwright test --project=visual --update-snapshots
```

**Flags explained**:
- `--rm` - Remove container after exit
- `-it` - Interactive terminal
- `--ipc=host` - Prevents Chromium crashes from shared memory issues
- `-v $(pwd):/work` - Mount current directory into container
- `-w /work` - Set working directory

#### NPM Scripts (Recommended)

Add these scripts to the root `package.json` for convenience:

```json
{
  "scripts": {
    "test:visual": "docker run --rm -it --ipc=host -v $(pwd):/work -w /work mcr.microsoft.com/playwright:v1.50.0-noble bunx playwright test --project=visual",
    "test:visual:update": "docker run --rm -it --ipc=host -v $(pwd):/work -w /work mcr.microsoft.com/playwright:v1.50.0-noble bunx playwright test --project=visual --update-snapshots"
  }
}
```

### Writing Visual Tests

Playwright provides two relevant features for visual testing:

1. **`toHaveScreenshot()`** - A stable assertion from `@playwright/test` that captures and compares screenshots. This is the core visual comparison API.

2. **Component Testing (`mount()`)** - An [experimental feature](https://playwright.dev/docs/test-components) from `@playwright/experimental-ct-react` that lets you render React components directly in a real browser without spinning up a dev server.

We use experimental component testing because it's convenient for a component library - we can mount components in isolation without creating test pages. The `toHaveScreenshot()` assertion itself is stable.

```tsx
import { test, expect } from '@playwright/experimental-ct-react'
import { Button } from './button'

test.describe('Button visual', () => {
  test('default appearance', async ({ mount }) => {
    const component = await mount(<Button>Click me</Button>)
    await expect(component).toHaveScreenshot('button-default.png')
  })

  test('primary tone', async ({ mount }) => {
    const component = await mount(<Button tone="primary">Primary</Button>)
    await expect(component).toHaveScreenshot('button-primary.png')
  })

  test('hover state', async ({ mount }) => {
    const component = await mount(<Button>Hover me</Button>)
    await component.hover()
    await expect(component).toHaveScreenshot('button-hover.png')
  })

  test('disabled state', async ({ mount }) => {
    const component = await mount(<Button isDisabled>Disabled</Button>)
    await expect(component).toHaveScreenshot('button-disabled.png')
  })
})
```

### Screenshot Configuration

Configure screenshot comparison in `playwright.config.ts`:

```ts
import { defineConfig } from '@playwright/experimental-ct-react'

export default defineConfig({
  // Only run visual tests in this project
  projects: [
    {
      name: 'visual',
      testMatch: '**/*.visual.test.tsx',
    },
  ],

  expect: {
    toHaveScreenshot: {
      // Allow small pixel differences (anti-aliasing, subpixel rendering)
      maxDiffPixels: 50,

      // Or use percentage threshold
      // maxDiffPixelRatio: 0.01,
    },
  },

  // Use single browser for consistency
  use: {
    browserName: 'chromium',
  },
})
```

### Screenshot Organization

Screenshots are stored alongside tests in a `__snapshots__` directory:

```
packages/action/button/
├── src/
│   ├── button.tsx
│   ├── button.test.tsx           # Jest functional tests
│   └── button.visual.test.tsx    # Playwright visual tests
└── __snapshots__/
    ├── button-default.png
    ├── button-primary.png
    ├── button-hover.png
    └── button-disabled.png
```

### Workflow

1. **Write visual test** - Create `component.visual.test.tsx`
2. **Generate baselines** - Run with `--update-snapshots` in Docker
3. **Commit baselines** - Check in the PNG files
4. **CI verification** - Tests compare against committed baselines
5. **Update when needed** - Re-run with `--update-snapshots` for intentional changes

### Best Practices

- **Test components in isolation** - One component per screenshot, minimal context
- **Use descriptive names** - `button-primary-hover.png` not `screenshot-1.png`
- **Set reasonable thresholds** - A few pixels of variance is normal
- **Separate visual from functional** - Use `.visual.test.tsx` suffix
- **Review diffs carefully** - Understand why screenshots changed before updating

---

## CI Integration

In CI, run visual tests using the same Docker image:

```yaml
# GitHub Actions example
jobs:
  visual-tests:
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.50.0-noble
      options: --ipc=host
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: npx playwright test --project=visual
```

This ensures CI uses the exact same environment as local Docker runs.

---

## File Naming Conventions

| File | Purpose |
|------|---------|
| `component.test.tsx` | Jest functional tests |
| `component.visual.test.tsx` | Playwright visual tests |
| `component.typetest.tsx` | TypeScript type tests |

---

## More Resources

- [Playwright Visual Comparisons](https://playwright.dev/docs/test-snapshots)
- [Playwright Docker](https://playwright.dev/docs/docker)
- [Playwright Component Testing](https://playwright.dev/docs/test-components)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
