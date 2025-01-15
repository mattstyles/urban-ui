"use client";

import type { ComponentDoc } from "react-docgen-typescript";

import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { MDXProvider } from "@mdx-js/react";
import File from "./test2.mdx";

// ESM import, with typescript support
import { Button } from "@urban-ui/button";
import { Flex } from "@urban-ui/flex";

// If built then these will import everything the button needs
// import {Button} from '@urban-ui/button/build'
// import '@urban-ui/button/styles'

import { Foo } from "./something.tsx";
import ButtonContent from "./button.mdx";

const components = {
	Button: Button,
	Foo: Foo,
	h1: ({ children }: React.PropsWithChildren) => (
		<h1 style={{ color: "green" }}>{children}</h1>
	),
};
const code = `
  <div>
    <Button>Click me</Button>
  </div>
`;

type Props = {
	typegen: Array<ComponentDoc>;
};
export function Content({ typegen }: Props) {
	// console.log('client typegen', typegen)
	return (
		<Flex orientation="v">
			<MDXProvider components={components}>
				<File />
				<ButtonContent name="button!!" />
			</MDXProvider>
			<LiveProvider code={code} scope={components}>
				<LiveEditor />
				<LiveError />
				<LivePreview />
			</LiveProvider>
			<pre>{JSON.stringify(typegen, null, "  ")}</pre>
			<Button onPress={() => alert("clicking")}>Click me</Button>
		</Flex>
	);
}
