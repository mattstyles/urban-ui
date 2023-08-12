export type MapType<Scale, T> = {
  [Property in keyof Scale]: T
}

export const restrictedSemanticScale = {
  sm: null,
  md: null,
  lg: null,
}
export const semanticScale = {
  xs: null,
  ...restrictedSemanticScale,
  xl: null,
}
export const extendedSemanticScale = {
  xxs: null,
  ...semanticScale,
  xxl: null,
}

export const numericScale = {
  0: null,
  100: null,
  200: null,
  300: null,
  400: null,
  500: null,
  600: null,
  700: null,
  800: null,
  900: null,
}

export const extendedNumericScale = {
  25: null,
  50: null,
  75: null,
  ...numericScale,
  1000: null,
  1100: null,
  1200: null,
}
