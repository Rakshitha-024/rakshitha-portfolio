import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'
import { CaseStudy } from './project/CaseStudy'
import { ProjectStage } from './project/ProjectStage'
import { useSound } from '../lib/sound'

export function Projects() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const { play } = useSound()
  const p = projects[active]

  const select = (i: number, focus = false) => {
    setActive(i)
    if (focus) tabs.current[i]?.focus()
  }
  const onKey = (e: KeyboardEvent) => {
    const n = projects.length
    const map: Record<string, number> = {
      ArrowDown: (active + 1) % n,
      ArrowRight: (active + 1) % n,
      ArrowUp: (active - 1 + n) % n,
      ArrowLeft: (active - 1 + n) % n,
      Home: 0,
      End: n - 1,
    }
    if (e.key in map) {
      e.preventDefault()
      select(map[e.key], true)
      play('select')
    }
  }

  return (
    <section id="projects" className="section projects wrap" aria-labelledby="projects-title">
      <SectionHead
        id="projects-title"
        index="03"
        label="Projects"
        title="Experiments, prototypes & academic builds."
        lead="Each project has a small interaction to play with and a case study to open. Status labels are literal: if something is planned, it says planned."
      />

      <Reveal className="showcase">
        <div className="showcase-list" role="tablist" aria-label="Projects" aria-orientation="vertical" onKeyDown={onKey}>
          {projects.map((pr, i) => (
            <button
              key={pr.id}
              ref={(el) => {
                tabs.current[i] = el
              }}
              role="tab"
              id={`tab-${pr.id}`}
              aria-selected={i === active}
              aria-controls="project-panel"
              tabIndex={i === active ? 0 : -1}
              className={`showcase-tab tone-${pr.tone} ${i === active ? 'is-active' : ''}`}
              onClick={() => {
                select(i)
                play('select')
              }}
              onPointerEnter={(e) => e.pointerType === 'mouse' && select(i)}
            >
              <span className="st-index mono">{pr.index}</span>
              <span className="st-name">{pr.name}</span>
              <span className="st-kind mono">{pr.kind}</span>
            </button>
          ))}
        </div>

        <div id="project-panel" role="tabpanel" aria-labelledby={`tab-${p.id}`} className={`showcase-panel tone-${p.tone}`} tabIndex={0}>
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="panel-top">
                <span className={`kind kind--${p.kind === 'Under development' ? 'dev' : p.kind === 'Concept / prototype' ? 'concept' : 'academic'}`}>
                  {p.kind}
                </span>
                <span className="panel-index mono">{p.index} / 04</span>
              </div>
              <h3 className="panel-name">{p.name}</h3>
              <p className="panel-title">{p.title}</p>
              <p className="panel-summary">{p.summary}</p>
              <ul className="chips" aria-label={`${p.name} tags`}>
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <ProjectStage project={p} />

              <div className="panel-actions">
                <button type="button" className="btn btn--primary" onClick={() => { play('click'); setOpen(true) }}>
                  <span>Open case study</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
                {p.links.github && (
                  <a className="btn btn--ghost" href={p.links.github} target="_blank" rel="noopener noreferrer">
                    <Github size={18} aria-hidden="true" /> Code <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {p.links.demo && (
                  <a className="btn btn--ghost" href={p.links.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} aria-hidden="true" /> Live demo <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>

      {open && <CaseStudy project={p} onClose={() => setOpen(false)} />}
    </section>
  )
}
