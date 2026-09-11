import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

function playUnfoldSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    if (ctx.state === 'suspended') ctx.resume()

    const now = ctx.currentTime

    // 1. Wax Seal Snap / Pop (crisp release sound)
    const snapOsc = ctx.createOscillator()
    const snapGain = ctx.createGain()
    snapOsc.type = 'triangle'
    snapOsc.frequency.setValueAtTime(320, now)
    snapOsc.frequency.exponentialRampToValueAtTime(40, now + 0.07)
    snapGain.gain.setValueAtTime(0.12, now)
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)
    snapOsc.connect(snapGain)
    snapGain.connect(ctx.destination)
    snapOsc.start(now)
    snapOsc.stop(now + 0.07)

    // 2. Paper Unfold Rustle (filtered noise)
    const bufferSize = Math.floor(ctx.sampleRate * 0.35)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08))
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(800, now)
    filter.frequency.exponentialRampToValueAtTime(250, now + 0.35)
    filter.Q.value = 1.2

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.08, now + 0.02)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

    noise.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noise.start(now + 0.02)

    // 3. Elegant Wedding Chime (Harmonic Dyad: A4 + E5)
    const playChimeNote = (freq, delay, dur, vol) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + delay)
      gain.gain.setValueAtTime(0.0001, now + delay)
      gain.gain.exponentialRampToValueAtTime(vol, now + delay + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now + delay)
      osc.stop(now + delay + dur)
    }

    playChimeNote(554.37, 0.08, 0.65, 0.04) // C#5
    playChimeNote(830.61, 0.12, 0.75, 0.035) // G#5
  } catch {
    // audio failure is non-blocking
  }
}

