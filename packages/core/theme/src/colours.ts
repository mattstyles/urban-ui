import {blackA, whiteA, red, crimson, mauve, mauveDark} from '@radix-ui/colors'

function createColourScaleAlias(
  alias: string,
  scale: Record<string, string>
): Record<string, string> {
  const output: Record<string, string> = {}
  for (let [id, colour] of Object.entries(scale)) {
    const value = id.match(/[0-9]+/)?.[0]
    if (value == null) {
      throw new Error(
        `Can not create alias (${alias}) from scale. Unexpected scale key: ${id}`
      )
    }
    output[alias + value] = colour
  }
  return output
}

export const tokens = {
  transparent: 'transparent',
  currentcolor: 'currentcolor',
  white: 'hsl(0, 0%, 100%)',
  black: 'hsl(0, 0%, 0%)',
  focus: '-webkit-focus-ring-color',

  // These are slightly red. Our default colour scheme uses Crimson as a primary colour, which then uses Mauve for backgrounds so we're in the red hue by default.
  highContrast: 'hsla(0, 4%, 19%, 0.96)',
  lowContrast: 'hsla(0, 4%, 30%, 0.88)',
  highContrastInverse: 'hsla(8, 10%, 98%, 0.98)',
  lowContrastInverse: 'hsla(10, 3%, 88%, 0.88)',

  // Contrast aliases
  hc: '$highContrast',
  lc: '$lowContrast',
  hci: '$highContrastInverse',
  lci: '$lowContrastInverse',

  // Type colours
  text: '$highContrast',
  textLowContrast: '$lowContrast',
  textInverse: '$highContrastInverse',
  textLowConstrastInverse: '$lowContrastInverse',

  textPrimary: '$primary12',
  textHighlight: '$primary11',

  // Tonality
  ...createColourScaleAlias('bg', mauve),
  ...createColourScaleAlias('bgInv', mauveDark),
  ...createColourScaleAlias('primary', crimson),
  ...createColourScaleAlias('critical', red),
  ...createColourScaleAlias('neutral', mauve),
}

export const colours = {
  ...blackA,
  ...whiteA,

  // Tokens
  ...tokens,
}
