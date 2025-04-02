import { Button } from './button'
import { expectTypeOf } from 'expect-type'

// Valid cases
const validButton = <Button>Content</Button>
const validDisabledButton = <Button disabled>Content</Button>
const validLinkButton = <Button as="link" href="https://example.com">Content</Button>

// @ts-expect-error href cannot be used without as="link"
const invalidHrefButton = <Button href="https://example.com">Content</Button>

// @ts-expect-error href is required when as="link" is specified
const invalidLinkButton = <Button as="link">Content</Button>

// Type tests
expectTypeOf<typeof Button>().toBeCallableWith({
  children: 'Content',
  disabled: true,
})

expectTypeOf<typeof Button>().toBeCallableWith({
  children: 'Content',
  as: 'link',
  href: 'https://example.com',
})

// @ts-expect-error href cannot be used without as="link"
expectTypeOf<typeof Button>().toBeCallableWith({
  children: 'Content',
  href: 'https://example.com',
})

// @ts-expect-error href is required when as="link" is specified
expectTypeOf<typeof Button>().toBeCallableWith({
  children: 'Content',
  as: 'link',
})
