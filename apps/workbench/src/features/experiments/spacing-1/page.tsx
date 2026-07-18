import { accent, neutral } from "@urban-ui/theme/color.stylex";
import {
  actionVoice,
  fontSize,
  headingVoice,
  lineHeight,
  subheadingVoice,
  textVoice,
} from "@urban-ui/theme/text.stylex";
import { type CSSProperties, type ReactNode, useState } from "react";
import { Annotate, Card, Flow, Frame, Grid, LADDER, Pitch, Strict } from "./prototype.js";

/**
 * Spacing-1 — the pressure cases from the layout-system discussion, rendered
 * against a working positional-descent prototype. The page itself is
 * composed with the prototype: the whole route is one Flow at depth 0.
 */

// --- demo dressing: text and control atoms -------------------------------
// Controls own their internals (a checkbox's gap to its label is intrinsic);
// the descent system governs the space between components, not within atoms.

const text = {
  title: {
    fontFamily: headingVoice.family,
    fontSize: fontSize.xl,
    fontWeight: headingVoice.weight,
    letterSpacing: headingVoice.tracking,
    lineHeight: lineHeight.xl,
  },
  heading: {
    fontFamily: headingVoice.family,
    fontSize: fontSize.lg,
    fontWeight: headingVoice.weight,
    letterSpacing: headingVoice.tracking,
    lineHeight: lineHeight.lg,
  },
  subheading: {
    fontFamily: subheadingVoice.family,
    fontSize: fontSize.md,
    fontWeight: subheadingVoice.weight,
    letterSpacing: subheadingVoice.tracking,
    lineHeight: lineHeight.md,
  },
  body: {
    fontFamily: textVoice.family,
    fontWeight: textVoice.weight,
    letterSpacing: textVoice.tracking,
  },
} satisfies Record<string, CSSProperties>;

function Title({ children }: { children: ReactNode }) {
  return <h1 style={text.title}>{children}</h1>;
}

function Heading({ children }: { children: ReactNode }) {
  return <h2 style={text.heading}>{children}</h2>;
}

