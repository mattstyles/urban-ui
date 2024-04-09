import type { CommandModule } from "yargs";
import type { Config } from "../config";

import chalk from "chalk";
import { Client } from "fb-watchman";
import { globby as glob } from "globby";
import pkg from "../../package.json";
import { generateOptions } from "../arguments";
import { generateDefinitions } from "../definition";
import { createDebugger, log } from "../log";
import { transformFiles } from "../transform";

const debug = createDebugger("rk::watch");

type CommandOptions = Required<Config>;

export const watchCommand: CommandModule = {
	command: "watch",
	describe:
		"Watches files from the input glob and runs the transform on change",
	builder: (yargs) => {
		return yargs.option("include", {
			alias: "i",
			description: "List of globs of files to include in the transform",
			type: "array",
		});
	},
	handler: generateOptions<CommandOptions>(
		async (argv) => {
			const files = await glob(argv.include);
			debug("Files to transform: %o", files);

			log.arc(`v${pkg.version}`);
			log.arc("Entry files:", chalk.magenta(files.join(", ")));

			return {
				include: files,
				outDir: argv.outDir,
				rootDir: argv.rootDir,
				events: argv.events,
			};
		},
		async (opts) => {
			debug("Watch options: %o", opts);

			const client = new Client();
			client.capabilityCheck(
				{ optional: [], required: ["relative_root"] },
				(err, res) => {
					if (err) {
						console.log("watchman error");
						console.error(err);
						client.end();
					}

					debug("Watchman capability check: %o", res);

					const watchPath = process.cwd();
					debug("Common watch path:", watchPath);

					client.command(["watch-project", watchPath], (error, resp) => {
						if (error) {
							log.arc("Watch failed: ", error);
							return;
						}
						if ("warning" in resp) {
							log.arc("Warning: ", resp.warning);
						}

						debug('"watch-project" started');

						// @TODO should potentially attempt to match against the initial arc config options include globs, or even the rootDir and the filter out those files that do not match the glob. Using opts.include here is the extended glob and will miss new files being added.
						const sub = {
							expression: ["anyof", ["name", opts.include, "wholename"]],
							fields: [
								"name",
								"size",
								// "mtime_ms",
								"exists",
								// "type",
								"new",
								// "mode",
							],
							relative_root: resp.relative_path,
						};
						const subscriptionName = `arc:watch:${pkg.name}`;

						debug("Running watchman:subscribe %o", {
							...sub,
							name: subscriptionName,
							include: opts.include,
						});
						client.command(
							["subscribe", resp.watch, subscriptionName, sub],
							(err, res) => {
								if (err) {
									// Probably an error in the subscription criteria
									console.error("failed to subscribe: ", err);
									return;
								}

								log.arc("Subscription:", chalk.magenta(res.subscribe));
							},
						);

						client.on("subscription", async (res): Promise<void> => {
							if (res.subscription !== subscriptionName) {
								debug("Additional subscription: %o", res);
								return;
							}

							debug("Subscription event received %o", res);

							for (const file of res.files) {
								if (file.exists === false) {
									// @TODO clean up destination directory by deleting this file, if found (need to work out what the transform name would be)
									log.arc("File removed from watch", chalk.magenta(file.name));
									return;
								}

								if (file.new) {
									log.arc("Watching file:", chalk.magenta(file.name));
								} else {
									log.arc("File changed:", chalk.magenta(file.name));
								}

								const stats = await transformFiles([file.name], {
									outDir: opts.outDir,
									rootDir: opts.rootDir,
								});
								const dtsStats = await generateDefinitions([file.name], {
									outDir: opts.outDir,
								});

								// Disregard pipeline stats for now
								// @TODO probably need to set a log level on the pipelines to avoid too much spam when starting up a watch or reacting to file changes
								// @TODO report on time of pipeline run
							}
						});
					});
				},
			);

			process.on("SIGINT", (code) => {
				console.log("Closing watcher", code);
				client.end();
			});
		},
	),
};
