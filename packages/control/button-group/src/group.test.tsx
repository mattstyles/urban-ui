import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import {ButtonGroup} from './group.tsx'

describe('[ButtonGroup]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<ButtonGroup data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
    expect(el).toHaveAttribute('role', 'toolbar')
  })

  test('Handles orientation', async () => {
    render(
      <>
        <ButtonGroup data-testid='horizontal' />
        <ButtonGroup data-testid='vertical' orientation='v' />
      </>,
    )

    expect(await screen.findByTestId('horizontal')).toHaveAttribute(
      'aria-orientation',
      'horizontal',
    )
    expect(await screen.findByTestId('vertical')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    )
  })
})
