import { defineConfig } from "vite";
import pkg from "./package.json" assert { type: "json" };

function externals(list: Array<string>) {
	if (list.length === 0) {
		return () => false;
	}

	const re = new RegExp(`^(${list.join("|")})($|/)`);
	console.log(re);
	return (id: string) => re.test(id);
}

export default defineConfig({
	build: {
		target: "esnext",
		outDir: "dist",
		sourcemap: true,
		lib: {
			entry: ["./src/index.ts", "./src/bin/tmpl.ts"],
			formats: ["es"],
		},
		rollupOptions: {
			external: externals([
				...Object.keys(pkg.dependencies ?? {}),
				// ...Object.keys(pkg.peerDependencies ?? {}),
				"node:.*",
			]),
			output: {
				preserveModules: true,
			},
		},
	},
});
