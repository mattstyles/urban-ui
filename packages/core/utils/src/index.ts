export {mapValues} from './map.ts'

export function px(value: string | number) {
  return value + 'px'
}

/**
 * Borders are often defined as box-shadow
 */
export function makeBorder(color: string, width: string | number) {
  return `0px 0px 0px ${width} ${color}`
}

/**
 * For properties like box-shadow or transition where you want to apply multiple values
 */
export function combine(values: Array<string>) {
  return values.join(', ')
}
