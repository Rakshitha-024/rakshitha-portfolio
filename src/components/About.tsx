import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

const CGPA = 9.06

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduced = useReducedMotion()
  const [val, setVal] = useState(reduced ? to : 0)
  useEffect(() => {
    if (!inView || reduced) return setVal(to)
    const controls = animate(0, to, { duration: 1.6, ease: [0.2, 0.8, 0.2, 1], onUpdate: (v) => setVal(v) })
    return () => controls.stop()
  }, [inView, reduced, to])
  return (
    <span ref={ref}>
      <span className="sr-only">{to.toFixed(2)}</span>
      <span aria-hidden="true">{val.toFixed(2)}</span>
    </span>
  )
}

export function About() {
  return (
    <section id="about" className="section about wrap" aria-labelledby="about-title">
      <SectionHead id="about-title" index="01" label="About" title="Turning curiosity into things that run." />

      <div className="about-grid">
        <Reveal className="about-copy" delay={0.05}>
          <p className="about-lead">
            I&apos;m Rakshitha, a third-year B.Tech Information Technology student at SRM Institute of Science and
            Technology, Tiruchirappalli.
          </p>
          <p>
            I&apos;m drawn to the moment a vague idea becomes something that actually works — which is why I keep
            building: web interfaces in React, small backends in Python, and AI-focused projects that try to solve
            real problems for real people.
          </p>
          <p>
            I&apos;m still growing as a developer, and I treat every project as a chance to learn something properly
            instead of only shipping it. I&apos;m looking for opportunities where I can keep building, keep learning,
            and contribute to technology that is genuinely useful.
          </p>
        </Reveal>

        <Reveal className="about-spec" delay={0.15}>
          <div className="stat">
            <span className="stat-num">
              <CountUp to={CGPA} />
            </span>
            <span className="stat-label mono">Current CGPA</span>
          </div>
          <dl className="spec">
            <div>
              <dt className="mono">Studying</dt>
              <dd>B.Tech Information Technology — III Year</dd>
            </div>
            <div>
              <dt className="mono">Institution</dt>
              <dd>SRM Institute of Science and Technology, Tiruchirappalli</dd>
            </div>
            <div>
              <dt className="mono">Interests</dt>
              <dd>Software development, AI, web development, problem-solving, new technologies</dd>
            </div>
            <div>
              <dt className="mono">Mindset</dt>
              <dd>Curious mind. Creative builder. Always exploring.</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
