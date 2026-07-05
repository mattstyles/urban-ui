---
title: "urban CLI — design-system knowledge for AI agents"
---

# urban CLI — design-system knowledge for AI agents

## Problem

AI agents building UI in consumer repositories have no reliable way to learn the design system they're using. Shipped declaration files are resolved-generic soup that agents misread; training data describes old or wrong versions; documentation sites serve humans, not tools. Any knowledge captured separately from the code drifts from what's actually installed. The result: agents misuse components, rebuild ones that already exist, violate system rules (raw values instead of tokens), and get no guidance on the system's core judgement call — when to compose existing components versus create a new focused one.

## Needle

An AI agent dropped into any consumer repo can, with zero prior knowledge, discover the design system and correctly apply *exactly the version installed* — composing features the system's way, and knowing when and how to create new focused components.

## Solution

`urban` is a fast, self-documenting command-line tool that agents (and humans) run inside consumer repositories. It answers from knowledge that ships **inside the installed design-system packages** — generated and authored at build time, carried in the package artifacts — so what it describes is definitionally what's installed. Version drift is prevented by architecture, not discipline.

The surface is four commands. `urban list` orients: every component, pattern, and token group, with experimental (labs) entries flagged. `urban show <name>` answers about any of them in one composed response: exact resolved API, authored usage guidance, verified examples. `urban search <query>` returns lightweight pointers for cheap, token-conscious lookup. `urban doctor` explains itself: what was resolved from where, which versions, whether the CLI and packages understand each other, and whether known hazards (duplicate accessibility-library copies, mismatched theme/react versions) are present.

Every response is a hypermedia document: it ends with executable pointers to related knowledge — the patterns a component appears in, the tokens it consumes, the philosophy that governs it — so the agent navigates the knowledge graph by following affordances, never by guessing. Errors route the same way (unknown names return nearest matches as runnable commands). The tool is its own onboarding.

The knowledge itself has four kinds: generated reference (exact API, always correct because it's derived from source at build time), authored how-to and composition guidance, authored system philosophy and decision rules, and verified examples. Authored knowledge is validated against the generated reference continuously, so prose that references a renamed prop fails the design system's build — shipped guidance cannot rot. Answers resolve relative to where the caller stands (correct per-app versions in monorepos, with an explicit override), experimental knowledge is never linked from stable knowledge, and structured output is available everywhere for programmatic use.

v1 is read-only knowledge plus doctor, installed via mise or GitHub Releases, versioned independently of the design system packages. Explicitly out of v1: checks against consumer code, project metrics, code generation, MCP serving, npm-based installation, and network-fetched knowledge (no-project and cross-version queries) — the architecture leaves room for all of these. The discovery mechanism is deliberately open so that, later, a consumer's own components can join the queryable graph by adopting the same knowledge anatomy.

## User Stories

**As an AI agent…**

1. …I want to run `urban list` and see all components, patterns, and token groups with stability flags, so that I can orient in the design system with zero prior knowledge.
2. …I want `urban show <component>` to return resolved API, usage guidance, and working examples in one response, so that I can build correct UI without interpreting declaration files.
3. …I want `urban show <pattern>` to explain how components compose into a feature, so that I build features the system's way instead of inventing my own composition.
4. …I want to query the system's decision rules, so that I know when to compose existing components versus create a new focused one — and how to create it properly.
5. …I want token knowledge (`urban show spacing`), so that I style with tokens instead of raw values.
6. …I want every response to end with executable pointers to related knowledge, so that I can walk the graph without guessing names or commands.
7. …I want `urban search <query>` to return pointers rather than full content, so that I spend context tokens only on what I choose to fetch.
8. …I want unknown or misspelled names to return nearest matches as runnable commands, so that I self-correct in one step.
9. …I want answers to describe exactly the versions installed where I'm working — cwd-relative in monorepos, with a `--project` override — so that I never follow guidance for an API that isn't there.
10. …I want experimental (labs) entries flagged and never linked from stable knowledge, so that I adopt experiments deliberately, not accidentally.
11. …I want `--json` on every command, so that I can consume answers programmatically when prose isn't what I need.

**As a developer in a consumer repo…**

12. …I want to install `urban` with one line via mise (or a GitHub Release), so that setup fits the toolchain I already use.
13. …I want `urban doctor` to show the full resolution trace — where it looked, what it found, versions and compatibility — so that I can debug why answers look wrong.
14. …I want doctor to detect duplicate accessibility-library copies and theme/react version mismatches, so that silent composition breakage is caught early.
15. …I want doctor to tell me when my installed design system is too old or too new for my CLI version, with the remedy, so that compatibility issues are explicit.
16. …I want meaningful exit codes, so that doctor can gate CI on a healthy installation.

**As a design-system maintainer…**

17. …I want component docs and examples co-located with component source and shipped in the package, so that knowledge versions with the code and cannot drift from it.
18. …I want the machine-readable reference generated from source at build time, so that the API the CLI reports is always exact.
19. …I want CI to reject authored prose that references nonexistent components, props, or tokens — and examples that don't typecheck — so that shipped guidance can't rot.
20. …I want cross-references in authored prose to become graph edges automatically, so that the navigable graph assembles from natural writing rather than bookkeeping.
21. …I want the CLI versioned independently of the packages, so that engine improvements ship without design-system releases and vice versa.
22. …I want labs components to carry the same (component-level) knowledge anatomy as stable ones, so that graduation is a move, not a rewrite, and "what's experimental right now?" is answerable.
