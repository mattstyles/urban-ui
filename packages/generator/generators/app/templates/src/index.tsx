type Props = {
  children: React.ReactNode
}
export function <%= exportName %>({children}: Props) {
  return <div data-testid='some-test-id'>{children}</div>
}
