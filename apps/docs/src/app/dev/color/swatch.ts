import type {Color} from 'chroma-js'

import {match} from 'ts-pattern'
import chroma from 'chroma-js'
import {mapValues, pickBy, groupBy} from 'lodash'

export type NamedColor = {key: string; value: Color}
export type SwatchArray = Array<NamedColor>

export class Swatch {
  colors: Record<string, Color> = {}

  static from(colors: Record<string, string>) {
    return new Swatch(
      mapValues(colors, (color) => {
        return chroma(color)
      }),
    )
  }

  constructor(colors: Record<string, Color>) {
    // convert to chroma color
    this.colors = colors
  }

  filterBy(text: string): Swatch {
    return new Swatch(
      pickBy(this.colors, (_, key) => {
        return key.includes(text)
      }),
    )
  }

  orderBy(ordering: 'hue' | 'lightness' | 'saturation'): SwatchArray {
    return match(ordering)
      .with('lightness', () => {
        const arr = toObjArray(this.colors)
        return arr.sort((a, b) => {
          a.value.hsl()
          return a.value.hsl()[2] - b.value.hsl()[2]
        })
      })
      .otherwise(() => {
        throw new Error('only lightness is currently supported')
      })
  }

  static groupBy(
    arr: SwatchArray,
    ordering: 'hue' | 'lightness' | 'saturation',
    buckets: number = 100,
  ) {
    const output: Array<Array<NamedColor>> = Array.from({
      length: buckets + 1,
    }).map((_) => [])

    arr.forEach(({key, value}) => {
      const l = value.hsl()[2] // 0...1
      const idx = Math.floor(l * buckets)
      try {
        output[idx].push({key, value})
      } catch (err) {
        console.log(idx)
      }
    })

    return output
  }
}

