import { UserConfigExport } from "vitest/dist/config.js";

declare function createLibraryConfig({
	entry,
	pkg,
}: {
	entry: string | Array<string>;
	pkg: Record<string, any>;
}): UserConfigExport;
