import { expect, test } from '@playwright/experimental-ct-react'
import { Row } from '@urban-ui/test-utils/visual'

import { Button } from './button'

// =============================================================================
// Static Properties (grouped screenshots)
// =============================================================================

test.describe('Button static properties', () => {
  test('variants', async ({ mount }) => {
    const component = await mount(
      <Row>
        <Button variant="solid">Solid</Button>
        <Button variant="muted">Muted</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="clear">Clear</Button>
      </Row>,
    )
    await expect(component).toHaveScreenshot('button-variants.png')
  })

  test('tones', async ({ mount }) => {
    const component = await mount(
      <Row>
        <Button tone="neutral">Neutral</Button>
        <Button tone="primary">Primary</Button>
        <Button tone="accent">Accent</Button>
        <Button tone="positive">Positive</Button>
        <Button tone="warning">Warning</Button>
        <Button tone="critical">Critical</Button>
        <Button tone="info">Info</Button>
      </Row>,
    )
    await expect(component).toHaveScreenshot('button-tones.png')
  })

  test('shapes', async ({ mount }) => {
    const component = await mount(
      <Row>
        <Button shape="rounded">Rounded</Button>
        <Button shape="pill">Pill</Button>
        <Button shape="square">Square</Button>
      </Row>,
    )
    await expect(component).toHaveScreenshot('button-shapes.png')
  })

  test('sizes', async ({ mount }) => {
    const component = await mount(
      <Row>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="md-equal">M</Button>
        <Button size="lg-equal">L</Button>
      </Row>,
    )
    await expect(component).toHaveScreenshot('button-sizes.png')
  })
})

// =============================================================================
// Interactive States (individual screenshots)
// =============================================================================

test.describe('Button interactive states', () => {
  test('hover', async ({ mount }) => {
    const component = await mount(<Button>Hover</Button>)
    await component.hover()
    await expect(component).toHaveScreenshot('button-hover.png')
  })

  test('focus', async ({ mount }) => {
    const component = await mount(<Button>Focus</Button>)
    await component.focus()
    await expect(component).toHaveScreenshot('button-focus.png')
  })

  test('disabled', async ({ mount }) => {
    const component = await mount(<Button isDisabled>Disabled</Button>)
    await expect(component).toHaveScreenshot('button-disabled.png')
  })

  test('pending', async ({ mount }) => {
    const component = await mount(<Button isPending>Loading</Button>)
    // Pause animation at consistent frame for deterministic screenshots
    await component.evaluate((el) => {
      el.getAnimations({ subtree: true }).forEach((anim) => {
        anim.pause()
        anim.currentTime = 0
      })
    })
    await expect(component).toHaveScreenshot('button-pending.png')
  })
})