export const shopifyColors = {
  '--p-color-bg-inverse': 'rgba(31, 33, 36, 1)',
  '--p-color-bg-inset-strong': 'rgba(97, 106, 117, 1)',
  '--p-color-bg-inverse-hover': 'rgba(97, 106, 117, 1)',
  '--p-color-bg-inverse-active': 'rgba(135, 144, 155, 1)',
  '--p-color-bg-strong-hover': 'rgba(202, 206, 211, 1)',
  '--p-color-bg-strong-active': 'rgba(202, 206, 211, 1)',
  '--p-color-bg-strong': 'rgba(221, 224, 228, 1)',
  '--p-color-bg-subdued-active': 'rgba(235, 236, 239, 1)',
  '--p-color-bg-disabled': 'rgba(235, 236, 239, 1)',
  '--p-color-bg-interactive-disabled': 'rgba(235, 236, 239, 1)',
  '--p-color-bg-app': 'rgba(241, 242, 244, 1)',
  '--p-color-bg-app-active': 'rgba(221, 224, 228, 1)',
  '--p-color-bg-app-hover': 'rgba(235, 236, 239, 1)',
  '--p-color-bg-app-selected': 'rgba(235, 236, 239, 1)',
  '--p-color-bg-active': 'rgba(235, 236, 239, 1)',
  '--p-color-bg-subdued-hover': 'rgba(241, 242, 244, 1)',
  '--p-color-bg-inset': 'rgba(241, 242, 244, 1)',
  '--p-color-bg-hover': 'rgba(241, 242, 244, 1)',
  '--p-color-bg-subdued': 'rgba(249, 250, 251, 1)',
  '--p-color-bg-input': 'rgba(255, 255, 255, 1)',
  '--p-color-bg': 'rgba(255, 255, 255, 1)',
  '--p-color-bg-primary-active': 'rgba(12, 59, 47, 1)',
  '--p-color-bg-primary-hover': 'rgba(18, 84, 67, 1)',
  '--p-color-bg-primary': 'rgba(0, 122, 92, 1)',
  '--p-color-bg-success-strong': 'rgba(22, 166, 121, 1)',
  '--p-color-bg-success': 'rgba(161, 237, 208, 1)',
  '--p-color-bg-primary-subdued-active': 'rgba(192, 242, 221, 1)',
  '--p-color-bg-success-subdued-active': 'rgba(192, 242, 221, 1)',
  '--p-color-bg-success-subdued': 'rgba(224, 248, 238, 1)',
  '--p-color-bg-primary-subdued-hover': 'rgba(224, 248, 238, 1)',
  '--p-color-bg-success-subdued-hover': 'rgba(240, 253, 248, 1)',
  '--p-color-bg-primary-subdued': 'rgba(240, 253, 248, 1)',
  '--p-color-bg-primary-subdued-selected': 'rgba(240, 253, 248, 1)',
  '--p-color-bg-critical-strong-active': 'rgba(115, 24, 7, 1)',
  '--p-color-bg-critical-strong-hover': 'rgba(159, 32, 10, 1)',
  '--p-color-bg-critical-strong': 'rgba(197, 40, 12, 1)',
  '--p-color-bg-critical-subdued-active': 'rgba(251, 197, 188, 1)',
  '--p-color-bg-critical': 'rgba(251, 197, 188, 1)',
  '--p-color-bg-critical-subdued': 'rgba(253, 226, 221, 1)',
  '--p-color-bg-critical-subdued-hover': 'rgba(254, 243, 241, 1)',
  '--p-color-bg-caution-strong': 'rgba(216, 155, 13, 1)',
  '--p-color-bg-caution': 'rgba(248, 217, 144, 1)',
  '--p-color-bg-caution-subdued-active': 'rgba(250, 229, 178, 1)',
  '--p-color-bg-caution-subdued': 'rgba(252, 240, 212, 1)',
  '--p-color-bg-caution-subdued-hover': 'rgba(254, 248, 236, 1)',
  '--p-color-bg-info-strong': 'rgba(42, 172, 187, 1)',
  '--p-color-bg-info-subdued-active': 'rgba(184, 233, 239, 1)',
  '--p-color-bg-info': 'rgba(184, 233, 239, 1)',
  '--p-color-bg-info-subdued': 'rgba(222, 245, 247, 1)',
  '--p-color-bg-info-subdued-hover': 'rgba(238, 250, 251, 1)',
  '--p-color-bg-interactive-active': 'rgba(14, 53, 108, 1)',
  '--p-color-bg-interactive-hover': 'rgba(20, 73, 149, 1)',
  '--p-color-bg-interactive': 'rgba(36, 99, 188, 1)',
  '--p-color-bg-interactive-subdued-active': 'rgba(187, 212, 247, 1)',
  '--p-color-bg-interactive-subdued-hover': 'rgba(232, 240, 253, 1)',
  '--p-color-bg-interactive-subdued': 'rgba(240, 245, 253, 1)',
  '--p-color-bg-interactive-selected': 'rgba(240, 245, 253, 1)',
  '--p-color-bg-warning': 'rgba(250, 201, 168, 1)',
  '--p-color-bg-magic-strong': 'rgba(121, 69, 227, 1)',
  '--p-color-bg-magic-hover': 'rgba(226, 214, 250, 1)',
  '--p-color-bg-magic-active': 'rgba(203, 180, 248, 1)',
  '--p-color-bg-magic': 'rgba(236, 227, 253, 1)',
  '--p-color-bg-magic-subdued-hover': 'rgba(236, 227, 253, 1)',
  '--p-color-bg-magic-subdued-active': 'rgba(226, 214, 250, 1)',
  '--p-color-bg-magic-subdued': 'rgba(242, 237, 253, 1)',
  '--p-color-border-input-hover': 'rgba(97, 106, 117, 1)',
  '--p-color-border-inverse': 'rgba(97, 106, 117, 1)',
  '--p-color-border-strong-hover': 'rgba(135, 144, 155, 1)',
  '--p-color-border-input': 'rgba(171, 177, 186, 1)',
  '--p-color-border-hover': 'rgba(171, 177, 186, 1)',
  '--p-color-border-strong': 'rgba(171, 177, 186, 1)',
  '--p-color-border': 'rgba(202, 206, 211, 1)',
  '--p-color-border-disabled': 'rgba(221, 224, 228, 1)',
  '--p-color-border-subdued': 'rgba(221, 224, 228, 1)',
  '--p-color-border-interactive-disabled': 'rgba(221, 224, 228, 1)',
  '--p-color-border-primary': 'rgba(0, 122, 92, 1)',
  '--p-color-border-success': 'rgba(22, 166, 121, 1)',
  '--p-color-border-success-subdued': 'rgba(80, 220, 169, 1)',
  '--p-color-border-critical-active': 'rgba(67, 14, 4, 1)',
  '--p-color-border-critical-hover': 'rgba(115, 24, 7, 1)',
  '--p-color-border-critical': 'rgba(197, 40, 12, 1)',
  '--p-color-border-critical-subdued': 'rgba(245, 107, 82, 1)',
  '--p-color-border-caution': 'rgba(216, 155, 13, 1)',
  '--p-color-border-caution-subdued': 'rgba(245, 196, 82, 1)',
  '--p-color-border-info': 'rgba(59, 195, 211, 1)',
  '--p-color-border-info-subdued': 'rgba(109, 211, 222, 1)',
  '--p-color-border-interactive-active': 'rgba(14, 53, 108, 1)',
  '--p-color-border-interactive-hover': 'rgba(20, 73, 149, 1)',
  '--p-color-border-interactive': 'rgba(62, 125, 213, 1)',
  '--p-color-border-interactive-focus': 'rgba(62, 125, 213, 1)',
  '--p-color-border-interactive-subdued': 'rgba(187, 212, 247, 1)',
  '--p-color-border-magic-strong': 'rgba(121, 69, 227, 1)',
  '--p-color-border-magic': 'rgba(173, 139, 241, 1)',
  '--p-color-icon-hover': 'rgba(31, 33, 36, 1)',
  '--p-color-icon': 'rgba(97, 106, 117, 1)',
  '--p-color-icon-active': 'rgba(31, 33, 36, 1)',
  '--p-color-icon-subdued': 'rgba(135, 144, 155, 1)',
  '--p-color-icon-disabled': 'rgba(171, 177, 186, 1)',
  '--p-color-icon-interactive-disabled': 'rgba(171, 177, 186, 1)',
  '--p-color-icon-inverse': 'rgba(221, 224, 228, 1)',
  '--p-color-icon-on-color': 'rgba(255, 255, 255, 1)',
  '--p-color-icon-primary': 'rgba(0, 122, 92, 1)',
  '--p-color-icon-success': 'rgba(22, 166, 121, 1)',
  '--p-color-icon-critical': 'rgba(197, 40, 12, 1)',
  '--p-color-icon-caution': 'rgba(183, 126, 11, 1)',
  '--p-color-icon-info': 'rgba(42, 172, 187, 1)',
  '--p-color-icon-warning': 'rgba(242, 117, 34, 1)',
  '--p-color-icon-interactive-active': 'rgba(14, 53, 108, 1)',
  '--p-color-icon-interactive-hover': 'rgba(20, 73, 149, 1)',
  '--p-color-icon-interactive': 'rgba(36, 99, 188, 1)',
  '--p-color-icon-interactive-inverse': 'rgba(102, 153, 225, 1)',
  '--p-color-icon-magic': 'rgba(121, 69, 227, 1)',
  '--p-color-text': 'rgba(31, 33, 36, 1)',
  '--p-color-text-subdued': 'rgba(97, 106, 117, 1)',
  '--p-color-text-disabled': 'rgba(135, 144, 155, 1)',
  '--p-color-text-interactive-disabled': 'rgba(135, 144, 155, 1)',
  '--p-color-text-inverse-subdued': 'rgba(171, 177, 186, 1)',
  '--p-color-text-inverse': 'rgba(241, 242, 244, 1)',
  '--p-color-text-on-color': 'rgba(255, 255, 255, 1)',
  '--p-color-text-success-strong': 'rgba(12, 59, 47, 1)',
  '--p-color-text-success': 'rgba(0, 122, 92, 1)',
  '--p-color-text-primary': 'rgba(0, 122, 92, 1)',
  '--p-color-text-primary-hover': 'rgba(18, 84, 67, 1)',
  '--p-color-text-critical-strong': 'rgba(67, 14, 4, 1)',
  '--p-color-text-critical-active': 'rgba(115, 24, 7, 1)',
  '--p-color-text-critical': 'rgba(197, 40, 12, 1)',
  '--p-color-text-caution-strong': 'rgba(77, 46, 5, 1)',
  '--p-color-text-caution': 'rgba(135, 92, 8, 1)',
  '--p-color-text-info-strong': 'rgba(16, 65, 71, 1)',
  '--p-color-text-info': 'rgba(32, 130, 141, 1)',
  '--p-color-text-warning-strong': 'rgba(77, 36, 5, 1)',
  '--p-color-text-interactive-active': 'rgba(14, 53, 108, 1)',
  '--p-color-text-interactive-hover': 'rgba(20, 73, 149, 1)',
  '--p-color-text-interactive': 'rgba(36, 99, 188, 1)',
  '--p-color-text-interactive-inverse': 'rgba(102, 153, 225, 1)',
  '--p-color-text-magic-strong': 'rgba(49, 13, 120, 1)',
  '--p-color-text-magic': 'rgba(90, 36, 205, 1)',
}

function toObjArray<T extends Object>(
  obj: T,
): Array<{key: keyof T; value: T[keyof T]}> {
  return Object.entries(obj).map(([key, value]) => {
    return {key: key, value: value} as {key: keyof T; value: T[keyof T]}
  })
}
