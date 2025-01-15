import { createLibraryConfig } from "config-vite";
import pkg from "./package.json" assert { type: "json" };

export default createLibraryConfig({
	entry: "./src/index.tsx",
	pkg: pkg,
});
