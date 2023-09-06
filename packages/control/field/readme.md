# @urban-ui/field

```jsx
<Field.Root orientation='v' gap='sm' alignment='start'>
  <Text asChild slot='label'>
    <label>Some label</label>
  </Text>
  <Input slot='field' />
  <Text slot='description'>Some description</Text>
  <Text slot='errorMessage' tone='primary'>
    Some description
  </Text>
</Field.Root>
```

Field uses a slot based architecture to supply aria properties to related pieces of DOM. To work with RSC it does this by mapping children to supply props rather than use context to pass data around.
