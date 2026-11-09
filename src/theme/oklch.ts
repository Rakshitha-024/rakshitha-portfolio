/**
 * Small OKLCH colour toolkit used to blend section palettes.
 * Blending in OKLCH (instead of sRGB) keeps mid-transition colours rich: blue → orange
 * travels through violet and pink like a sunset instead of collapsing into muddy grey.
 */
export interface Lch {
  l: number
  c: number
  h: number
}

const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
const fromLinear = (v: number) => (v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055)

export function hexToLch(hex: string): Lch {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = toLinear(((n >> 16) & 255) / 255)
  const g = toLinear(((n >> 8) & 255) / 255)
  const b = toLinear((n & 255) / 255)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  return { l: L, c: Math.hypot(A, B), h: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 }
}

function lchToLinearRgb({ l, c, h }: Lch): [number, number, number] {
  const a = c * Math.cos((h * Math.PI) / 180)
  const b = c * Math.sin((h * Math.PI) / 180)
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ]
}

const inGamut = (rgb: number[]) => rgb.every((v) => v >= -0.001 && v <= 1.001)

export function lchToHex(lch: Lch): string {
  let { c } = lch
  let rgb = lchToLinearRgb({ ...lch, c })
  // Pull chroma in until the colour fits sRGB (keeps hue + lightness, avoids harsh clipping).
  for (let i = 0; i < 40 && !inGamut(rgb); i++) {
    c = Math.max(0, c - 0.01)
    rgb = lchToLinearRgb({ ...lch, c })
  }
  const byte = (v: number) => Math.round(Math.min(1, Math.max(0, fromLinear(Math.min(1, Math.max(0, v))))) * 255)
  return `#${rgb.map((v) => byte(v).toString(16).padStart(2, '0')).join('')}`
}

/** Signed hue travel from a to b: shortest path, or forced clockwise (1) / counter-clockwise (-1). */
export function hueDelta(a: number, b: number, dir: 0 | 1 | -1 = 0): number {
  let d = (((b - a) % 360) + 360) % 360 // 0..360 clockwise
  if (dir === 1) return d
  if (dir === -1) return d === 0 ? 0 : d - 360
  if (d > 180) d -= 360
  return d
}

/** Mix two OKLCH colours. Hue follows the shortest path unless a direction is forced. */
export function mixLch(a: Lch, b: Lch, t: number, dir: 0 | 1 | -1 = 0): Lch {
  return {
    l: a.l + (b.l - a.l) * t,
    c: a.c + (b.c - a.c) * t,
    h: (a.h + hueDelta(a.h, b.h, dir) * t + 360) % 360,
  }
}

export const shiftHue = (x: Lch, deg: number): Lch => ({ ...x, h: (x.h + deg + 360) % 360 })
