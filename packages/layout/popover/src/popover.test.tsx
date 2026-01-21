import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, Dialog } from 'react-aria-components'
import { DialogTrigger, OverlayArrow, Popover } from './index'

describe('Popover', () => {
  it('renders popover content when triggered', async () => {
    const user = userEvent.setup()

    render(
      <DialogTrigger>
        <Button>Open Popover</Button>
        <Popover>
          <Dialog aria-label="Popover content">Popover content</Dialog>
        </Popover>
      </DialogTrigger>
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
      </DialogTrigger>
    )

    // Open the popover
    await user.click(screen.getByRole('button', { name: 'Open Popover' }))
    expect(screen.getByText('Popover content')).toBeInTheDocument()

    // Press Escape
    await user.keyboard('{Escape}')

    // Popover should be closed
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })
})

describe('OverlayArrow', () => {
  it('renders an SVG arrow', async () => {
    const user = userEvent.setup()

    render(
      <DialogTrigger>
        <Button>Open Popover</Button>
        <Popover>
          <OverlayArrow data-testid="arrow" />
          <Dialog aria-label="Popover content">Content</Dialog>
        </Popover>
      </DialogTrigger>
    )

    await user.click(screen.getByRole('button', { name: 'Open Popover' }))

    const arrow = screen.getByTestId('arrow')
    expect(arrow).toBeInTheDocument()
    expect(arrow.querySelector('svg')).toBeInTheDocument()
  })

  it('accepts custom width and height', async () => {
    const user = userEvent.setup()

    render(
      <DialogTrigger>
        <Button>Open</Button>
        <Popover>
          <OverlayArrow width={16} height={8} data-testid="arrow" />
          <Dialog aria-label="Content">Content</Dialog>
        </Popover>
      </DialogTrigger>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))

    const svg = screen.getByTestId('arrow').querySelector('svg')
    expect(svg).toHaveAttribute('width', '16')
    expect(svg).toHaveAttribute('height', '8')
  })
})
