type Props = {
  str: string
}
export function Other({str}: Props) {
  return <div data-testid='other-id'>{str}</div>
}