import { ArrowUp } from 'lucide-react'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p className="mono">© 2026 Rakshitha · Designed &amp; built from scratch with React, TypeScript &amp; Vite</p>
        <p className="mono footer-hint">psst — try ↑ ↑ ↓ ↓ ← → ← → B A (or tap the orb five times)</p>
        <a href="#top" className="footer-top mono">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
      </div>
    </footer>
  )
}
