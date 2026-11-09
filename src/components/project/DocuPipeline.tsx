import { useState } from 'react'
import { motion } from 'motion/react'
import type { Project } from '../../data/projects'
import { StatusChip } from './StatusChip'
import { useSound } from '../../lib/sound'

/** Interaction: step through the planned document-processing pipeline. */
export function DocuPipeline({ project }: { project: Project }) {
  const caps = project.capabilities ?? []
  const [i, setI] = useState(0)
  const { play } = useSound()
  const cur = caps[i]
  const implemented = caps.filter((c) => c.status === 'implemented').length

  return (
    <div className="stage stage--pipeline">
      <div className="pipe-doc" aria-hidden="true">
        <div className="pipe-sheet">
          <span /><span /><span /><span /><span />
          <i className="pipe-scan" />
        </div>
      </div>

      <div className="pipe-body">
        <p className="stage-label mono">Planned pipeline — select a stage</p>
        <ol className="pipe-steps">
          {caps.map((c, idx) => (
            <li key={c.label}>
              <button
                type="button"
                className={`pipe-step ${idx === i ? 'is-on' : ''} ${idx < i ? 'is-past' : ''}`}
                aria-pressed={idx === i}
                onClick={() => {
                  setI(idx)
                  play('select')
                }}
              >
                <span className="pipe-n mono">{String(idx + 1).padStart(2, '0')}</span>
                <span className="pipe-t">{c.label}</span>
              </button>
            </li>
          ))}
        </ol>

        <motion.div key={cur.label} className="pipe-detail" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} aria-live="polite">
          <StatusChip status={cur.status} />
          <h4>{cur.label}</h4>
          <p>{cur.detail}</p>
        </motion.div>
        <p className="stage-note mono">
          {implemented} of {caps.length} stages implemented · the rest are planned
        </p>
      </div>
    </div>
  )
}