export default function EnvelopeReveal({ onOpen }) {
  const [phase, setPhase] = useState(() => {
    if (typeof window === 'undefined') return 'sealed'
    return new URLSearchParams(window.location.search).get('open') === 'true' ? 'done' : 'sealed'
  })
  const [flapZIndexBack, setFlapZIndexBack] = useState(false)
  const timers = useRef([])
  const hasFinished = useRef(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const finishReveal = () => {
    if (hasFinished.current) return
    hasFinished.current = true
    timers.current.forEach(window.clearTimeout)
    setPhase('done')
    onOpen()
  }

  const openInvitation = () => {
    // If already in motion, clicking again immediately reveals hero
    if (phase === 'opening' || phase === 'unfolded') {
      finishReveal()
      return
    }
    if (phase !== 'sealed') return
    playUnfoldSound()

    if (reduceMotion) {
      finishReveal()
      return
    }

    setPhase('opening')

    // Phase 1: Flap flips open - once past 90 deg, drop z-index behind card
    timers.current.push(window.setTimeout(() => setFlapZIndexBack(true), 200))

    // Phase 2: Flap opened, card begins rising out of envelope pocket
    timers.current.push(window.setTimeout(() => setPhase('unfolded'), 340))

    // Phase 3: Immediate transition to hero once rising finishes (340ms + 680ms = ~1020ms)
    timers.current.push(window.setTimeout(() => finishReveal(), 1050))
  }

  const isFlapOpen = phase !== 'sealed'
  const isCardOut = phase === 'unfolded'

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="invitation-gate"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img className="gate-floral gate-floral-left" src="/assets/florals/grand-corner.webp" alt="" />
          <img className="gate-floral gate-floral-right" src="/assets/florals/grand-corner.webp" alt="" />
          <img className="gate-wreath" src="/assets/florals/open-wreath.webp" alt="" />
          <img className="gate-silk" src="/assets/florals/silk-ribbon.webp" alt="" />

          <div className="envelope-scene">
            <motion.button
              type="button"
              className={`envelope-realistic ${phase}`}
              onClick={openInvitation}
              aria-label="Open Ajay and Henna's royal wedding invitation"
              initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: isFlapOpen ? 68 : 0,
                scale: 1,
              }}
              whileHover={phase === 'sealed' && !reduceMotion ? { scale: 1.018, y: -4 } : undefined}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Back Shell + Floral Liner */}
              <div className="envelope-back-wall">
                <div className="envelope-inner-liner" />
                <div className="envelope-pocket-shadow" />
              </div>

              {/* The Letter Card Inside (rises gracefully and prompts hero section on completion) */}
              <motion.div
                className="envelope-card"
                initial={false}
                animate={
                  isCardOut
                    ? { y: '-78%', scale: 1.025, rotateZ: -0.05 }
                    : { y: '0%', scale: 1, rotateZ: 0 }
                }
                transition={{
                  duration: 0.68,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onAnimationComplete={() => {
                  if (isCardOut) {
                    finishReveal()
                  }
                }}
              >
                <div className="card-border-frame" />

                {/* Crest Monogram */}
                <div className="card-crest-wrap">
                  <img
                    src="/assets/florals/crest-monogram.webp"
                    alt="Ajay and Henna Monogram"
                    className="card-crest-img"
                  />
                </div>

                {/* Kicker */}
                <p className="card-kicker">With Love &amp; Joy</p>

                {/* Names */}
                <h2 className="card-names-title">
                  <span>Ajay Babu</span>
                  <em>&amp;</em>
                  <span>Henna Prathap</span>
                </h2>

                {/* 2 Wedding Rings */}
                <div className="card-rings-wrap">
                  <img
                    src="/assets/decorations/wedding-rings.webp"
                    alt="Two Wedding Rings"
                    className="card-rings-img"
                  />
                </div>

                {/* Invitation Text */}
                <p className="card-invitation-text">
                  <span className="card-invitation-line">Together with our families,</span>
                  <span className="card-invitation-line">we invite you to witness our Sacrament of Matrimony</span>
                  <span className="card-invitation-amp">&amp;</span>
                  <span className="card-invitation-line">join us for our Wedding Reception.</span>
                </p>

                {/* Date Plaque */}
                <div className="card-date-plaque">
                  <strong>04</strong>
                  <span>October</span>
                  <strong>2026</strong>
                </div>
              </motion.div>

              {/* Front Pocket Flaps (Left, Right, Bottom with rich paper grain & gold foil bevel) */}
              <svg className="envelope-pocket-svg" viewBox="0 0 540 350" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  {/* Subtle paper texture overlay */}
                  <pattern id="pocketPaperPattern" width="260" height="260" patternUnits="userSpaceOnUse">
                    <image href="/assets/decorations/parchment-texture.webp" width="260" height="260" preserveAspectRatio="none" opacity="0.32" />
                  </pattern>

                  {/* Gold Foil Crease Gradient */}
                  <linearGradient id="goldCrease" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="35%" stopColor="#f7e8b6" />
                    <stop offset="70%" stopColor="#c5a059" />
                    <stop offset="100%" stopColor="#8c6d2c" />
                  </linearGradient>

                  {/* Flap Shadows */}
                  <filter id="bottomFlapShadow" x="-10%" y="-25%" width="120%" height="160%">
                    <feDropShadow dx="0" dy="-5" stdDeviation="7" floodColor="#06294f" floodOpacity="0.18" />
                  </filter>
                  <filter id="sideFlapShadow" x="-20%" y="-10%" width="140%" height="120%">
                    <feDropShadow dx="2" dy="2" stdDeviation="6" floodColor="#06294f" floodOpacity="0.14" />
                  </filter>

                  {/* Rich Paper Gradients */}
                  <linearGradient id="paperGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fdfefe" />
                    <stop offset="85%" stopColor="#ebf2f8" />
                    <stop offset="100%" stopColor="#deebf3" />
                  </linearGradient>
                  <linearGradient id="paperGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fdfefe" />
                    <stop offset="85%" stopColor="#e8f0f7" />
                    <stop offset="100%" stopColor="#dbe8f2" />
                  </linearGradient>
                  <linearGradient id="paperGradBottom" x1="50%" y1="100%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor="#deebf4" />
                    <stop offset="60%" stopColor="#edf4fa" />
                    <stop offset="100%" stopColor="#fbfdff" />
                  </linearGradient>
                </defs>

                {/* Left Side Flap */}
                <g filter="url(#sideFlapShadow)">
                  <path d="M 0,0 L 270,175 L 0,350 Z" fill="url(#paperGradLeft)" />
                  <path d="M 0,0 L 270,175 L 0,350 Z" fill="url(#pocketPaperPattern)" />
                  <path d="M 0,0 L 270,175 L 0,350" fill="none" stroke="rgba(197, 160, 89, 0.35)" strokeWidth="0.8" />
                </g>

                {/* Right Side Flap */}
                <g filter="url(#sideFlapShadow)">
                  <path d="M 540,0 L 270,175 L 540,350 Z" fill="url(#paperGradRight)" />
                  <path d="M 540,0 L 270,175 L 540,350 Z" fill="url(#pocketPaperPattern)" />
                  <path d="M 540,0 L 270,175 L 540,350" fill="none" stroke="rgba(197, 160, 89, 0.35)" strokeWidth="0.8" />
                </g>

                {/* Bottom Flap Overlapping */}
                <g filter="url(#bottomFlapShadow)">
                  <path d="M 0,350 L 270,158 L 540,350 Z" fill="url(#paperGradBottom)" />
                  <path d="M 0,350 L 270,158 L 540,350 Z" fill="url(#pocketPaperPattern)" />
                  {/* Subtle embossed fold ridge */}
                  <path d="M 0,350 L 270,158 L 540,350" fill="none" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2" />
                  <path d="M 0,350 L 270,158 L 540,350" fill="none" stroke="url(#goldCrease)" strokeWidth="1" />
                </g>
              </svg>

              {/* 3D Top Flap that smoothly uncurls and flips open */}
              <div
                className="envelope-top-flap-container"
                style={{ zIndex: flapZIndexBack ? 1 : 5 }}
              >
                <motion.div
                  className="envelope-top-flap-3d"
                  initial={false}
                  animate={{
                    rotateX: isFlapOpen ? -176 : 0,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.25, 1, 0.35, 1],
                  }}
                >
                  {/* Flap Outer Face (When closed) */}
                  <div className="flap-face flap-face-front">
                    <svg viewBox="0 0 540 200" preserveAspectRatio="none" className="flap-svg">
                      <defs>
                        <pattern id="topPaperPattern" width="260" height="260" patternUnits="userSpaceOnUse">
                          <image href="/assets/decorations/parchment-texture.webp" width="260" height="260" preserveAspectRatio="none" opacity="0.3" />
                        </pattern>
                        <linearGradient id="topFlapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="60%" stopColor="#f3f7fb" />
                          <stop offset="100%" stopColor="#dfeaf3" />
                        </linearGradient>
                        <filter id="topFlapDrop" x="-10%" y="-10%" width="120%" height="150%">
                          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#06294f" floodOpacity="0.24" />
                        </filter>
                      </defs>
                      <g filter="url(#topFlapDrop)">
                        <path d="M 0,0 L 270,192 L 540,0 Z" fill="url(#topFlapGrad)" />
                        <path d="M 0,0 L 270,192 L 540,0 Z" fill="url(#topPaperPattern)" />
                        {/* Embossed gold crease on top flap tip */}
                        <path d="M 0,0 L 270,192 L 540,0" fill="none" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2" />
                        <path d="M 0,0 L 270,192 L 540,0" fill="none" stroke="url(#goldCrease)" strokeWidth="1.1" />
                      </g>
                    </svg>
                  </div>

                  {/* Flap Inner Face (Lined with bespoke floral watercolor when open) */}
                  <div className="flap-face flap-face-back">
                    <svg viewBox="0 0 540 200" preserveAspectRatio="none" className="flap-svg-back">
                      <defs>
                        <pattern id="linerPattern" width="240" height="240" patternUnits="userSpaceOnUse">
                          <image href="/assets/decorations/envelope-liner.webp" width="240" height="240" preserveAspectRatio="xMidYMid slice" opacity="0.96" />
                        </pattern>
                      </defs>
                      {/* Back paper substrate */}
                      <path d="M 0,0 L 270,192 L 540,0 Z" fill="#eff5fa" />
                      {/* Floral liner with 12px inset framing */}
                      <path d="M 16,3 L 270,183 L 524,3 Z" fill="url(#linerPattern)" />
                      {/* Gilded hairline border surrounding the liner */}
                      <path d="M 16,3 L 270,183 L 524,3 Z" fill="none" stroke="url(#goldCrease)" strokeWidth="1.2" />
                      <path d="M 0,0 L 270,192 L 540,0 Z" fill="none" stroke="rgba(197, 160, 89, 0.45)" strokeWidth="0.8" />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Photorealistic 3D Wax Seal Stamp (precisely centered on flap tip) */}
              <div className="wax-seal-anchor">
                <motion.div
                  className="wax-seal-wrapper"
                  initial={false}
                  animate={
                    isFlapOpen
                      ? { scale: 0.8, opacity: 0, y: -20, rotate: -8 }
                      : { scale: [1, 1.028, 1], opacity: 1, y: 0, rotate: 0 }
                  }
                  transition={
                    isFlapOpen
                      ? { duration: 0.35, ease: [0.4, 0, 1, 1] }
                      : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
                  }
                >
                  <img
                    src="/assets/decorations/wax-seal-royale.webp"
                    alt="Royal Wax Seal"
                    className="wax-seal-img"
                    draggable={false}
                  />
                  <span className="wax-seal-shine" aria-hidden="true" />
                </motion.div>
              </div>
            </motion.button>
          </div>

          <motion.div
            className="gate-instruction-box"
            role="button"
            tabIndex={0}
            onClick={openInvitation}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openInvitation()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === 'sealed' ? 1 : 0, y: phase === 'sealed' ? 0 : 10 }}
            transition={{ duration: 0.4 }}
          >
            <span className="gate-sparkle">✦</span>
            <p className="gate-instruction">Tap envelope to open</p>
            <span className="gate-sparkle">✦</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


