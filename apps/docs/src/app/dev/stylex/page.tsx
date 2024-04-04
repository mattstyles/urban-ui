import { Flex } from "@urban-ui/flex";
import { Testx } from "@urban-ui/testx";
import { Block } from "./block";
import { Content } from "./content";

export default function Page() {
	return (
		<div>
			<h1>Hello world stylex</h1>
			<Testx size="lg">Hello world</Testx>
			<Testx size="sm" tone="neutral">
				Hello world
			</Testx>
			<Flex>
				<Block />
				<Block />
				<Block />
			</Flex>
			<Flex gap="md">
				<Block />
				<Block />
				<Block />
			</Flex>
			<Content />
		</div>
	);
}
