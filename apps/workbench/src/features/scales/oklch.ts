/**
 * OKLCH parsing and WCAG contrast for the scales inventory. Colour maths per
 * CSS Color 4 (oklab -> LMS -> linear sRGB) and WCAG 2.x relative luminance.
 * Every theme colour is OKLCH by law (oklch-only), so parsing only that
 * syntax is the contract, not a shortcut.
 */

export interface Oklch {
  l: number;
  c: number;
  h: number;
  alpha: number;
}

// Accepts both authored (`oklch(0.15 0.02 255)`) and serialized
// (`oklch(15% .02 255 / .6)`) forms — lightningcss emits percentage L.
const OKLCH_PATTERN =
  /oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*(?:\/\s*([\d.]+)(%?))?\s*\)/;

export function parseOklch(value: string): Oklch | undefined {
  const match = OKLCH_PATTERN.exec(value);
  if (match === null) {
    return undefined;
  }
  const scaled = (raw: string | undefined, percent: string | undefined, fallback: number) => {
    if (raw === undefined) {
      return fallback;
    }
    return percent === "%" ? Number(raw) / 100 : Number(raw);
  };
  return {
    l: scaled(match[1], match[2], 0),
    c: Number(match[3]),
    h: Number(match[4]),
    alpha: scaled(match[5], match[6], 1),
  };
}

type LinearRgb = [number, number, number];

function toLinearSrgb({ l, c, h }: Oklch): LinearRgb {
  const hr = (h * Math.PI) / 180;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const clamp = (x: number) => Math.min(1, Math.max(0, x));
  return [
    clamp(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_),
    clamp(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_),
    clamp(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_),
  ];
}

function relativeLuminance([r, g, b]: LinearRgb): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * WCAG contrast ratio between two opaque OKLCH colours. Translucent members
 * (traces, glows, the derivation ramps) have no single ratio — callers skip
 * them rather than guess a backdrop.
 */
export function contrastRatio(foreground: Oklch, background: Oklch): number | undefined {
  if (foreground.alpha < 1 || background.alpha < 1) {
    return undefined;
  }
  const lf = relativeLuminance(toLinearSrgb(foreground));
  const lb = relativeLuminance(toLinearSrgb(background));
  const [hi, lo] = lf > lb ? [lf, lb] : [lb, lf];
  return (hi + 0.05) / (lo + 0.05);
}
