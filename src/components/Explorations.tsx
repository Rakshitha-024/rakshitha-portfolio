import { useState } from 'react'
import { motion } from 'motion/react'
import { explorations } from '../data/explorations'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'
import { useSound } from '../lib/sound'

export function Explorations() {
  const [i, setI] = useState(0)
  const { play } = useSound()
  const cur = explorations[i]
  const marquee = explorations.map((e) => e.label).join('  ✦  ') + '  ✦  '

  return (
    <section id="exploring" className="section exploring" aria-labelledby="exploring-title">
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track" data-text={marquee} />
      </div>

      <div className="wrap">
        <SectionHead id="exploring-title" index="05" label="Currently exploring" title="What's on my screen right now." />
        <Reveal className="explore-grid">
          <ul className="explore-list">
            {explorations.map((e, idx) => (
              <li key={e.id}>
                <button
                  type="button"
                  className={`explore-item ${idx === i ? 'is-on' : ''}`}
                  aria-pressed={idx === i}
                  onClick={() => {
                    setI(idx)
                    play('select')
                  }}
                  onPointerEnter={(ev) => ev.pointerType === 'mouse' && setI(idx)}
                >
                  <span className="mono ex-n">0{idx + 1}</span>
                  <span className="ex-label">{e.label}</span>
                  <span className="ex-bar" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <div className="terminal" aria-live="polite">
            <div className="terminal-bar" aria-hidden="true"><i /><i /><i /><span className="mono">exploring.sh</span></div>
            <motion.div key={cur.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="terminal-body mono">
              <p><span className="prompt">$</span> focus --topic &quot;{cur.label}&quot;</p>
              <p className="terminal-out">{cur.blurb}</p>
              <p><span className="prompt">$</span> <span className="caret" aria-hidden="true" /></p>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
