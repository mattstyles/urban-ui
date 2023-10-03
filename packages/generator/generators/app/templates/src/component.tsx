

export interface <%= exportName %>Props extends React.PropsWithChildren {}
export function <%= exportName %>({children}: Props) {
  return <div data-testid='some-test-id'>{children}</div>
}