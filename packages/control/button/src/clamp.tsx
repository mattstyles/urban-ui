export type Props = React.PropsWithChildren<{
  color?: string
}>
export function Clamp({color, children}: Props) {
  return <div style={{background: color}}>{children}</div>
}