function Subheading({ children }: { children: ReactNode }) {
  return <h3 style={text.subheading}>{children}</h3>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        color: neutral.inkTertiary,
        fontFamily: "monospace",
        fontSize: fontSize.xs,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function Text({
  children,
  muted,
  size = "md",
}: {
  children: ReactNode;
  muted?: boolean;
  size?: "sm" | "md";
}) {
  return (
    <p
      style={{
        ...text.body,
        color: muted === true ? neutral.inkSecondary : neutral.ink,
        fontSize: fontSize[size],
        lineHeight: lineHeight[size],
      }}
    >
      {children}
    </p>
  );
}

function Button({ children, primary }: { children: ReactNode; primary?: boolean }) {
  return (
    <button
      type="button"
      style={{
        backgroundColor: primary === true ? accent.fill : neutral.fill,
        borderStyle: "none",
        color: primary === true ? accent.onFill : neutral.onFill,
        fontFamily: actionVoice.family,
        fontSize: fontSize.sm,
        fontWeight: actionVoice.weight,
        letterSpacing: actionVoice.tracking,
        paddingBlock: 6,
        paddingInline: 12,
      }}
    >
      {children}
    </button>
  );
}

function TextInput({ value }: { value: string }) {
  return (
    <input
      readOnly
      value={value}
      style={{
        backgroundColor: neutral.subtle,
        borderColor: neutral.border,
        borderStyle: "solid",
        borderWidth: 1,
        color: neutral.ink,
        fontFamily: textVoice.family,
        fontSize: fontSize.sm,
        paddingBlock: 6,
        paddingInline: 8,
      }}
    />
  );
}

function Checkbox({ label }: { label: string }) {
  return (
    <label
      style={{
        alignItems: "center",
        color: neutral.ink,
        display: "flex",
        fontFamily: textVoice.family,
        fontSize: fontSize.sm,
        gap: 6,
      }}
    >
      <input type="checkbox" readOnly checked />
      {label}
    </label>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        color: neutral.inkSecondary,
        fontFamily: textVoice.family,
        fontSize: fontSize.sm,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

/** A labelled control: the label–control bond is the tightest at its level. */
function Field({ control, label }: { control: ReactNode; label: string }) {
  return (
    <Flow>
      <FieldLabel>{label}</FieldLabel>
      {control}
    </Flow>
  );
}

/** A specimen: heading + caption hugging a panel canvas that resets to rung 1. */
function Specimen({
  caption,
  children,
  title,
}: {
  caption: string;
  children: ReactNode;
  title: string;
}) {
  return (
    <Frame
      header={
        <>
          <Heading>{title}</Heading>
          <Text muted>{caption}</Text>
        </>
      }
    >
      <Card tone="panel">{children}</Card>
    </Frame>
  );
}

// --- pressure 1: deep honest nesting --------------------------------------

function SettingsPanel() {
  return (
    <Card>
      <Frame
        header={
          <>
            <Subheading>Notification settings</Subheading>
            <Text muted size="sm">
              How the relay reaches you.
            </Text>
          </>
        }
        footer={
          <Flow direction="row" justify="flex-end">
            <Button>Cancel</Button>
            <Button primary>Save</Button>
          </Flow>
        }
      >
        <Frame header={<Eyebrow>Email</Eyebrow>}>
          <Field label="Address" control={<TextInput value="operator@relay.city" />} />
          <Field label="Digest cadence" control={<TextInput value="Weekly" />} />
        </Frame>
        <Frame header={<Eyebrow>Push</Eyebrow>}>
          <Field label="Quiet hours" control={<TextInput value="22:00 – 07:00" />} />
          <Field
            label="Channels"
            control={
              <Flow direction="row" wrap>
                <Checkbox label="Mentions" />
                <Checkbox label="Deploys" />
                <Checkbox label="Alerts" />
              </Flow>
            }
          />
        </Frame>
      </Frame>
    </Card>
  );
}

// --- pressure 2: edges vs whitespace ---------------------------------------

function StatContent() {
  return (
    <Flow>
      <span style={{ ...text.heading, fontSize: fontSize.xl, lineHeight: lineHeight.xl }}>
        1,284
      </span>
      <Text muted size="sm">
        +12% over the last hour
      </Text>
    </Flow>
  );
}

function EdgedStats() {
  return (
    <Grid columns={3} level={1}>
      {["Uplink", "Relay", "Mesh"].map((name) => (
        <Card key={name}>
          <Frame header={<Eyebrow>{name}</Eyebrow>}>
            <StatContent />
          </Frame>
        </Card>
      ))}
    </Grid>
  );
}

function BareStats() {
  return (
    <Grid columns={3} level={1}>
      {["Uplink", "Relay", "Mesh"].map((name) => (
        <Frame key={name} header={<Eyebrow>{name}</Eyebrow>}>
          <StatContent />
        </Frame>
      ))}
    </Grid>
  );
}

// --- pressure 3: density is a pitch edit -----------------------------------

function Toolbar() {
  return (
    <Card resetTo={2}>
      <Flow direction="row" justify="space-between" align="center">
        <Flow direction="row" align="center">
          <Button>Cut</Button>
          <Button>Copy</Button>
          <Button>Paste</Button>
        </Flow>
        <Flow direction="row" align="center">
          <Button>Inspect</Button>
          <Button primary>Deploy</Button>
        </Flow>
      </Flow>
    </Card>
  );
}

// --- pressure 4: reuse across depths ----------------------------------------

function ContactFields() {
  return (
    <>
      <Field label="Callsign" control={<TextInput value="VX-9" />} />
      <Field label="Frequency" control={<TextInput value="149.2 MHz" />} />
    </>
  );
}

// --- the page ----------------------------------------------------------------

export function SpacingOneExperiment() {
  const [annotate, setAnnotate] = useState(false);
  const [pitch, setPitch] = useState(1);
  const [strict, setStrict] = useState(false);
  return (
    // deviation(no-margin): freeform experiment; centring via margin auto.
    <div style={{ marginInline: "auto", maxWidth: 880, width: "100%" }}>
      <Annotate on={annotate}>
        <Strict on={strict}>
          <Flow>
            <Frame
              header={
                <>
                  <Title>Spacing-1 — positional descent</Title>
                  <Text muted>
                    Option A under pressure: the system counts depth and derives every gap from a
                    descent ladder ({LADDER.join(" / ")}px). Authors declare structure — Flow,
                    Frame, Card — and never mention a value. Headers hug one rung below ambient;
                    edges reset the ladder; density is a pitch multiplier; exhausting the ladder
                    raises the red over-nesting signal. Extent (measure, column widths) is
                    deliberately out of scope: this page hand-sets one 880px measure and nothing
                    else.
                  </Text>
                </>
              }
            >
              <Flow direction="row" align="center">
                <label
                  style={{
                    alignItems: "center",
                    color: neutral.inkSecondary,
                    display: "flex",
                    fontFamily: textVoice.family,
                    fontSize: fontSize.sm,
                    gap: 6,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={annotate}
                    onChange={(event) => {
                      setAnnotate(event.target.checked);
                    }}
                  />
                  Annotate rungs
                </label>
                <label
                  style={{
                    alignItems: "center",
                    color: neutral.inkSecondary,
                    display: "flex",
                    fontFamily: textVoice.family,
                    fontSize: fontSize.sm,
                    gap: 6,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={strict}
                    onChange={(event) => {
                      setStrict(event.target.checked);
                    }}
                  />
                  Strict (ignore pins &amp; resetTo)
                </label>
                <label
                  style={{
                    alignItems: "center",
                    color: neutral.inkSecondary,
                    display: "flex",
                    fontFamily: textVoice.family,
                    fontSize: fontSize.sm,
                    gap: 6,
                  }}
                >
                  Pitch
                  <select
                    value={pitch}
                    onChange={(event) => {
                      setPitch(Number(event.target.value));
                    }}
                    style={{
                      backgroundColor: neutral.fill,
                      borderStyle: "none",
                      color: neutral.onFill,
                      fontSize: fontSize.xs,
                      paddingBlock: 2,
                      paddingInline: 6,
                    }}
                  >
                    <option value={1.5}>1.5×</option>
                    <option value={1.25}>1.25×</option>
                    <option value={1}>1×</option>
                    <option value={0.75}>0.75×</option>
                    <option value={0.5}>0.5×</option>
                  </select>
                </label>
              </Flow>
            </Frame>

            <Pitch scale={pitch}>
              <Specimen
                title="P1 — deep honest nesting"
                caption="Page → card → section → field → checkbox row: five real levels. Every gap on
              this panel is derived; nobody picked a number. The checkbox row exhausts the
              four-rung ladder and raises the over-nesting signal — the ladder's length is a
              design commitment, and this is what disputing it looks like."
              >
                <SettingsPanel />
              </Specimen>

              <Specimen
                title="P2 — edges scope descent"
                caption="Same stats twice. The edged cards restart the ladder inside their border —
              interior gaps equal the grid gap (24 inside 24, which monotone descent forbids) and
              stay legible because the edge does the grouping. The bare variant has only
              whitespace, so descent (6 inside 24) is the only thing holding the groups together.
              The pinned grid rung is the escape hatch earning its keep: specimen scaffolding
              would otherwise push the demo two rungs deeper."
              >
                <Flow>
                  <Frame header={<Eyebrow>Edged</Eyebrow>}>
                    <EdgedStats />
                  </Frame>
                  <Frame header={<Eyebrow>Bare</Eyebrow>}>
                    <BareStats />
                  </Frame>
                </Flow>
              </Specimen>

              <Specimen
                title="P3 — density is a pitch edit"
                caption="The same toolbar at ambient pitch and inside a 0.5× pitch edit: identical
              structure, every derived gap and inset halves as one move. No rung was jumped — the
              lie 'these buttons are intimately related' is unrepresentable; only 'this context is
              denser' can be said. Button internals don't shrink: controls own their insides, and
              wiring them to pitch is the control-sizing question (urban-ui-6yb)."
              >
                <Flow>
                  <Toolbar />
                  <Pitch scale={0.5}>
                    <Toolbar />
                  </Pitch>
                </Flow>
              </Specimen>

              <Specimen
                title="P4 — reuse across depths"
                caption="One ContactFields component, three sites. Shallow: it inherits rung 3 and
              renders 12/6. Wrapped (a scroll container, an animation boundary): the wrapper eats
              a rung, the fields bottom out and trip the over-nesting signal — the transparent-
              wrapper problem, undisguised. Pinned: the wrapper is neutralised by pinning its
              rung, which is exactly the option-B override — predictable again, and now stale the
              day the component moves."
              >
                <Grid columns={3}>
                  <Frame header={<Eyebrow>Shallow</Eyebrow>}>
                    <ContactFields />
                  </Frame>
                  <Frame header={<Eyebrow>Wrapped</Eyebrow>}>
                    <Flow>
                      <ContactFields />
                    </Flow>
                  </Frame>
                  <Frame header={<Eyebrow>Wrapped + pinned</Eyebrow>}>
                    <Flow level={2}>
                      <ContactFields />
                    </Flow>
                  </Frame>
                </Grid>
              </Specimen>
            </Pitch>
          </Flow>
        </Strict>
      </Annotate>
    </div>
  );
}
