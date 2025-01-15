import { createLibraryConfig } from "config-vite";
import pkg from "./package.json" assert { type: "json" };

export default createLibraryConfig({
	entry: [
		"./src/index.tsx",
		"./src/atoms.css.ts",
		"./src/base.css.ts",
		"./src/reset.css.ts",
		"./src/system.css.ts",
	],
	pkg: pkg,
});
