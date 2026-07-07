export interface ChipProps {
  /** The label. */
  label: string;
  /** How many. */
  count?: number;
}

export function Chip(props: ChipProps) {
  return props.label;
}
