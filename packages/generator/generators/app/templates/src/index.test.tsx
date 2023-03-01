import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {<%= exportName %>} from './index'

test('loads and displays greeting', async () => {
  // ARRANGE
  render(<<%= exportName %> />)

  // ACT

  // ASSERT
  const el = await screen.findByTestId('some-test-id')
  expect(el).toBeInTheDocument()
})
