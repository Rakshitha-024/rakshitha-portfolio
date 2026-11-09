import { ArrowUpRight, Code2, Github, Instagram, Linkedin, Mail, type LucideIcon } from 'lucide-react'
import { resolveHref, socialLinks, type LinkId } from '../data/links'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'
import { useSound } from '../lib/sound'

const ICONS: Record<LinkId, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  leetcode: Code2,
  email: Mail,
}

export function Contact() {
  const { play } = useSound()
  return (
    <section id="contact" className="section contact wrap" aria-labelledby="contact-title">
      <SectionHead
        id="contact-title"
        index="06"
        label="Contact"
        title="Let's build something curious."
        lead="I'm open to internships, collaborations and conversations about software, AI and the web. My profiles are being linked up — they'll appear here as soon as they're ready."
      />
      <Reveal>
        <ul className="contact-list">
          {socialLinks.map((l) => {
            const Icon = ICONS[l.id]
            const href = resolveHref(l)
            const inner = (
              <>
                <span className="cl-icon"><Icon size={22} aria-hidden="true" /></span>
                <span className="cl-text">
                  <span className="cl-label">{l.label}</span>
                  <span className="cl-hint mono">{href ? l.hint : 'Link coming soon'}</span>
                </span>
                {href && <ArrowUpRight className="cl-arrow" size={22} aria-hidden="true" />}
              </>
            )
            return (
              <li key={l.id}>
                {href ? (
                  <a
                    className="cl cl--live"
                    href={href}
                    target={l.id === 'email' ? undefined : '_blank'}
                    rel={l.id === 'email' ? undefined : 'noopener noreferrer'}
                    onClick={() => play('click')}
                  >
                    {inner}
                    {l.id !== 'email' && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                ) : (
                  <div className="cl cl--pending">{inner}</div>
                )}
              </li>
            )
          })}
        </ul>
      </Reveal>
    </section>
  )
}
