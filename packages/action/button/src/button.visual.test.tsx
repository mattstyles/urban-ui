import { expect, test } from '@playwright/experimental-ct-react'

import { Button } from './button'

test.describe('Button variants', () => {
  test('solid variant', async ({ mount }) => {
    const component = await mount(<Button variant="solid">Solid</Button>)
    await expect(component).toHaveScreenshot('button-solid.png')
  })

  test('muted variant', async ({ mount }) => {
    const component = await mount(<Button variant="muted">Muted</Button>)
    await expect(component).toHaveScreenshot('button-muted.png')
  })

  test('outline variant', async ({ mount }) => {
    const component = await mount(<Button variant="outline">Outline</Button>)
    await expect(component).toHaveScreenshot('button-outline.png')
  })

  test('ghost variant', async ({ mount }) => {
    const component = await mount(<Button variant="ghost">Ghost</Button>)
    await expect(component).toHaveScreenshot('button-ghost.png')
  })

  test('clear variant', async ({ mount }) => {
    const component = await mount(<Button variant="clear">Clear</Button>)
    await expect(component).toHaveScreenshot('button-clear.png')
  })
})

test.describe('Button tones', () => {
  test('neutral tone', async ({ mount }) => {
    const component = await mount(<Button tone="neutral">Neutral</Button>)
    await expect(component).toHaveScreenshot('button-tone-neutral.png')
  })

  test('primary tone', async ({ mount }) => {
    const component = await mount(<Button tone="primary">Primary</Button>)
    await expect(component).toHaveScreenshot('button-tone-primary.png')
  })

  test('accent tone', async ({ mount }) => {
    const component = await mount(<Button tone="accent">Accent</Button>)
    await expect(component).toHaveScreenshot('button-tone-accent.png')
  })

  test('positive tone', async ({ mount }) => {
    const component = await mount(<Button tone="positive">Positive</Button>)
    await expect(component).toHaveScreenshot('button-tone-positive.png')
  })

  test('warning tone', async ({ mount }) => {
    const component = await mount(<Button tone="warning">Warning</Button>)
    await expect(component).toHaveScreenshot('button-tone-warning.png')
  })

  test('critical tone', async ({ mount }) => {
    const component = await mount(<Button tone="critical">Critical</Button>)
    await expect(component).toHaveScreenshot('button-tone-critical.png')
  })

  test('info tone', async ({ mount }) => {
    const component = await mount(<Button tone="info">Info</Button>)
    await expect(component).toHaveScreenshot('button-tone-info.png')
  })
})

test.describe('Button shapes', () => {
  test('rounded shape', async ({ mount }) => {
    const component = await mount(<Button shape="rounded">Rounded</Button>)
    await expect(component).toHaveScreenshot('button-shape-rounded.png')
  })

  test('pill shape', async ({ mount }) => {
    const component = await mount(<Button shape="pill">Pill</Button>)
    await expect(component).toHaveScreenshot('button-shape-pill.png')
  })

  test('square shape', async ({ mount }) => {
    const component = await mount(<Button shape="square">Square</Button>)
    await expect(component).toHaveScreenshot('button-shape-square.png')
  })
})

test.describe('Button sizes', () => {
  test('md size', async ({ mount }) => {
    const component = await mount(<Button size="md">Medium</Button>)
    await expect(component).toHaveScreenshot('button-size-md.png')
  })

  test('lg size', async ({ mount }) => {
    const component = await mount(<Button size="lg">Large</Button>)
    await expect(component).toHaveScreenshot('button-size-lg.png')
  })

  test('md-equal size', async ({ mount }) => {
    const component = await mount(<Button size="md-equal">M</Button>)
    await expect(component).toHaveScreenshot('button-size-md-equal.png')
  })

  test('lg-equal size', async ({ mount }) => {
    const component = await mount(<Button size="lg-equal">L</Button>)
    await expect(component).toHaveScreenshot('button-size-lg-equal.png')
  })
})

test.describe('Button states', () => {
  test('disabled state', async ({ mount }) => {
    const component = await mount(<Button isDisabled>Disabled</Button>)
    await expect(component).toHaveScreenshot('button-disabled.png')
  })

  test('pending state', async ({ mount }) => {
    const component = await mount(<Button isPending>Loading</Button>)
    // Wait for spinner animation to be at a consistent frame
    await component.evaluate((el) => {
      el.getAnimations({ subtree: true }).forEach((anim) => {
        anim.pause()
        anim.currentTime = 0
      })
    })
    await expect(component).toHaveScreenshot('button-pending.png')
  })
})

test.describe('Button interactions', () => {
  test('hover state', async ({ mount }) => {
    const component = await mount(<Button>Hover me</Button>)
    await component.hover()
    await expect(component).toHaveScreenshot('button-hover.png')
  })

  test('focus state', async ({ mount }) => {
    const component = await mount(<Button>Focus me</Button>)
    await component.focus()
    await expect(component).toHaveScreenshot('button-focus.png')
  })
})

test.describe('Button combinations', () => {
  test('outline + critical + pill', async ({ mount }) => {
    const component = await mount(
      <Button variant="outline" tone="critical" shape="pill">
        Delete
      </Button>,
    )
    await expect(component).toHaveScreenshot('button-outline-critical-pill.png')
  })

  test('muted + positive + lg', async ({ mount }) => {
    const component = await mount(
      <Button variant="muted" tone="positive" size="lg">
        Confirm
      </Button>,
    )
    await expect(component).toHaveScreenshot('button-muted-positive-lg.png')
  })
})
