import type { MDXComponents } from "mdx/types.d.ts";

import { Button } from "@urban-ui/button";
import { Foo } from "./app/components/button/something.tsx";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		// Allows customizing built-in components, e.g. to add styling.
		h1: ({ children }) => (
			<h1 style={{ fontSize: "100px", color: "hotpink" }}>{children}</h1>
		),
		// Foo: Foo,
		// Button: Button,
		...components,
	};
}
