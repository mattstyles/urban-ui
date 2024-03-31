import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { Text } from "./index.tsx";

describe("[Text]", () => {
	test("Forwards the testid", async () => {
		// ARRANGE
		render(<Text data-testid="some-id" />);

		// ACT

		// ASSERT
		const el = await screen.findByTestId("some-id");
		expect(el).toBeInTheDocument();
	});

	test("Child can be specified", async () => {
		render(
			<>
				<Text data-testid="def">Default element</Text>
				<Text asChild data-testid="child">
					<div>asChild</div>
				</Text>
			</>,
		);

		const child = await screen.findByTestId("child");
		expect(child).toBeInTheDocument();
		expect(child.tagName.toLowerCase()).toBe("div");

		const def = await screen.findByTestId("def");
		expect(def.tagName.toLowerCase()).toBe("span");
	});
});
