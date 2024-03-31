#! /usr/bin/env bun

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { getConfig } from "./src/config";
import { buildCommand } from "./src/commands/build";
import { debug } from "./src/log";

const config = await getConfig();
debug.rk("Using config: %o", config);

yargs(hideBin(process.argv))
	.config(config)
	.command(buildCommand)
	// .option('entries', {})
	.parse();
