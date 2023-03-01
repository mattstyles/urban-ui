import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Spacer} from './index'

test('loads and displays greeting', async () => {
  // ARRANGE
  const {container} = render(<Spacer />)

  // ACT

  // ASSERT
  const el = container.querySelector('div')
  expect(el).toBeInTheDocument()
})
