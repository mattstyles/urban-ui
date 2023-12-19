import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import {Checkbox, Group} from './index.tsx'

describe('[CheckboxGroup]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(
      <Group label='foo' data-testid='some-id'>
        <Checkbox value='bar' />
      </Group>,
    )

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })

  test('Checkbox must be a part of a group', async () => {
    expect(() => {
      render(<Checkbox data-testid='some-id' value='foo' />)
    }).toThrow()
  })
})
