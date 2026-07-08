import type { VarGroup } from "@stylexjs/stylex";
import type * as color from "./color.stylex.js";
import type * as tokens from "./tokens.stylex.js";

/**
 * Root entry exports token group *types* only. Token values live in the
 * `*.stylex.ts` domain modules and must be imported via their subpaths
 * (`@urban-ui/theme/color.stylex`, …) so the StyleX compiler can resolve
 * the defining module — never re-exported through this index.
 */

// Colour domain (theme-contract).
export type SurfaceTokens = VarGroup<typeof color.surface>;
export type NeutralTokens = VarGroup<typeof color.neutral>;
export type StaticTokens = VarGroup<typeof color.statics>;
export type ShadeTokens = VarGroup<typeof color.shade>;
export type TintTokens = VarGroup<typeof color.tint>;

// Pipeline probes — retired when the buildable slice lands in full
// (docs/plans/002-theme-buildable-slice.md, phase 6).
export type ColorTokens = VarGroup<typeof tokens.colors>;
export type SpaceTokens = VarGroup<typeof tokens.space>;
export type RadiiTokens = VarGroup<typeof tokens.radii>;
