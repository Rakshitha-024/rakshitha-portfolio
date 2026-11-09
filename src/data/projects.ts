/**
 * Project data — single source of truth for the showcase + case studies.
 *
 * HONESTY RULES (keep them when you edit):
 *  - Capability `status` is 'planned' | 'in-progress' | 'implemented'.
 *    Everything is 'planned' by default. Flip a capability to 'in-progress' or
 *    'implemented' ONLY when it genuinely is. The UI updates automatically.
 *  - `links.github` / `links.demo`: leave undefined until a real URL exists.
 *    Nothing is rendered for missing links.
 *  - `technologies` lists only stack items / focus areas that were provided.
 *    Add the exact stack you used once you want it displayed.
 */
export type Status = 'planned' | 'in-progress' | 'implemented'
export type ProjectKind = 'Under development' | 'Academic project' | 'Concept / prototype'

export interface Capability {
  label: string
  detail: string
  status: Status
}

export interface Project {
  id: 'docusense' | 'seasafe' | 'aegis' | 'btree'
  index: string
  name: string
  title: string
  kind: ProjectKind
  tone: 'ocean' | 'cyan' | 'azure' | 'ice'
  summary: string
  tags: string[]
  problem: string
  approach: string
  technologies: string[]
  technologiesLabel: string
  statusNote: string
  capabilities?: Capability[]
  links: { github?: string; demo?: string }
}

export const projects: Project[] = [
  {
    id: 'docusense',
    index: '01',
    name: 'DocuSense AI',
    title: 'Enterprise Document Intelligence, Automation & Analytics Platform',
    kind: 'Under development',
    tone: 'ocean',
    summary:
      'An AI-focused platform concept for processing documents, extracting information, identifying inconsistencies, and presenting useful analytics.',
    tags: ['React', 'Python', 'OCR', 'LLMs', 'Data validation', 'Analytics'],
    problem:
      'Organisations handle large volumes of documents, and pulling out the information that matters — while catching mismatches between documents — is slow, repetitive work.',
    approach:
      'Design a pipeline where uploaded documents are read with OCR, interpreted with LLM assistance, checked by validation rules, and turned into analytics, history and reports. Built as a React frontend with a Python backend.',
    technologies: ['React (frontend)', 'Python (backend)', 'OCR', 'LLM-assisted understanding'],
    technologiesLabel: 'Technologies',
    statusNote:
      'Currently under development. This is a platform concept in progress — capabilities below are planned unless marked otherwise.',
    capabilities: [
      { label: 'Document uploads', detail: 'Bring PDFs and scans into the platform.', status: 'planned' },
      { label: 'OCR & text extraction', detail: 'Turn scanned pages into machine-readable text.', status: 'planned' },
      { label: 'LLM-assisted understanding', detail: 'Interpret what a document actually says.', status: 'planned' },
      { label: 'Data validation', detail: 'Flag inconsistencies across extracted data.', status: 'planned' },
      { label: 'Analytics & insights', detail: 'Summarise patterns across processed documents.', status: 'planned' },
      { label: 'Processing history & reports', detail: 'Keep a trail and generate readable reports.', status: 'planned' },
    ],
    links: {},
  },
  {
    id: 'seasafe',
    index: '02',
    name: 'SeaSafe',
    title: 'Integrated Safety, Market and Community Support Platform for Fishermen',
    kind: 'Academic project',
    tone: 'cyan',
    summary:
      'An academic project focused on supporting fishing communities through safety information, market-related assistance, and community support.',
    tags: ['Nagapattinam fisheries', 'Safety', 'Market access', 'Community', 'Academic'],
    problem:
      'Fishing communities in Nagapattinam depend on timely safety information, awareness of the market, and each other. These needs are usually served by separate, disconnected sources.',
    approach:
      'Bring three areas — safety information, market-related assistance and community support — together in one integrated platform designed around the needs of fishing communities.',
    technologies: ['Safety information', 'Market-related assistance', 'Community support'],
    technologiesLabel: 'Focus areas',
    statusNote: 'Academic project developed in the context of Nagapattinam fisheries.',
    links: {},
  },
  {
    id: 'aegis',
    index: '03',
    name: 'AEGIS AI',
    title: 'AI-Assisted Emergency Guidance and Rescue Optimization Platform',
    kind: 'Concept / prototype',
    tone: 'azure',
    summary:
      'A project concept exploring how AI and data from weather information, satellite data, IoT devices and citizen reports could support emergency response.',
    tags: ['AI', 'Weather data', 'Satellite data', 'IoT', 'Citizen reports', 'Emergency response'],
    problem:
      'During floods, cyclones, earthquakes and wildfires, the information responders need is scattered across many sources and changes quickly.',
    approach:
      'Explore how weather information, satellite data, IoT devices and citizen reports could be combined, with AI assistance, to guide emergency response and optimise rescue decisions.',
    technologies: ['Weather information', 'Satellite data', 'IoT devices', 'Citizen reports'],
    technologiesLabel: 'Data sources explored',
    statusNote:
      'Concept / prototype. This idea has not been fully implemented, and nothing here should be read as a deployed system.',
    links: {},
  },
  {
    id: 'btree',
    index: '04',
    name: 'B-Tree Index Optimization',
    title: 'AI-Assisted B-Tree Index Optimization for Large-Scale Databases',
    kind: 'Academic project',
    tone: 'ice',
    summary:
      'An academic DBMS project exploring database indexing, benchmarking, and AI-assisted analysis of index optimization.',
    tags: ['DBMS', 'B-Tree', 'Indexing', 'Benchmarking', 'AI-assisted analysis'],
    problem:
      'As databases grow, the way data is indexed strongly affects how quickly queries can be answered — and choosing or tuning an index is not always obvious.',
    approach:
      'Study how B-Tree indexes work, benchmark indexing behaviour, and explore how AI-assisted analysis can help reason about index optimization.',
    technologies: ['B-Tree indexing', 'Benchmarking', 'Database systems', 'AI-assisted analysis'],
    technologiesLabel: 'Focus areas',
    statusNote:
      'Academic DBMS project. The interactive B-Tree on this page is a small illustrative demo, not data from the project.',
    links: {},
  },
]
