import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Spacer} from './index'

test('loads and displays greeting', async () => {
  // ARRANGE
  const str = 'Hello world'
  render(<Spacer str={str} />)

  // ACT

  // ASSERT
  const el = await screen.findByTestId('other-id')
  expect(el).toHaveTextContent(str)
})
