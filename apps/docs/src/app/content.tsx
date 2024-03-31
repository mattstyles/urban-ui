"use client";

import { Button } from "@urban-ui/button";

export function Content() {
	return (
		<div>
			<h1>Components</h1>
			<Button onPress={() => alert("clicking")}>Click me</Button>
		</div>
	);
}
