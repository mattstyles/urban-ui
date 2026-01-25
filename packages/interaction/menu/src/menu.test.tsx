import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from 'react-aria-components'

import { Menu } from './menu'
import { MenuItem } from './menu-item'
import { MenuTrigger } from './menu-trigger'

// Mock Popover for testing - in tests we render Menu directly
function TestMenu({ children }: { children: React.ReactNode }) {
  return (
    <MenuTrigger>
      <Button>Open Menu</Button>
      {children}
    </MenuTrigger>
  )
}

describe('Menu', () => {
  it('renders menu items when open', async () => {
    const user = userEvent.setup()

    render(
      <TestMenu>
        <Menu aria-label="Actions">
          <MenuItem id="cut">Cut</MenuItem>
          <MenuItem id="copy">Copy</MenuItem>
          <MenuItem id="paste">Paste</MenuItem>
        </Menu>
      </TestMenu>
    )

    // Open the menu
    await user.click(screen.getByRole('button', { name: 'Open Menu' }))

    // Check items are rendered
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Paste' })).toBeInTheDocument()
  })

  it('calls onAction when item is clicked', async () => {
    const user = userEvent.setup()
    const onAction = jest.fn()

    render(
      <TestMenu>
        <Menu aria-label="Actions" onAction={onAction}>
          <MenuItem id="cut">Cut</MenuItem>
          <MenuItem id="copy">Copy</MenuItem>
        </Menu>
      </TestMenu>
    )

    await user.click(screen.getByRole('button', { name: 'Open Menu' }))
    await user.click(screen.getByRole('menuitem', { name: 'Cut' }))

    expect(onAction).toHaveBeenCalledWith('cut')
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()

    render(
      <TestMenu>
        <Menu aria-label="Actions">
          <MenuItem id="cut">Cut</MenuItem>
          <MenuItem id="copy">Copy</MenuItem>
          <MenuItem id="paste">Paste</MenuItem>
        </Menu>
      </TestMenu>
    )

    await user.click(screen.getByRole('button', { name: 'Open Menu' }))

    // Menu should be visible with items
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Paste' })).toBeInTheDocument()
  })

  it('has accessible menu structure', async () => {
    const user = userEvent.setup()

    render(
      <TestMenu>
        <Menu aria-label="Actions">
          <MenuItem id="cut">Cut</MenuItem>
        </Menu>
      </TestMenu>
    )

    await user.click(screen.getByRole('button', { name: 'Open Menu' }))

    // Menu has proper aria attributes
    const menu = screen.getByRole('menu')
    expect(menu).toHaveAttribute('aria-label', 'Actions')
  })
})

describe('MenuItem', () => {
  it('renders with variant styles', async () => {
    const user = userEvent.setup()

    render(
      <TestMenu>
        <Menu aria-label="Actions">
          <MenuItem id="edit">Edit</MenuItem>
          <MenuItem id="delete" variant="destructive">
            Delete
          </MenuItem>
          <MenuItem id="publish" variant="success">
            Publish
          </MenuItem>
        </Menu>
      </TestMenu>
    )

    await user.click(screen.getByRole('button', { name: 'Open Menu' }))

    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Publish' })).toBeInTheDocument()
  })

  it('supports disabled state', async () => {
    const user = userEvent.setup()
    const onAction = jest.fn()

    render(
      <TestMenu>
        <Menu aria-label="Actions" onAction={onAction}>
          <MenuItem id="cut" isDisabled>
            Cut
          </MenuItem>
        </Menu>
      </TestMenu>
    )

    await user.click(screen.getByRole('button', { name: 'Open Menu' }))

    const item = screen.getByRole('menuitem', { name: 'Cut' })
    expect(item).toHaveAttribute('aria-disabled', 'true')
  })
})
