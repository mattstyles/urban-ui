import { pointerMap } from "@react-aria/test-utils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button.js";

// Pattern tests: our wrapper must keep satisfying the ARIA button contract
// react-aria-components provides. pointerMap translates pointer interactions
// for jsdom (no PointerEvent), per the react-aria testing guidance.
function setup() {
  return userEvent.setup({ pointerMap });
}

describe("Button", () => {
  it("renders a button role with an accessible name", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeDefined();
  });

  it("fires onPress on pointer press", async () => {
    const user = setup();
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Save</Button>);
    await user.click(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("fires onPress on Enter and Space", async () => {
    const user = setup();
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Save</Button>);
    await user.tab();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onPress).toHaveBeenCalledTimes(2);
  });

  it("does not press when disabled", async () => {
    const user = setup();
    const onPress = vi.fn();
    render(
      <Button isDisabled onPress={onPress}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveProperty("disabled", true);
    await user.click(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("marks focus-visible only for keyboard focus", async () => {
    const user = setup();
    render(<Button>Save</Button>);
    const button = screen.getByRole("button");

    await user.tab();
    expect(button.getAttribute("data-focus-visible")).not.toBeNull();

    await user.tab();
    await user.click(button);
    expect(button.getAttribute("data-focus-visible")).toBeNull();
  });
});
