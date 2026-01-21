import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, Dialog } from 'react-aria-components'

import { DialogTrigger, Popover } from './index'

describe('Popover', () => {
  it('renders popover content when triggered', async () => {
    const user = userEvent.setup()

    render(
      <DialogTrigger>
        <Button>Open Popover</Button>
        <Popover>
          <Dialog aria-label="Popover content">Popover content</Dialog>
        </Popover>
      </DialogTrigger>,
    )

    // Popover should not be visible initially
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()

    // Click the trigger
    await user.click(screen.getByRole('button', { name: 'Open Popover' }))

    // Popover should now be visible
    expect(screen.getByText('Popover content')).toBeInTheDocument()
  })

  it('closes when pressing Escape', async () => {
    const user = userEvent.setup()

    render(
      <DialogTrigger>
        <Button>Open Popover</Button>
        <Popover>
          <Dialog aria-label="Popover content">Popover content</Dialog>
        </Popover>
      </DialogTrigger>,
    )

    // Open the popover
    await user.click(screen.getByRole('button', { name: 'Open Popover' }))
    expect(screen.getByText('Popover content')).toBeInTheDocument()

    // Press Escape
    await user.keyboard('{Escape}')

    // Popover should be closed
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })

  it('renders arrow when showArrow is true', async () => {
    const user = userEvent.setup()

    render(
      <DialogTrigger>
        <Button>Open Popover</Button>
        <Popover showArrow>
          <Dialog aria-label="Popover content">Content</Dialog>
        </Popover>
      </DialogTrigger>,
    )

    await user.click(screen.getByRole('button', { name: 'Open Popover' }))

    // Arrow should be rendered with an SVG
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('does not render arrow by default', async () => {
    const user = userEvent.setup()

    render(
      <DialogTrigger>
        <Button>Open Popover</Button>
        <Popover>
          <Dialog aria-label="Popover content">Content</Dialog>
        </Popover>
      </DialogTrigger>,
    )

    await user.click(screen.getByRole('button', { name: 'Open Popover' }))

    // Arrow should not be rendered
    const svg = document.querySelector('svg')
    expect(svg).not.toBeInTheDocument()
  })
})
