import { danger, neutral, surface } from "@urban-ui/theme/color.stylex";
import { fontSize } from "@urban-ui/theme/text.stylex";
import { createContext, type CSSProperties, type ReactNode, useContext } from "react";

/**
 * Spacing-1 prototype — positional descent (option A).
 *
 * Mechanics under test:
 * - A descent ladder of gaps: each structural level takes the next rung
 *   down. Grouping is a contrast of gaps; inside sits tighter than outside.
 * - Depth is counted by the system (context), never named by the author.
 *   `level` exists as the explicit-pin escape hatch (the option-B override).
 * - A header hugs its body one rung below the ambient gap; header interior
 *   sits one rung below that again.
 * - An edge (border/fill) carries grouping itself, so it resets the ladder —
 *   edges scope descent. The reset rung is the edge's one spacing decision.
 * - Density is a pitch edit — one multiplier over the whole ladder — never
 *   a rung jump.
 * - Exhausting the ladder is surfaced as an over-nesting signal, not
 *   silently clamped.
 *
 * Freeform by design: raw px ladder, inline styles; only colour and text
 * tokens are followed.
 */

export const LADDER = [48, 24, 12, 6] as const;

const DepthContext = createContext(0);
const PitchContext = createContext(1);
const AnnotateContext = createContext(false);
const StrictContext = createContext(false);

function rungGap(rung: number, pitch: number): number {
  return (LADDER[Math.min(rung, LADDER.length - 1)] ?? 0) * pitch;
}

function useRung(pin?: number) {
  const depth = useContext(DepthContext);
  const pitch = useContext(PitchContext);
  const strict = useContext(StrictContext);
  const rung = strict ? depth : (pin ?? depth);
  const over = rung >= LADDER.length;
  return { gap: rungGap(rung, pitch), over, pitch, rung };
}

// Debug dressing: dashed outline plus a rung/value badge. The over-nesting
// signal renders even when annotation is off — it is a signal, not a debug
// view.
function annotation(over: boolean, annotate: boolean): CSSProperties {
  if (!annotate && !over) {
    return {};
  }
  return {
    outlineColor: over ? danger.line : neutral.border,
    outlineOffset: -1,
    outlineStyle: "dashed",
    outlineWidth: 1,
    position: "relative",
  };
}

function Badge({ over, side, text }: { over: boolean; side: "start" | "end"; text: string }) {
  return (
    <span
      style={{
        backgroundColor: surface.canvas,
        color: over ? danger.ink : neutral.inkTertiary,
        fontFamily: "monospace",
        fontSize: fontSize.xs,
        insetBlockStart: -7,
        insetInlineEnd: side === "end" ? 4 : undefined,
        insetInlineStart: side === "start" ? 4 : undefined,
        lineHeight: 1,
        paddingBlock: 1,
        paddingInline: 3,
        position: "absolute",
        whiteSpace: "nowrap",
      }}
    >
      {text}
      {over ? " · over-nested" : ""}
    </span>
  );
}

export interface FlowProps {
  align?: CSSProperties["alignItems"];
  children: ReactNode;
  direction?: "column" | "row";
  justify?: CSSProperties["justifyContent"];
  /** Escape hatch — pin the rung explicitly instead of letting the system count. */
  level?: number;
  style?: CSSProperties;
  wrap?: boolean;
}

/**
 * The recursive grouping primitive: reads its depth, takes the matching
 * rung as its gap, and hands depth+1 to its children.
 */
export function Flow({
  align,
  children,
  direction = "column",
  justify,
  level,
  style,
  wrap,
}: FlowProps) {
  const annotate = useContext(AnnotateContext);
  const { gap, over, rung } = useRung(level);
  return (
    <div
      style={{
        alignItems: align,
        display: "flex",
        flexDirection: direction,
        flexWrap: wrap === true ? "wrap" : undefined,
        gap,
        justifyContent: justify,
        ...annotation(over, annotate),
        ...style,
      }}
    >
      {annotate || over ? <Badge over={over} side="end" text={`d${rung} · ${gap}px`} /> : null}
      <DepthContext.Provider value={rung + 1}>{children}</DepthContext.Provider>
    </div>
  );
}

