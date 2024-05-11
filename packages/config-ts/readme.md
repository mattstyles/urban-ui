
# Typescript config definitions

Tsconfig.json files are not regular json, however, configs here _are_ regular json :(

## Bun

```
/**
 * Bun suggested compiler options
 * https://bun.sh/docs/typescript
 */
{
	"compilerOptions": {
		// Enable latest features
		"lib": ["ESNext"],
		"target": "ESNext",
		"module": "ESNext",
		"moduleDetection": "force",
		"jsx": "react-jsx",
		"allowJs": true,

		// Bundler mode
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"verbatimModuleSyntax": true,
		"noEmit": true,

		// Best practices
		"strict": true,
		"skipLibCheck": true,
		"noFallthroughCasesInSwitch": true,

		// Some stricter flags (disabled by default)
		"noUnusedLocals": false,
		"noUnusedParameters": false,
		"noPropertyAccessFromIndexSignature": false,

		// types for bun:x modules
		"types": ["bun-types"]
	}
}
```

## Library

Most packages here use the library configuration.

```
/**
 * Matt Pocock tsconfig
 * https://www.totaltypescript.com/tsconfig-cheat-sheet
 */
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Client",
  "compilerOptions": {
    /* Base Options: */
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2022",
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "verbatimModuleSyntax": false,

    /* Strictness */
    "strict": true,
    "noUncheckedIndexedAccess": false,
    "noImplicitOverride": true,

    /* Building for a library in a monorepo */
    "composite": false,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,

    /* If NOT transpiling with TypeScript: */
    "module": "preserve",
    "noEmit": true,

    /* Running in the DOM, with react */
    "lib": ["es2022", "dom", "dom.iterable"],
    "jsx": "react-jsx",

    /* bun:x types */
    "types": ["bun-types"]
  },
  "exclude": ["node_modules"]
}
```