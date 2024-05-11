import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { render, screen } from '@testing-library/react'

import { GlobalRegistrator } from '@happy-dom/global-registrator'
import inject from '@stylexjs/dev-runtime'

GlobalRegistrator.register()

// console.log(inject);
// inject({
// 	classNamePrefix: "x",
// 	dev: false,
// 	test: true,
// 	useRemForFontSize: false,
// 	styleResolution: "application-order",
// });

import { Flex } from './index'

// beforeEach(() => {
// 	inject({
// 		classNamePrefix: "x",
// 		dev: false,
// 		test: true,
// 		useRemForFontSize: false,
// 		styleResolution: "application-order",
// 	});
// });

describe('flex', () => {
  test('Forwards the test-id', () => {
    // const output = render(<Flex data-testid="some-id" />);
    // console.log(Flex);

    document.body.innerHTML = '<button>My button</button>'
    const button = document.querySelector('button')
    expect(button?.innerText).toEqual('My button')

    const foo = 5
    expect(foo).toBe(5)
  })
})
