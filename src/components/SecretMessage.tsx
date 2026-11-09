import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

/** Easter-egg toast. Non-modal: never traps focus or blocks navigation. Auto-dismisses. */
export function SecretMessage({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(onClose, 10000)
    return () => window.clearTimeout(t)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="secret"
          role="status"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <button type="button" className="secret-close" onClick={onClose} aria-label="Dismiss secret message">
            <X size={16} aria-hidden="true" />
          </button>
          <p className="mono secret-title">&gt; secret_unlocked.exe</p>
          <p className="secret-body">
            You found the playground&apos;s secret. The whole site runs on one rule: stay curious, keep building.
            The colours just shifted — press the code again to switch back.
          </p>
          <p className="mono secret-sign">— R.</p>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
