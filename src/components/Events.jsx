import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EVENTS } from '../data'
import { OrnamentHeader, FloralTopLeft, ParchmentBg } from './Decorations'
import { FloralPulse } from './Parallax'

export default function Events() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0, 1], [25, -25])

  return (
    <section ref={ref} className="relative py-16 px-6 overflow-hidden">
      <ParchmentBg />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md mx-auto"
      >
        <motion.div style={{ y: headerY }} className="text-center mb-8">
          <OrnamentHeader className="w-36 mx-auto mb-3" />
          <p className="font-display text-[10px] tracking-[0.35em] text-gold uppercase mb-2">
            Save The Dates
          </p>
          <h2 className="font-display text-xl tracking-[0.12em] text-navy uppercase font-semibold">
            Celebrations
          </h2>
        </motion.div>

        <div className="space-y-5">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              className={`relative rounded-sm p-5 ${event.highlight ? 'gold-border' : 'border border-gold-light/30'}`}
              style={{
                background: event.highlight
                  ? 'rgba(253, 248, 242, 0.9)'
                  : 'rgba(255,255,255,0.5)',
              }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              {event.highlight && (
                <FloralPulse
                  delay={i * 0.4}
                  className="absolute -top-3 -right-3 w-16 opacity-50 pointer-events-none"
                >
                  <FloralTopLeft className="w-full h-auto" />
                </FloralPulse>
              )}

              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5" role="img" aria-label={event.name}>{event.icon}</span>
                <div className="flex-1">
                  <h3 className="font-display text-sm tracking-[0.12em] text-navy uppercase font-semibold">
                    {event.name}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <p className="font-serif text-sm text-gold font-medium">{event.date}</p>
                    <p className="font-serif text-xs text-navy/70">{event.time}</p>
                    <p className="font-serif text-xs text-navy/60 leading-relaxed mt-1">{event.venue}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
