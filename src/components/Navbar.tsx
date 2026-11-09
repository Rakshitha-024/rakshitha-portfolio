import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, Volume2, VolumeX, X } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useSound } from '../lib/sound'

export const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'exploring', label: 'Exploring' },
  { id: 'contact', label: 'Contact' },
] as const

const SECTION_IDS = ['top', ...NAV_ITEMS.map((n) => n.id)] as const

export function Navbar() {
  const active = useActiveSection(SECTION_IDS)
  const { enabled, toggle, play } = useSound()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const go = () => {
    play('click')
    setOpen(false)
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="nav-logo" href="#top" onClick={go} aria-label="Rakshitha — back to top">
          <span className="nav-logo-mark" aria-hidden="true">R</span>
          <span className="nav-logo-text">RAKSHITHA<em> / playground</em></span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => play('select')}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={active === item.id ? 'is-active' : ''}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span layoutId="nav-underline" className="nav-underline" aria-hidden="true" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggle}
            aria-pressed={enabled}
            aria-label={enabled ? 'Sound effects on. Turn off' : 'Sound effects off. Turn on'}
            title={enabled ? 'Sound: on' : 'Sound: off'}
          >
            {enabled ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
            <span className="icon-btn-text" aria-hidden="true">{enabled ? 'SFX ON' : 'SFX OFF'}</span>
          </button>
          <button
            type="button"
            className="icon-btn nav-burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <nav aria-label="Mobile">
              <ul>
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.5 }}
                  >
                    <a href={`#${item.id}`} onClick={go}>
                      <span className="mm-index">0{i + 1}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
