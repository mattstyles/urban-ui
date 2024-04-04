import fs from "node:fs/promises";
import type { Config } from "@urban-ui/arc";
import { getTsConfig } from "@urban-ui/arc/ts";
// tsconfig is not valid json, one does not simply load it
// import tsconfig from "./tsconfig.json" assert { type: "json" };

const tsconfig = await getTsConfig();

const config: Config = {
	// include: [tsconfig.compilerOptions?.rootDir ?? "src"],
	include: ["src", "!src/**/*.css"],
	outDir: "dist",
	rootDir: tsconfig.compilerOptions?.rootDir ?? "src",
	events: {
		complete: async () => {
			console.log("Arc complete");
			await fs.copyFile("./src/reset.css", "./dist/reset.css");
		},
	},
};

export default config;
