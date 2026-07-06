import * as stylex from "@stylexjs/stylex";
import { Button } from "@urban-ui/react/button";
import { colors, space } from "@urban-ui/theme/tokens.stylex";

// Minimal render target: Phase 3 replaces this with globbed *.visual.tsx
// scenes and examples/ on stable routes.
const styles = stylex.create({
  main: {
    backgroundColor: colors.surface,
    color: colors.text,
    minHeight: "100vh",
    padding: space.lg,
  },
});

export function App() {
  return (
    <main {...stylex.props(styles.main)}>
      <h1>Workbench</h1>
      <Button onPress={() => console.log("pressed")}>Button</Button>
    </main>
  );
}
