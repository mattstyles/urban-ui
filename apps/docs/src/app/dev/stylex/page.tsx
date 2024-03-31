import { Testx } from "@urban-ui/testx";
import { Content } from "./content";

export default function Page() {
	return (
		<div>
			<h1>Hello world stylex</h1>
			<Testx size="lg">Hello world</Testx>
			<Testx size="sm" tone="neutral">
				Hello world
			</Testx>
			<Content />
		</div>
	);
}
