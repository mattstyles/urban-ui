/** @type {import('next').NextConfig} */
// import {createVanillaExtractPlugin} from '@vanilla-extract/next-plugin'
// const withVanillaExtract = createVanillaExtractPlugin()
// import createStyleXPlugin from '@stylexjs/nextjs-plugin'
// import remarkGfm from 'remark-gfm'
// import createMDX from '@next/mdx'
// import {fileURLToPath} from 'node:url'
// import path from 'node:path'

const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const createStyleXPlugin = require("@stylexjs/nextjs-plugin");
// const remarkGfm = require('remark-gfm')
const createMDX = require("@next/mdx");
const { fileURLToPath } = require("node:url");
const path = require("node:path");

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

const withVanillaExtract = createVanillaExtractPlugin();
const withStyleXPlugin = createStyleXPlugin({
	rootDir: path.join(__dirname, "../.."),
});

const config = {
	experimental: {
		// appDir: true,
		mdxRs: true,
	},
	reactStrictMode: true,
	// Transpilation is for app/components i.e. reaching in to packages looking for mdx files
	transpilePackages: ["@urban-ui/button", "@urban-ui/testx"],
	webpack(config) {
		config.resolve.extensionAlias = {
			".js": [".js", ".ts"],
			".jsx": [".jsx", ".tsx"],
		};
		return config;
	},
};

const withMDX = createMDX({
	options: {
		extension: /\.mdx?$/,
		// remarkPlugins: [remarkGfm],
		rehypePlugins: [],
		// If you use `MDXProvider`, uncomment the following line.
		providerImportSource: "@mdx-js/react",
	},
});

// module.exports = withStyleXPlugin(withMDX(config))
module.exports = withStyleXPlugin(withVanillaExtract(withMDX(config)));
// export default withStyleXPlugin(withVanillaExtract(withMDX(config)))
// export default withVanillaExtract(withMDX(config))
