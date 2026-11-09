import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'

const STEPS = [
  {
    chapter: 'Chapter 01',
    title: 'B.Tech Information Technology',
    meta: 'III Year · CGPA 9.06',
    body: 'Studying Information Technology at SRM Institute of Science and Technology, Tiruchirappalli, building the fundamentals of programming, databases and systems.',
  },
  {
    chapter: 'Chapter 02',
    title: 'Academic projects',
    meta: 'SeaSafe · B-Tree Index Optimization',
    body: 'Turning coursework into projects that touch real contexts — fishing communities in Nagapattinam and the performance of database indexes.',
  },
  {
    chapter: 'Chapter 03',
    title: 'Personal project development',
    meta: 'DocuSense AI · AEGIS AI',
    body: 'Exploring ambitious ideas on my own — an AI document-intelligence platform in development and an emergency-guidance concept.',
  },
  {
    chapter: 'Chapter 04',
    title: 'Continued exploration',
    meta: 'Programming · AI · Web technologies',
    body: 'Still learning in every direction: stronger fundamentals, more AI, more full-stack work, and more things built end to end.',
  },
]

export function Journey() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  return (
    <section id="journey" className="section journey wrap" aria-labelledby="journey-title">
      <SectionHead id="journey-title" index="04" label="Journey" title="A path still being drawn." />
      <ol className="timeline" ref={ref}>
        <span className="timeline-track" aria-hidden="true">
          <motion.span className="timeline-fill" style={{ scaleY }} />
        </span>
        {STEPS.map((s, i) => (
          <li key={s.chapter} className={`tl-item ${i % 2 ? 'tl-item--right' : ''}`}>
            <span className="tl-node" aria-hidden="true" />
            <Reveal className="tl-card" y={28}>
              <p className="mono tl-chapter">{s.chapter}</p>
              <h3>{s.title}</h3>
              <p className="tl-meta mono">{s.meta}</p>
              <p>{s.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
