import path from "node:path";
import { parse } from "react-docgen-typescript";

import { Content } from "./content.tsx";
import { pathname as root } from "~/root.ts";

// import File from './test.mdx'

// const dirname = path.resolve(root, './src/app/components/button')
const packages = path.resolve(root, "../../packages/control/button/src");

export default async function ButtonPage() {
	const options = {
		savePropValueAsString: true,
	};
	const pathname = path.resolve(packages, "./index.tsx");
	console.log(pathname, root, packages);
	const file = parse(pathname, options);
	console.log(file.map((f) => f.filePath).join(", "), file.length);

	return (
		<>
			{/* <File /> */}
			<Content typegen={file} />
		</>
	);
}
