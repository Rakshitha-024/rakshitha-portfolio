/** Technologies explored or worked with. Deliberately no proficiency scores. */
export interface Tech {
  name: string
  /** Short monogram shown on the tile */
  symbol: string
}
export interface SkillGroup {
  id: string
  label: string
  note: string
  tone: 'lavender' | 'purple' | 'orchid' | 'periwinkle'
  items: Tech[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    label: 'Programming',
    note: 'Languages I think in',
    tone: 'lavender',
    items: [
      { name: 'C++', symbol: 'C+' },
      { name: 'Python', symbol: 'Py' },
      { name: 'Java', symbol: 'Jv' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    note: 'Where ideas become interfaces',
    tone: 'purple',
    items: [
      { name: 'HTML', symbol: 'Ht' },
      { name: 'CSS', symbol: 'Cs' },
      { name: 'JavaScript', symbol: 'Js' },
      { name: 'React', symbol: 'Re' },
      { name: 'TypeScript', symbol: 'Ts' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Databases',
    note: 'Logic, APIs and data',
    tone: 'orchid',
    items: [
      { name: 'Python Flask', symbol: 'Fl' },
      { name: 'REST APIs', symbol: 'Ap' },
      { name: 'SQL / MySQL', symbol: 'Sq' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    note: 'Everyday workflow',
    tone: 'periwinkle',
    items: [
      { name: 'Git', symbol: 'Gi' },
      { name: 'GitHub', symbol: 'Gh' },
      { name: 'VS Code', symbol: 'Vs' },
    ],
  },
]
