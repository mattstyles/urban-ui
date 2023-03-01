
import {Other} from './other'

type Props = {
  str: string
}
export function Spacer({str}: Props) {
  return <Other str={str} />
}
