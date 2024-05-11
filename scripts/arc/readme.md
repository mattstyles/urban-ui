# arc

> Builds urban-ui packages

## Getting started

Arc is a bun script that uses watchman to react to file changes.

* Install [bun](https://bun.sh/docs/installation)
* Install [watchman](https://facebook.github.io/watchman/docs/install)
* Add arc to your package

```sh
npm add -D @urban-ui/arc
```

* Add a package script

```json
"scripts": {
  "build": "arc build",
  "dev": "arc watch"
}
```

* Run arc

```sh
npm run build
```

## Arc configuration

By default arc will compile all files under an `src` directory and output them to `dist`.

Arc will also generate typescript definition files based on the `tsconfig.json` found in the package.

Arc can be configured by placing an `arc.config.ts` file (or json, or js) at the package root, for example:

```
import type {Config} from '@urban-ui/arc'
import { getTsConfig } from "@urban-ui/arc/ts";

const tsconfig = await getTsConfig();

const config: Config = {
  include: [tsconfig.compilerOptions.rootDir],
  outDir: 'dist',
  rootDir: tsconfig.compilerOptions.rootDir,
}

export default config
```

> _Note_: tsconfig.json is **not** json, one does not simply `import tsconfig from './tsconfig.json`.
>
> Arc exposes `getTsConfig` to handle typescript configuration loading.

### Include glob

Under the hood Arc uses `https://www.npmjs.com/package/globby` to turn `config.includes` into a list of files. This will default to all files under an `src` directory.

If you colocate tests under this directory then you will probably want to negate those files from the output:

```ts
const config = {
  include: ['src', '!src/*.test.ts*']
}
```

## Local development

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run rk.ts
```

To run with verbose console output use the debug environment variable:

```bash
DEBUG=* bun run rk.ts
```

Running against the test example package is usually a safe bet:

```bash
cd __tests__/base
bun run ../../rk.ts build
```