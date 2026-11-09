export interface Exploration {
  id: string
  label: string
  blurb: string
}

export const explorations: Exploration[] = [
  {
    id: 'ai-ml',
    label: 'Artificial Intelligence & Machine Learning',
    blurb: 'Understanding how models learn, and where they genuinely help in real software.',
  },
  {
    id: 'genai',
    label: 'Generative AI & LLM applications',
    blurb: 'Building with language models — prompting, document understanding and useful interfaces.',
  },
  {
    id: 'fullstack',
    label: 'Full-stack web development',
    blurb: 'Connecting React frontends to Python backends, APIs and databases end to end.',
  },
  {
    id: 'dsa',
    label: 'Data Structures & Algorithms',
    blurb: 'Sharpening problem-solving fundamentals — the foundation under everything else.',
  },
  {
    id: 'practical',
    label: 'Building practical software projects',
    blurb: 'Shipping small, useful things and learning from every rough edge along the way.',
  },
]
