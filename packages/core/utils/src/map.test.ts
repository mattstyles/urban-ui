import { expect, test } from "vitest";

import { mapValues } from "./map.ts";

test("map values", () => {
	const fixture = {
		foo: "bar",
	};
	const expected = {
		foo: 1,
	};

	const output = mapValues(fixture, () => {
		return 1;
	});
	expect(output).toEqual(expected);

	const v = output.foo;
	expect(typeof v).toBe("number");

	//@ts-expect-error bar does not exist on a mapped object
	output.bar;
});
