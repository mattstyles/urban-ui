import fs from "node:fs/promises";
import { parse } from "tsconfck";
import type { TsConfigJson } from "type-fest";

export async function getTsConfig({
	configPath = "./tsconfig.json",
}: { configPath?: string } = {}): Promise<TsConfigJson> {
	if (!fs.exists(configPath)) {
		throw new Error("Can not find tsconfig");
	}

	const file = await parse(configPath);
	return file.tsconfig;
}
