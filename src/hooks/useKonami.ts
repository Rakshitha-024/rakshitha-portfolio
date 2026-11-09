import { useEffect, useRef } from 'react'

const SEQ = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

/** Calls `onUnlock` when the Konami code is typed. Never blocks normal key handling. */
export function useKonami(onUnlock: () => void): void {
  const cb = useRef(onUnlock)
  cb.current = onUnlock
  useEffect(() => {
    let i = 0
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (k === SEQ[i]) {
        i += 1
        if (i === SEQ.length) {
          i = 0
          cb.current()
        }
      } else {
        i = k === SEQ[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
