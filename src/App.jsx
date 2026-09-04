import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import EnvelopeReveal from './components/EnvelopeReveal'
import Hero from './components/Hero'
import WhenWhere from './components/WhenWhere'
import Story from './components/Story'
import Footer from './components/Footer'

export default function App() {
  const [opened, setOpened] = useState(() => {
    if (typeof window === 'undefined') return false
    return new URLSearchParams(window.location.search).get('open') === 'true'
  })

  return (
    <div className="site-shell">
      <EnvelopeReveal onOpen={() => setOpened(true)} />
      <AnimatePresence>
        {opened && (
          <motion.main className="site-content is-open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <Hero />
            <WhenWhere />
            <Story />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
