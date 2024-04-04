// The base nature of a theme, denoted by how light or dark the typical colour range is, defines how alpha transparency should affect colours those components are laid over.
// For example, lightening a very dark shade is a way to add some contrast to a change, but lightening a very light shade is usually invisible. In this case, typically a component will want to darken the light shade and lighten a dark shade. This operation is an 'accent' of the overlaid colour. The reverse operation we call a deepening as it is moving deeper within the lightness shade i.e. _towards_ a lighter shade or _towards_ a darker shade.

// @radix-ui/colors/white-alpha
// lighten
export const accent = {
	0: "hsla(0, 0%, 100%, 0)",
	50: "hsla(0, 0%, 100%, 0.013)",
	75: "hsla(0, 0%, 100%, 0.034)",
	100: "hsla(0, 0%, 100%, 0.056)",
	200: "hsla(0, 0%, 100%, 0.086)",
	300: "hsla(0, 0%, 100%, 0.124)",
	400: "hsla(0, 0%, 100%, 0.176)",
	500: "hsla(0, 0%, 100%, 0.249)",
	600: "hsla(0, 0%, 100%, 0.386)",
	700: "hsla(0, 0%, 100%, 0.446)",
	800: "hsla(0, 0%, 100%, 0.592)",
	900: "hsla(0, 0%, 100%, 0.923)",
};

// @radix-ui/colors/black-alpha
// darken
export const deepen = {
	0: "hsla(0, 0%, 0%, 0.012)",
	50: "hsla(0, 0%, 0%, 0.027)",
	75: "hsla(0, 0%, 0%, 0.047)",
	100: "hsla(0, 0%, 0%, 0.071)",
	200: "hsla(0, 0%, 0%, 0.090)",
	300: "hsla(0, 0%, 0%, 0.114)",
	400: "hsla(0, 0%, 0%, 0.141)",
	500: "hsla(0, 0%, 0%, 0.220)",
	600: "hsla(0, 0%, 0%, 0.439)",
	700: "hsla(0, 0%, 0%, 0.478)",
	800: "hsla(0, 0%, 0%, 0.565)",
	900: "hsla(0, 0%, 0%, 0.910)",
};

export const core = {
	transparent: "transparent",
	current: "currentcolor",
	currentcolor: "currentcolor",
	disabled: {
		fg: "hsl(0, 0%, 42%)",
		bg: "hsl(0, 0%, 76%)",
	},
	focus: "hsl(0, 0%, 0%)",
	white: "hsl(0, 100%, 100%)",
	black: "hsl(0, 0%, 0%)",
};

export const coreApp = {
	bg: {
		muted: "hsl(0, 0%, 100%)",
		base: "hsl(0, 0%, 96%)",
		subtle: "hsl(0, 0%, 91%)",
		emphasis: "hsl(0, 0%, 82%)",
	},
	fg: {
		base: {
			hi: "hsl(0, 0%, 23%)",
			lo: "hsl(0, 0%, 38%)",
		},
		invert: {
			hi: "hsl(0, 0%, 100%)",
			lo: "hsl(0, 0%, 72%)",
		},
	},
};

export const tones = {
	primary: {
		fg: {
			invert: {
				hi: "hsl(300, 82%, 96%)",
				lo: "hsl(310, 72%, 69%)",
			},
			base: { hi: "hsl(320, 70%, 42%)", lo: "hsl(323, 75%, 55%)" },
		},
		surface: {
			muted: "hsl(322, 100%, 99.4%)",
			base: "hsl(323, 100%, 98.4%)",
			subtle: "hsl(317, 97%, 96%)",
			emphasis: "hsl(319, 99%, 93%)",
		},
		element: {
			muted: {
				base: "hsl(323, 86.3%, 96.5%)",
				hover: "hsl(323, 78.7%, 94.2%)",
				press: "hsl(323, 72.2%, 91.1%)",
				selected: "hsl(323, 66.3%, 86.6%)",
			},
			strong: {
				base: "hsl(322, 65.0%, 54.5%)",
				hover: "hsl(322, 63.9%, 50.7%)",
				press: "hsl(323, 61.9%, 46.7%)",
				selected: "hsl(321, 60.9%, 42.7%)",
			},
		},
		border: {
			muted: "hsl(323, 70.6%, 90.6%)",
			base: "hsl(323, 66.3%, 86.6%)",
			subtle: "hsl(323, 62.0%, 80.1%)",
			emphasis: "hsl(323, 60.3%, 72.4%)",
		},
		shadow: "321deg 30% 63%",
	},

	neutral: {
		fg: {
			invert: {
				hi: "hsl(0, 0%, 97%)",
				lo: "hsl(0, 0%, 86%)",
			},
			base: { hi: "hsl(0, 0%, 23%)", lo: "hsl(0, 0%, 38%)" },
		},
		surface: {
			muted: "hsl(0, 0%, 96%)",
			base: "hsl(0, 0%, 94%)",
			subtle: "hsl(0, 0%, 91%)",
			emphasis: "hsl(0, 0%, 86%)",
		},
		element: {
			muted: {
				base: "hsl(0, 0%, 80%)",
				hover: "hsl(0, 0%, 78%)",
				press: "hsl(0, 0%, 75%)",
				selected: "hsl(0, 0%, 71%)",
			},
			strong: {
				base: "hsl(0, 0%, 52%)",
				hover: "hsl(0, 0%, 49%)",
				press: "hsl(0, 0%, 45%)",
				selected: "hsl(0, 0%, 42%)",
			},
		},
		border: {
			muted: "hsl(0, 0%, 88%)",
			base: "hsl(0, 0%, 82%)",
			subtle: "hsl(0, 0%, 79%)",
			emphasis: "hsl(0, 0%, 72%)",
		},
		shadow: "0deg 0% 63%",
	},

	critical: {
		fg: {
			invert: {
				hi: "hsl(345, 84.9%, 97%)",
				lo: "hsl(339, 73.9%, 71.7%)",
			},
			base: {
				// hi: 'hsl(344, 63.0%, 24.0%)',
				// lo: 'hsl(345, 70.0%, 46.5%)'
				hi: "hsl(345, 70.0%, 42.5%)",
				lo: "hsl(349, 74.3%, 52.1%)",
			},
		},
		surface: {
			muted: "hsl(348, 100%, 99.5%)",
			base: "hsl(345, 100%, 98.4%)",
			subtle: "hsl(340, 97%, 96.4%)",
			emphasis: "hsl(340, 98%, 93%)",
		},
		element: {
			muted: {
				base: "hsl(345, 89.9%, 96.7%)",
				hover: "hsl(346, 82.6%, 94.4%)",
				press: "hsl(346, 75.8%, 91.4%)",
				selected: "hsl(347, 69.3%, 87.1%)",
			},
			strong: {
				base: "hsl(348, 75.0%, 58.5%)",
				hover: "hsl(347, 68.6%, 55.1%)",
				press: "hsl(346, 64.6%, 50.1%)",
				selected: "hsl(347, 68.6%, 44.7%)",
			},
		},
		border: {
			muted: "hsl(347, 72.3%, 91.1%)",
			base: "hsl(347, 69.3%, 87.1%)",
			subtle: "hsl(348, 64.3%, 80.9%)",
			emphasis: "hsl(348, 61.3%, 72.9%)",
		},
		shadow: "342deg 28% 62%",
	},
};
