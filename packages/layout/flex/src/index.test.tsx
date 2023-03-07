import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'

import {Flex} from './index'

describe('[Flex] check for component style properties', () => {
  //  This test really has very little value and only asserts that stitches is correctly applying the default class.
  // Stitches won't output any actual CSS to jsdom so we can not check on applied styles, but maybe we shouldn't do that anyway. https://github.com/stitchesjs/stitches/issues/874
  test('Checks that the flex component has properties', async () => {
    // ARRANGE
    render(<Flex data-testid='test' />)

    // ASSERT
    const el = screen.getByTestId('test')
    expect(el).toHaveAttribute(
      'class',
      expect.stringContaining('orientation-h')
    )
  })
})
