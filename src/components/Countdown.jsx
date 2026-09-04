import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { WEDDING_DATE } from '../data'
import { OrnamentHeader } from './Decorations'

function FlipUnit({ value, label }) {
  const padded = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-[52px] h-[60px] rounded-md flex items-center justify-center font-display text-2xl text-cream shadow-md"
        style={{ background: 'linear-gradient(180deg, #1A365D 0%, #0F2440 100%)' }}
      >
        {padded}
      </div>
      <span className="font-display text-[8px] tracking-[0.25em] text-gold uppercase">{label}</span>
    </div>
  )
}

function getTimeLeft(target) {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft(WEDDING_DATE))

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(WEDDING_DATE)), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      className="relative py-16 px-6"
      style={{ backgroundImage: 'url(/assets/decorations/parchment-texture.png)', backgroundSize: 'cover' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto text-center"
      >
        <OrnamentHeader className="w-36 mx-auto mb-3" />
        <p className="font-display text-[10px] tracking-[0.35em] text-gold uppercase mb-2">
          Counting Down To
        </p>
        <h2 className="font-display text-xl tracking-[0.1em] text-navy uppercase mb-8 font-semibold">
          Our Special Day
        </h2>

        <div className="flex justify-center gap-3">
          <FlipUnit value={time.days} label="Days" />
          <span className="font-display text-2xl text-gold self-start mt-4">:</span>
          <FlipUnit value={time.hours} label="Hours" />
          <span className="font-display text-2xl text-gold self-start mt-4">:</span>
          <FlipUnit value={time.minutes} label="Mins" />
          <span className="font-display text-2xl text-gold self-start mt-4">:</span>
          <FlipUnit value={time.seconds} label="Secs" />
        </div>

        <p className="mt-8 font-serif text-sm text-navy/60 italic">
          04 October 2026 · 6:30 PM onwards
        </p>
      </motion.div>
    </section>
  )
}
