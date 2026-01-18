---
description: Bump external dependency versions across the monorepo
---

# Dependency Version Bump

A workflow for updating external dependency versions across all packages in the monorepo.

## Input

The dependency name to update, and optionally a target version.

Format: `<dependency-name>` or `<dependency-name>@<version>`

$ARGUMENTS

## Workflow

### Step 1: Parse Input

Extract from the arguments:
- **dependency**: The npm package name to update (required)
- **version**: The target version number (optional, after `@`)

If no dependency name is provided, ask the user which dependency they want to update.

### Step 2: Resolve Version

**If no version was specified:**

Run:
```bash
bun info <dependency>
```

Extract the latest version from the output (look for the version field).

**If a version was specified:**

Run:
```bash
bun info <dependency>@<version>
```

If an error is returned (package/version not found), inform the user and stop.

### Step 3: Find All package.json Files

Search for all `package.json` files in the repository:
- `packages/*/package.json`
- `apps/*/package.json`
- Root `package.json`

Use the Glob tool to find these files.

### Step 4: Update Dependencies

For each `package.json` that contains the dependency:

1. Check `dependencies`, `devDependencies`, and `peerDependencies`
2. If the dependency is found, update the version number
3. **Preserve the version prefix** if present:
   - `^1.0.0` stays as `^<new-version>`
   - `~1.0.0` stays as `~<new-version>`
   - `1.0.0` (exact) stays as `<new-version>`

Use the Edit tool to update each file.

### Step 5: Install Dependencies

Run:
```bash
bun install
```

This updates the lockfile with the new versions.

### Step 6: Report Changes

Summarise:
- The dependency that was updated
- The old version(s) found
- The new version applied
- All files that were modified

## Special Instructions

Some packages require additional updates when their version changes:

We have no special instructions at the moment.

## Example Usage

```
/bump-dependency react          # Update react to latest version
/bump-dependency react@19.0.0   # Update react to specific version
/bump-dependency @pandacss/dev  # Update scoped package to latest
```
