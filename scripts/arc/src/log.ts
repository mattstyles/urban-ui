import type { ChalkInstance } from 'chalk'

import { createLogger } from '@urban-ui/arc-log'
import chalk from 'chalk'

export const log = {
  arc: createLogger('arc', chalk.yellow),
  transform: createLogger('arc-swc', chalk.cyan),
  definition: createLogger('arc-dts', chalk.magenta),
}

export function padRight(str: string, min: number) {
  const diff = min - str.length
  if (diff <= 0) {
    return str
  }

  return str + Array.from({ length: diff }).join(' ')
}
