import { useEffect, useRef } from 'react'
import { ExternalLink, Github, X } from 'lucide-react'
import type { Project } from '../../data/projects'
import { StatusChip } from './StatusChip'

/** Accessible case-study modal built on the native <dialog> (focus trap + Esc come for free). */
export function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    d.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      if (d.open) d.close()
    }
  }, [])

  const hasLinks = Boolean(project.links.github || project.links.demo)

  return (
    <dialog
      ref={ref}
      className={`case case--${project.tone}`}
      aria-labelledby="case-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
    >
      <div className="case-inner">
        <button type="button" className="case-close icon-btn" onClick={() => ref.current?.close()} aria-label="Close case study">
          <X size={20} aria-hidden="true" />
        </button>
        <p className="eyebrow">
          <span className="eyebrow-index">{project.index}</span>
          <span className="eyebrow-rule" aria-hidden="true" />
          <span>Case study · {project.kind}</span>
        </p>
        <h3 id="case-title" className="case-title">{project.name}</h3>
        <p className="case-sub">{project.title}</p>

        <div className="case-grid">
          <section aria-labelledby="cs-problem">
            <h4 id="cs-problem" className="mono">The problem</h4>
            <p>{project.problem}</p>
          </section>
          <section aria-labelledby="cs-approach">
            <h4 id="cs-approach" className="mono">The approach</h4>
            <p>{project.approach}</p>
          </section>
          <section aria-labelledby="cs-tech">
            <h4 id="cs-tech" className="mono">{project.technologiesLabel}</h4>
            <ul className="chips">
              {project.technologies.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="cs-status">
            <h4 id="cs-status" className="mono">Current status</h4>
            <p>{project.statusNote}</p>
          </section>
        </div>

        {project.capabilities && (
          <section aria-labelledby="cs-caps" className="case-caps">
            <h4 id="cs-caps" className="mono">Capabilities — built vs. planned</h4>
            <ul>
              {project.capabilities.map((c) => (
                <li key={c.label}>
                  <span>{c.label}</span>
                  <StatusChip status={c.status} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="case-links">
          {project.links.github && (
            <a className="btn btn--ghost" href={project.links.github} target="_blank" rel="noopener noreferrer">
              <Github size={18} aria-hidden="true" /> Source code <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {project.links.demo && (
            <a className="btn btn--primary" href={project.links.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} aria-hidden="true" /> Live demo <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {!hasLinks && <p className="mono case-nolinks">No public repository or live demo yet.</p>}
        </div>
      </div>
    </dialog>
  )
}
