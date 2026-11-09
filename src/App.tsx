import { useCallback, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { SoundProvider, useSound } from './lib/sound'
import { useKonami } from './hooks/useKonami'
import { useScrollTheme } from './hooks/useScrollTheme'
import { sectionIds } from './theme/palettes'
import { Background } from './components/Background'
import { CustomCursor } from './components/CustomCursor'
import { ScrollProgress } from './components/ScrollProgress'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Journey } from './components/Journey'
import { Explorations } from './components/Explorations'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { SecretMessage } from './components/SecretMessage'

function Site() {
  const [secret, setSecret] = useState(false)
  const [ultra, setUltra] = useState(false)
  const { play } = useSound()

  const unlock = useCallback(() => {
    const root = document.documentElement
    const on = root.dataset.mode !== 'ultra'
    if (on) root.dataset.mode = 'ultra'
    else delete root.dataset.mode
    setUltra(on)
    setSecret(true)
    play('secret')
  }, [play])
  useKonami(unlock)
  // Scroll-linked palette engine; the easter egg flips every palette's hue (reversed world).
  useScrollTheme(sectionIds, ultra ? 160 : 0)

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollProgress />
      <Background />
      <CustomCursor />
      <Navbar />
      <main id="main">
        <Hero onSecret={unlock} />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Explorations />
        <Contact />
      </main>
      <Footer />
      <SecretMessage open={secret} onClose={() => setSecret(false)} />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SoundProvider>
        <Site />
      </SoundProvider>
    </MotionConfig>
  )
}
