const path = require("node:path");
// import path from 'node:path'
module.exports = {
	// export default {
	presets: ["next/babel"],
	plugins: [
		[
			"@stylexjs/babel-plugin",
			{
				dev: process.env.NODE_ENV === "development",
				// dev: false,
				// runtimeInjection: true,
				genConditionalClasses: true,
				treeshakeCompensation: true,
				aliases: {
					"@/*": [path.join(__dirname, "*")],
				},
				// useCSSLayers: true,
				unstable_moduleResolution: {
					type: "commonJS",
					rootDir: path.join(__dirname, "../.."),
				},
			},
		],
	],
};