export interface GridProps {
  children: ReactNode;
  columns?: number;
  /** Escape hatch — pin the rung explicitly instead of letting the system count. */
  level?: number;
  style?: CSSProperties;
}

/** Grouping across two axes; same descent mechanics as Flow. */
export function Grid({ children, columns = 3, level, style }: GridProps) {
  const annotate = useContext(AnnotateContext);
  const { gap, over, rung } = useRung(level);
  return (
    <div
      style={{
        display: "grid",
        gap,
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        ...annotation(over, annotate),
        ...style,
      }}
    >
      {annotate || over ? <Badge over={over} side="end" text={`d${rung} · ${gap}px`} /> : null}
      <DepthContext.Provider value={rung + 1}>{children}</DepthContext.Provider>
    </div>
  );
}

export interface FrameProps {
  children: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
  /** Escape hatch — pin the rung explicitly instead of letting the system count. */
  level?: number;
  style?: CSSProperties;
}

/**
 * The anatomy primitive (header? · body · footer?). Body children sit at
 * the ambient rung; the header hugs the body one rung below ambient
 * (header-proximity); the header's own interior sits one rung below that.
 * The footer is a body child — it separates at ambient.
 */
export function Frame({ children, footer, header, level, style }: FrameProps) {
  const annotate = useContext(AnnotateContext);
  const { gap: ambient, over, pitch, rung } = useRung(level);
  const hug = rungGap(rung + 1, pitch);
  const headerInterior = rungGap(rung + 2, pitch);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: hug,
        ...annotation(over, annotate),
        ...style,
      }}
    >
      {annotate || over ? (
        <Badge over={over} side="start" text={`d${rung} · ${ambient}/${hug}px`} />
      ) : null}
      {header === undefined ? null : (
        <DepthContext.Provider value={rung + 2}>
          <header style={{ display: "flex", flexDirection: "column", gap: headerInterior }}>
            {header}
          </header>
        </DepthContext.Provider>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: ambient }}>
        <DepthContext.Provider value={rung + 1}>
          {children}
          {footer}
        </DepthContext.Provider>
      </div>
    </div>
  );
}

export interface CardProps {
  children: ReactNode;
  /** The rung the ladder restarts at inside this edge — the edge's one spacing decision. */
  resetTo?: number;
  style?: CSSProperties;
  tone?: "panel" | "raised";
}

/**
 * An edge-bearing container: border and fill carry the grouping, so the
 * whitespace ladder resets inside it (edges scope descent). Inset derives
 * from the reset rung.
 */
export function Card({ children, resetTo = 1, style, tone = "raised" }: CardProps) {
  const pitch = useContext(PitchContext);
  const strict = useContext(StrictContext);
  const reset = strict ? 1 : resetTo;
  const inset = rungGap(reset, pitch);
  return (
    <div
      style={{
        backgroundColor: tone === "raised" ? surface.raised : surface.panel,
        borderColor: neutral.border,
        borderStyle: "solid",
        borderWidth: 1,
        padding: inset,
        ...style,
      }}
    >
      <DepthContext.Provider value={reset}>{children}</DepthContext.Provider>
    </div>
  );
}

/**
 * A pitch edit: re-values the whole ladder under it. Density lives here —
 * never in rung jumps. Multiplicative, so pitches compose.
 */
export function Pitch({ children, scale }: { children: ReactNode; scale: number }) {
  const current = useContext(PitchContext);
  return <PitchContext.Provider value={current * scale}>{children}</PitchContext.Provider>;
}

/** Toggles the rung/value annotations across the subtree. */
export function Annotate({ children, on }: { children: ReactNode; on: boolean }) {
  return <AnnotateContext.Provider value={on}>{children}</AnnotateContext.Provider>;
}

/**
 * Strict mode: the counted system with no author amendments — `level` pins
 * are ignored and every edge resets to the default rung. What option A
 * produces when nobody intervenes.
 */
export function Strict({ children, on }: { children: ReactNode; on: boolean }) {
  return <StrictContext.Provider value={on}>{children}</StrictContext.Provider>;
}
