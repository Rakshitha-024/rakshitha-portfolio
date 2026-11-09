import { skillGroups } from '../data/skills'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

export function Skills() {
  return (
    <section id="toolkit" className="section toolkit wrap" aria-labelledby="toolkit-title">
      <SectionHead
        id="toolkit-title"
        index="02"
        label="Toolkit"
        title="The elements I build with."
        lead="Technologies I have explored or worked with, organised like a periodic table. No inflated percentages — just an honest map of what's in my lab."
      />

      <div className="elements">
        {skillGroups.map((g, gi) => (
          <Reveal key={g.id} delay={gi * 0.08} className={`element-group element-group--${g.tone} eg-${gi + 1}`}>
            <section aria-labelledby={`grp-${g.id}`}>
              <header className="eg-head">
                <h3 id={`grp-${g.id}`}>{g.label}</h3>
                <p className="mono">{g.note}</p>
              </header>
              <ul className="eg-grid">
                {g.items.map((t) => (
                  <li key={t.name} className="tile">
                    <span className="tile-symbol" aria-hidden="true">{t.symbol}</span>
                    <span className="tile-name">{t.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
