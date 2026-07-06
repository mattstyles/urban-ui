import { Button } from "@urban-ui/react/button";

/**
 * A minimal press-handler button.
 */
export function Basic() {
  return <Button onPress={() => console.log("pressed")}>Save</Button>;
}
