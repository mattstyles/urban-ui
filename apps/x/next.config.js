import path from "node:path";
import createStyleXPlugin from "@stylexjs/nextjs-plugin";

import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withStyleXPlugin = createStyleXPlugin({
	rootDir: path.join("../.."),
});

const config = {
	experimental: {
		// appDir: true,
	},
	reactStrictMode: true,
	// Transpilation is for app/components i.e. reaching in to packages looking for mdx files
	transpilePackages: [
		"@urban-ui/button",
		"@urban-ui/testx",
		"@urban-ui/theme",
		"@urban-ui/flex",
	],
	webpack(config) {
		config.resolve.extensionAlias = {
			".js": [".js", ".ts"],
			".jsx": [".jsx", ".tsx"],
		};
		return config;
	},
};

// ESM
export default withStyleXPlugin(config);
