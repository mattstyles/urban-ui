export interface GadgetProps {
  power: number;
}

export function Gadget(props: GadgetProps) {
  return props.power;
}
