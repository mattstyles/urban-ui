import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {<%= exportName %>} from './index.tsx'

describe('[<%= exportName %>]', () => {
  test('Forwards the testid', async () => {
    // ARRANGE
    render(<<%= exportName %> data-testid='some-id' />)

    // ACT

    // ASSERT
    const el = await screen.findByTestId('some-id')
    expect(el).toBeInTheDocument()
  })
})
