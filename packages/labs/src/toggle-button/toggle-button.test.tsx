import { pointerMap } from "@react-aria/test-utils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ToggleButton } from "./toggle-button.js";

// Pattern tests: the wrapper must keep satisfying the ARIA toggle-button
// contract react-aria-components provides.
function setup() {
  return userEvent.setup({ pointerMap });
}

describe("ToggleButton", () => {
  it("renders a button with aria-pressed state", () => {
    render(<ToggleButton>Mute</ToggleButton>);
    expect(screen.getByRole("button", { name: "Mute" }).getAttribute("aria-pressed")).toBe("false");
  });

  it("toggles on press and reports through onChange", async () => {
    const user = setup();
    const onChange = vi.fn();
    render(<ToggleButton onChange={onChange}>Mute</ToggleButton>);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(onChange).toHaveBeenCalledWith(true);
    await user.click(button);
    expect(button.getAttribute("aria-pressed")).toBe("false");
  });

  it("toggles from the keyboard", async () => {
    const user = setup();
    render(<ToggleButton>Mute</ToggleButton>);
    await user.tab();
    await user.keyboard(" ");
    expect(screen.getByRole("button").getAttribute("aria-pressed")).toBe("true");
  });

  it("respects defaultSelected and does not toggle when disabled", async () => {
    const user = setup();
    const onChange = vi.fn();
    render(
      <ToggleButton defaultSelected isDisabled onChange={onChange}>
        Mute
      </ToggleButton>,
    );
    const button = screen.getByRole("button");
    expect(button.getAttribute("aria-pressed")).toBe("true");
    await user.click(button);
    expect(onChange).not.toHaveBeenCalled();
  });
});
