import type { Dirent } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

const rootPackageName = "urban-ui";

export async function isRepoRoot(
	dirent: Dirent,
	pathname: string,
): Promise<boolean> {
	if (dirent.name !== "package.json") {
		return false;
	}

	const buf = await fs.readFile(pathname);
	try {
		const pkg = JSON.parse(buf.toString());
		return pkg.name === rootPackageName;
	} catch {
		return false;
	}
}

type FindPackageRootOptions = {
	root?: string;
	maxIterations?: number;
};
export async function findPackageRoot(
	options: FindPackageRootOptions = {},
): Promise<string | null> {
	const opts = {
		root: process.cwd(),
		maxIterations: 10,
		...options,
	};
	let curr = opts.root.split("/");
	console.log(curr);
	let iterations = 0;
	while (curr.length > 1 && iterations < opts.maxIterations) {
		const pathname = curr.join("/");
		const entries = await fs.readdir(pathname, { withFileTypes: true });
		for (const entry of entries.filter((e) => !e.isDirectory())) {
			if (await isRepoRoot(entry, path.join(pathname, entry.name))) {
				return path.join(pathname);
			}
		}
		iterations = iterations + 1;
		curr = curr.slice(0, -1);
	}

	return null;
}
