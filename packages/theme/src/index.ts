import type { VarGroup } from "@stylexjs/stylex";
import type * as color from "./color.stylex.js";
import type * as editorial from "./editorial.stylex.js";
import type * as shape from "./shape.stylex.js";
import type * as spaceTokens from "./space.stylex.js";
import type * as text from "./text.stylex.js";
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
export type AccentTokens = VarGroup<typeof color.accent>;
export type PositiveTokens = VarGroup<typeof color.positive>;
export type WarningTokens = VarGroup<typeof color.warning>;
export type DangerTokens = VarGroup<typeof color.danger>;
export type StaticTokens = VarGroup<typeof color.statics>;
export type ShadeTokens = VarGroup<typeof color.shade>;
export type TintTokens = VarGroup<typeof color.tint>;
export type AdvanceTokens = VarGroup<typeof color.advance>;
export type RecedeTokens = VarGroup<typeof color.recede>;

// UI text scale (theme-contract): coordinated ramps + voice-only roles.
export type FontSizeTokens = VarGroup<typeof text.fontSize>;
export type LineHeightTokens = VarGroup<typeof text.lineHeight>;
export type HeadingVoiceTokens = VarGroup<typeof text.headingVoice>;
export type SubheadingVoiceTokens = VarGroup<typeof text.subheadingVoice>;
export type LabelVoiceTokens = VarGroup<typeof text.labelVoice>;
export type ActionVoiceTokens = VarGroup<typeof text.actionVoice>;
export type TextVoiceTokens = VarGroup<typeof text.textVoice>;

// Editorial text scale: full-anatomy roles.
export type DisplayRoleTokens = VarGroup<typeof editorial.display>;
export type EditorialHeadingRoleTokens = VarGroup<typeof editorial.heading>;
export type EditorialSubheadingRoleTokens = VarGroup<typeof editorial.subheading>;
export type KickerRoleTokens = VarGroup<typeof editorial.kicker>;
export type LedeRoleTokens = VarGroup<typeof editorial.lede>;
export type BodyRoleTokens = VarGroup<typeof editorial.body>;
export type MonoRoleTokens = VarGroup<typeof editorial.mono>;
export type CaptionRoleTokens = VarGroup<typeof editorial.caption>;

// Space domain: the shared size ramp and the layer-keyed trios.
export type SizeRampTokens = VarGroup<typeof spaceTokens.size>;
export type GapTokens = VarGroup<typeof spaceTokens.gap>;
export type InsetTokens = VarGroup<typeof spaceTokens.inset>;

// Shape domain: the shared cut-depth ramp, plus the profile vocabulary.
export type DepthTokens = VarGroup<typeof shape.depth>;

/**
 * Cut profile vocabulary (theme-contract): a chamfer carries one; a notch
 * carries one per end. Typed rather than a var — it parameterises the shape
 * generator, not CSS (tokens-are-spec). The one value export in this
 * otherwise types-only index, precisely because it is not a token value.
 */
export const profiles = ["square", "straight", "round"] as const;
export type Profile = (typeof profiles)[number];

// Pipeline probes — retired when the buildable slice lands in full
// (docs/plans/002-theme-buildable-slice.md, phase 6).
export type ColorTokens = VarGroup<typeof tokens.colors>;
export type SpaceTokens = VarGroup<typeof tokens.space>;
export type RadiiTokens = VarGroup<typeof tokens.radii>;
