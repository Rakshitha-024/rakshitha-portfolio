import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'

export type SoundKind = 'click' | 'select' | 'toggle' | 'secret'

interface SoundApi {
  enabled: boolean
  toggle: () => void
  play: (kind: SoundKind) => void
}

const SoundContext = createContext<SoundApi>({ enabled: false, toggle: () => {}, play: () => {} })
export const useSound = () => useContext(SoundContext)

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext }

function tone(ctx: AudioContext, freq: number, start: number, dur: number, vol: number, type: OscillatorType = 'sine') {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start)
  gain.gain.setValueAtTime(0.0001, ctx.currentTime + start)
  gain.gain.exponentialRampToValueAtTime(vol, ctx.currentTime + start + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur)
  osc.connect(gain).connect(ctx.destination)
  osc.start(ctx.currentTime + start)
  osc.stop(ctx.currentTime + start + dur + 0.02)
}

/** Sound is OFF by default; the AudioContext is only created after the visitor turns it on. */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const enabledRef = useRef(false)
  const ctxRef = useRef<AudioContext | null>(null)

  const play = useCallback((kind: SoundKind) => {
    const ctx = ctxRef.current
    if (!enabledRef.current || !ctx) return
    if (kind === 'click') tone(ctx, 520, 0, 0.09, 0.04, 'triangle')
    else if (kind === 'select') tone(ctx, 740, 0, 0.07, 0.03, 'sine')
    else if (kind === 'toggle') {
      tone(ctx, 440, 0, 0.1, 0.04, 'triangle')
      tone(ctx, 660, 0.07, 0.12, 0.04, 'triangle')
    } else {
      ;[523, 659, 784, 1047].forEach((f, i) => tone(ctx, f, i * 0.09, 0.18, 0.035, 'triangle'))
    }
  }, [])

  const toggle = useCallback(() => {
    const next = !enabledRef.current
    enabledRef.current = next
    setEnabled(next)
    if (next) {
      const AC = window.AudioContext || (window as WebkitWindow).webkitAudioContext
      if (!AC) return
      if (!ctxRef.current) ctxRef.current = new AC()
      void ctxRef.current.resume().then(() => play('toggle'))
    }
  }, [play])

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play])
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}
