/**
 * Section palettes — the single place to tweak the colour story.
 *
 * Every palette has four roles. Components never hard-code colours; they read these as CSS variables
 * (--accent, --accent-2, --accent-3, --accent-deep) which the scroll theme engine blends between sections.
 *
 *  a     primary accent   → buttons, key headings, borders, cursor, 3D centrepiece
 *  b     secondary accent → gradients, secondary highlights (kept ≥ 4.5:1 on the charcoal for text use)
 *  c     soft tint        → light text accents, hovered states
 *  deep  deep shade       → ambient lighting only (never used for text)
 */
export interface Palette {
  a: string
  b: string
  c: string
  deep: string
}

export interface SectionPalette {
  id: string
  name: string
  palette: Palette
}

export const sectionPalettes: SectionPalette[] = [
  { id: 'top', name: 'Hero — burgundy, crimson, rose', palette: { a: '#e8708f', b: '#de4a68', c: '#f6b8c6', deep: '#5c0e24' } },
  { id: 'about', name: 'About — rose pink, soft blush', palette: { a: '#f0a0b8', b: '#e27d9b', c: '#fbd9df', deep: '#7a3a4c' } },
  { id: 'toolkit', name: 'Skills — lavender, purple', palette: { a: '#b49af0', b: '#9467de', c: '#dccffa', deep: '#3f2574' } },
  { id: 'projects', name: 'Projects — ocean blue, cyan', palette: { a: '#52a9ec', b: '#34c3d4', c: '#b6e3f5', deep: '#0f3a5e' } },
  { id: 'journey', name: 'Journey — warm orange, coral', palette: { a: '#ee8a52', b: '#e8675d', c: '#fbcfb0', deep: '#6b2a16' } },
  // Bridges the warm Journey palette into the magenta Contact palette so the final scroll feels connected.
  { id: 'exploring', name: 'Exploring — coral rose → orchid (bridge)', palette: { a: '#e5707a', b: '#c95a9b', c: '#f5c0cd', deep: '#5a1f45' } },
  { id: 'contact', name: 'Contact — magenta, pink', palette: { a: '#e05aa8', b: '#d24fa2', c: '#f7b7d8', deep: '#5e1a4d' } },
]

/** Section ids in DOM order, consumed by the scroll theme hook. */
export const sectionIds = sectionPalettes.map((s) => s.id)
