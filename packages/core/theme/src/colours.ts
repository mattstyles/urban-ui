import {blackA, whiteA, crimson, mauve} from '@radix-ui/colors'

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
  current: 'current',
  white: 'hsl(0, 0%, 100%)',
  black: 'hsl(0, 0%, 0%)',

  // Colour scale aliases
  ...createColourScaleAlias('primary', crimson),
  ...createColourScaleAlias('bg', mauve),
}

export const colours = {
  ...blackA,
  ...whiteA,

  // Tokens
  ...tokens,
}
