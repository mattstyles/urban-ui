import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { Panel } from "./index.tsx";

describe("[Panel]", () => {
	test("Forwards the testid", async () => {
		// ARRANGE
		render(<Panel.Root data-testid="some-id" />);

		// ACT

		// ASSERT
		const el = await screen.findByTestId("some-id");
		expect(el).toBeInTheDocument();
	});
});
