import { useEffect } from 'react'
import { hexToLch, hueDelta, lchToHex, mixLch, shiftHue, type Lch } from '../theme/oklch'
import { sectionPalettes, type Palette } from '../theme/palettes'

type Roles = Record<keyof Palette, Lch>
const ROLES: (keyof Palette)[] = ['a', 'b', 'c', 'deep']

const prepared: Roles[] = sectionPalettes.map(({ palette }) => {
  const out = {} as Roles
  ROLES.forEach((r) => (out[r] = hexToLch(palette[r])))
  return out
})

const smooth = (t: number) => t * t * (3 - 2 * t)

/**
 * Scroll-linked colour engine.
 * - Inside a section the palette is pure.
 * - Around each section boundary the palettes cross-fade (OKLCH, eased) so the colour change
 *   begins slightly before the next section arrives and finishes just after.
 * - `hueShift` powers the easter-egg palette flip.
 * Only writes CSS variables when the resulting colours change, and only inside a rAF.
 */
export function useScrollTheme(ids: readonly string[], hueShift = 0): void {
  useEffect(() => {
    const root = document.documentElement
    let raf = 0
    let last = ''

    const apply = () => {
      raf = 0
      const els = ids.map((id) => document.getElementById(id))
      if (els.some((e) => e === null)) return
      const scrollY = window.scrollY
      const probe = scrollY + window.innerHeight * 0.5
      const band = Math.min(300, window.innerHeight * 0.32)
      const tops = els.map((e) => (e as HTMLElement).getBoundingClientRect().top + scrollY)

      // Which section holds the probe line?
      let i = 0
      for (let k = 0; k < tops.length; k++) if (probe >= tops[k]) i = k

      let from = i
      let to = i
      let t = 0
      const next = i + 1
      if (next < tops.length && tops[next] - probe < band) {
        from = i
        to = next
        t = smooth(1 - (tops[next] - probe) / band) * 0.5 // first half of the fade, before the boundary
      } else if (i > 0 && probe - tops[i] < band) {
        from = i - 1
        to = i
        t = 0.5 + smooth((probe - tops[i]) / band) * 0.5 // second half, after the boundary
      }

      // Every role travels the same way round the hue wheel as the primary accent, so pale tints
      // never detour through an unrelated hue (e.g. ice-blue → peach via green).
      const lead = hueDelta(prepared[from].a.h, prepared[to].a.h)
      const dir: 0 | 1 | -1 = lead > 0.5 ? 1 : lead < -0.5 ? -1 : 0
      const key: string[] = []
      ROLES.forEach((r) => {
        let col = mixLch(prepared[from][r], prepared[to][r], t, dir)
        if (hueShift) col = shiftHue(col, hueShift)
        const hex = lchToHex(col)
        key.push(hex)
        const prop = r === 'a' ? '--accent' : r === 'b' ? '--accent-2' : r === 'c' ? '--accent-3' : '--accent-deep'
        if (!last || last.split('|')[ROLES.indexOf(r)] !== hex) root.style.setProperty(prop, hex)
      })
      last = key.join('|')
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('load', schedule)
    const ro = new ResizeObserver(schedule) // layout shifts (fonts, expanding panels)
    ro.observe(document.body)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('load', schedule)
      ro.disconnect()
    }
  }, [ids, hueShift])
}
