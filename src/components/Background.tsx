/**
 * Fixed ambient layer: three soft light pools that take their colour from the live section palette,
 * a fine grid, a vignette and a whisper of film grain for an editorial feel.
 * Gradients (not blur filters) keep it cheap to repaint while colours transition on scroll.
 */
export function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-light bg-light--a" />
      <div className="bg-light bg-light--b" />
      <div className="bg-light bg-light--c" />
      <div className="bg-grid" />
      <div className="bg-vignette" />
      <div className="bg-grain" />
    </div>
  )
}
