/**
 * Provides proper typing for vanilla extract to be able to type style objects
 */
export function mapValues<T extends object, U>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => U,
): Record<keyof T, U> {
  const output = {} as Record<keyof T, U>
  let prop: keyof T
  for (prop in obj) {
    output[prop] = predicate(obj[prop], prop)
  }
  return output
}
