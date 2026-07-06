import type { VarGroup } from "@stylexjs/stylex";
import type * as tokens from "./tokens.stylex.js";

/**
 * Root entry exports token group *types* only. Token values live in
 * `tokens.stylex.ts` and must be imported via the
 * `@urban-ui/theme/tokens.stylex` subpath so the StyleX compiler can resolve
 * the defining module — never re-exported through this index.
 */
export type ColorTokens = VarGroup<typeof tokens.colors>;
export type SpaceTokens = VarGroup<typeof tokens.space>;
export type RadiiTokens = VarGroup<typeof tokens.radii>;
