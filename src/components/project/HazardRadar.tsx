import { useState } from 'react'
import { Activity, Flame, Waves, Wind } from 'lucide-react'
import { useSound } from '../../lib/sound'

const HAZARDS = [
  { id: 'flood', label: 'Floods', Icon: Waves, hue: '#5aaaf0' },
  { id: 'cyclone', label: 'Cyclones', Icon: Wind, hue: '#8aa4f5' },
  { id: 'quake', label: 'Earthquakes', Icon: Activity, hue: '#3fc6d8' },
  { id: 'fire', label: 'Wildfires', Icon: Flame, hue: '#7fd6c2' },
] as const

const SOURCES = [
  { label: 'Weather', a: -90 },
  { label: 'Satellite', a: 0 },
  { label: 'IoT', a: 90 },
  { label: 'Citizen reports', a: 180 },
]

/** Interaction: pick a hazard; the concept radar re-tunes. Purely illustrative. */
export function HazardRadar() {
  const [active, setActive] = useState(0)
  const { play } = useSound()
  const h = HAZARDS[active]
  return (
    <div className="stage stage--radar" style={{ ['--hz' as string]: h.hue }}>
      <svg viewBox="-110 -110 220 220" className="radar" role="img" aria-label={`Concept radar for ${h.label}: weather, satellite, IoT and citizen-report inputs feeding AI guidance`}>
        {[30, 60, 90].map((r) => (
          <circle key={r} r={r} className="radar-ring" />
        ))}
        <line x1="-100" x2="100" className="radar-axis" />
        <line y1="-100" y2="100" className="radar-axis" />
        <g className="radar-sweep">
          <path d="M0 0 L90 0 A90 90 0 0 0 63.6 -63.6Z" className="radar-wedge" />
        </g>
        {SOURCES.map((s) => {
          const x = Math.cos((s.a * Math.PI) / 180) * 70
          const y = Math.sin((s.a * Math.PI) / 180) * 70
          const anchor = s.a === 0 ? 'start' : s.a === 180 ? 'end' : 'middle'
          const dx = s.a === 0 ? 10 : s.a === 180 ? -10 : 0
          const dy = s.a === -90 ? -10 : s.a === 90 ? 18 : 4
          return (
            <g key={s.label}>
              <circle cx={x} cy={y} r="4" className="radar-node" />
              <text x={x + dx} y={y + dy} textAnchor={anchor} className="radar-text">{s.label}</text>
            </g>
          )
        })}
        <circle r="14" className="radar-core" />
        <text y="4" textAnchor="middle" className="radar-core-text">AI</text>
      </svg>

      <div className="hazards" role="group" aria-label="Hazard type">
        {HAZARDS.map((x, idx) => (
          <button
            key={x.id}
            type="button"
            className={`hazard ${idx === active ? 'is-on' : ''}`}
            aria-pressed={idx === active}
            onClick={() => {
              setActive(idx)
              play('select')
            }}
          >
            <x.Icon size={16} aria-hidden="true" />
            {x.label}
          </button>
        ))}
      </div>
      <p className="stage-note mono">Concept visualisation — illustrative only, no live data.</p>
    </div>
  )
}
