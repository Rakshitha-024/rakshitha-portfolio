import { useState } from 'react'
import { motion } from 'motion/react'
import { Anchor, LifeBuoy, Store, Users } from 'lucide-react'
import { useSound } from '../../lib/sound'

const PILLARS = [
  { id: 'safety', label: 'Safety', Icon: LifeBuoy, text: 'Safety information for people who work on the water.' },
  { id: 'market', label: 'Market', Icon: Store, text: 'Market-related assistance to support fair, informed selling.' },
  { id: 'community', label: 'Community', Icon: Users, text: 'Community support that keeps fishing families connected.' },
] as const

/** Interaction: switch between the three pillars; the sea responds. */
export function SeaPillars() {
  const [active, setActive] = useState(0)
  const { play } = useSound()
  const p = PILLARS[active]
  return (
    <div className="stage stage--sea">
      <div className="sea-view" aria-hidden="true">
        <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="sea-waves">
          <path className="wave w1" d="M0 120 Q50 90 100 120 T200 120 T300 120 T400 120 T500 120 T600 120 V200 H0Z" />
          <path className="wave w2" d="M0 140 Q50 110 100 140 T200 140 T300 140 T400 140 T500 140 T600 140 V200 H0Z" />
          <path className="wave w3" d="M0 160 Q50 135 100 160 T200 160 T300 160 T400 160 T500 160 T600 160 V200 H0Z" />
        </svg>
        <motion.div className="sea-badge" animate={{ y: [0, -8, 0], rotate: [-4, 4, -4] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <Anchor size={26} />
        </motion.div>
      </div>

      <div className="sea-controls" role="group" aria-label="SeaSafe focus areas">
        {PILLARS.map((x, idx) => (
          <button
            key={x.id}
            type="button"
            className={`pillar ${idx === active ? 'is-on' : ''}`}
            aria-pressed={idx === active}
            onClick={() => {
              setActive(idx)
              play('select')
            }}
          >
            <x.Icon size={18} aria-hidden="true" />
            {x.label}
          </button>
        ))}
      </div>
      <motion.p key={p.id} className="stage-text" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} aria-live="polite">
        {p.text}
      </motion.p>
    </div>
  )
}
