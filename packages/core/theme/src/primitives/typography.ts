// ts error
// import arialMetrics from '@capsizecss/metrics/arial'

// Inlined from @capsizecss/metrics/arial to avoid ts import error
const arialMetrics = {
	familyName: "Arial",
	category: "sans-serif",
	capHeight: 1467,
	ascent: 1854,
	descent: -434,
	lineGap: 67,
	unitsPerEm: 2048,
	xHeight: 1062,
	xWidthAvg: 904,
};

interface FontMetrics {
	familyName: string;
	category: string;
	capHeight: number;
	ascent: number;
	descent: number;
	lineGap: number;
	unitsPerEm: number;
	xHeight: number;
	xWidthAvg: number;
}

export const type: Record<
	"xs" | "sm" | "md" | "lg" | "xl",
	{
		fontSize: number;
		leading: number;
		fontMetrics: FontMetrics;
	}
> = {
	xs: {
		fontSize: 11,
		leading: 16,
		fontMetrics: arialMetrics,
	},
	sm: {
		fontSize: 12,
		leading: 16,
		fontMetrics: arialMetrics,
	},
	md: {
		fontSize: 14,
		leading: 20,
		fontMetrics: arialMetrics,
	},
	lg: {
		fontSize: 16,
		leading: 24,
		fontMetrics: arialMetrics,
	},
	xl: {
		fontSize: 19,
		leading: 32,
		fontMetrics: arialMetrics,
	},
};

export const fonts = {
	mono: "Source Code Pro, SFMono-Regular, Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
	system:
		"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif",
};

export const weights = {
	light: "300",
	normal: "400",
	semibold: "500",
	bold: "600",
};

export const kerning = {
	xs: "-1px",
	sm: "-0.5px",
	md: "0px",
	lg: "1px",
	xl: "2.5px",
};
