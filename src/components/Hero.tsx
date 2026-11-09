import { motion } from 'motion/react'
import { ArrowDownRight, ArrowRight, Mail } from 'lucide-react'
import { Orb } from './Orb'
import { useSound } from '../lib/sound'

const NAME = 'RAKSHITHA'.split('')
const ease = [0.2, 0.8, 0.2, 1] as const

export function Hero({ onSecret }: { onSecret: () => void }) {
  const { play } = useSound()
  return (
    <section id="top" className="hero" aria-labelledby="hero-name">
      <div className="hero-meta wrap">
        <span className="mono">Digital Playground</span>
        <span className="mono hero-meta-mid">Portfolio · 2026</span>
        <span className="mono">B.Tech IT · III Year</span>
      </div>

      <div className="wrap hero-grid">
        <div className="hero-orb">
          <Orb onSecret={onSecret} />
        </div>

        <div className="hero-copy">
          <motion.p
            className="hero-kicker mono"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <span className="dot-live" aria-hidden="true" /> Hello, world — I&apos;m
          </motion.p>

          <h1 id="hero-name" className="hero-name" aria-label="Rakshitha">
            <span aria-hidden="true" className="hero-name-inner">
              {NAME.map((c, i) => (
                <span className="hl-mask" key={i}>
                  <motion.span
                    className="hl"
                    initial={{ y: '112%', rotate: 7 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 0.95, delay: 0.2 + i * 0.055, ease }}
                  >
                    {c}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
          >
            <span className="t-blue">Curious mind.</span> <span className="t-lime">Creative builder.</span>{' '}
            <span className="t-violet">Always exploring.</span>
          </motion.p>

          <motion.div
            className="hero-support"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease }}
          >
            <p>
              I explore ideas, experiment with technology, and build digital experiences that turn curiosity into
              something real.
            </p>
            <ul className="chips" aria-label="Areas of interest">
              <li>Software development</li>
              <li>Artificial intelligence</li>
              <li>Web development</li>
            </ul>
            <div className="hero-cta">
              <a className="btn btn--primary" href="#projects" onClick={() => play('click')}>
                <span>Explore My Work</span>
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="btn btn--ghost" href="#contact" onClick={() => play('click')}>
                <Mail size={18} aria-hidden="true" />
                <span>Get In Touch</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        className="scroll-cue mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        aria-label="Scroll to the about section"
      >
        <span className="scroll-cue-line" aria-hidden="true" />
        Scroll
        <ArrowDownRight size={14} aria-hidden="true" />
      </motion.a>
    </section>
  )
}
