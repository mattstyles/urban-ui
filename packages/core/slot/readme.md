# @urban-ui/slot

> Utilies for working with slot children declaratively.

## Context

The most usual way of working with "slot" children in React is to provide props on the parent to be able to supply specific children and have the component be responsible for layout.

This is a good pattern.

It creates an API something like:

```
function Foo({Title, Copy}) {
  return (
    <div className='flex flex-column gap-4'>
      <Title /> // or {Title}
      <div className='separator'>
      <Copy /> // or {Copy}
    </div>
  )
}
```

In this case the component is responsible for layout and the API exposes 'windows' in to the layout in order for you, the consumer, to supply components. It is up to you whether you use `{Title}` to render a node or `<Title />` to render an element, with the former being stricter and the latter allowing the component to decorate the passed element with props.

This package explores allowing consumers to be responsible for layout, leaving the component itself to be responsible for decoration of slot children. A component using these hooks is expected to be fairly low-level, the pattern of having a component be responsible for layout is a good one, but that layout component can consume these hooks which will enable the lower level component to be responsible for functionality.

The API we are after looks more like the following:

```
function Foo({someConditions, children}) {
  const computedChildren = useSlots(children, {
    title: (child) => ...alter the slot component somehow,
    copy: (child) => ...alter the slot component somehow
  })
}

<Foo tone='critical'>
  <div>
    <h1 slot='title'>Title</h1>
    <Icon />
  </div>
  <p slot='copy'>...</p>
</Foo>
```

## Example

See `@urban-ui/field` for an example of `useSlots`.

The field component exposes a number of slots which it is then responsible for decorating, primarily it is concerned with attaching accessibility labels, assigning colour tones based on some criteria, and conditionally rendering some slots.

The flexibility here is that we can construct various Field components with differing layouts, see `@urban-ui/textfield` for an example.

## Caveats

### Cloning all children

The single largest caveat is potentially performance, although test your use-case.

`useSlots` must clone _all_ children in order to reach slot children deeper in the tree because it needs to map each subsequent layer (i.e. children) to ensure that all components get mapped slot children. This involves cloning elements, whilst this operation is not particularly expensive, it is more expensive than the usual React work that occurs.
