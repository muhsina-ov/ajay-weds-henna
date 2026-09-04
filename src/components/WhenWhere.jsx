import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CEREMONY_DATE, OCCASIONS, generateICS } from '../data'
import AnimatedAsset from './AnimatedAsset'

function getTimeLeft() {
  const difference = Math.max(0, CEREMONY_DATE.getTime() - Date.now())
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export default function WhenWhere() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="occasion-section" id="details" aria-labelledby="occasion-heading">
      <AnimatedAsset className="occasion-floral occasion-floral-left" src="/assets/florals/side-spray.png" from="left" drift={10} duration={8} />
      <AnimatedAsset className="occasion-floral occasion-floral-right" src="/assets/florals/side-spray.png" from="right" delay={0.12} drift={12} duration={9} />
      <AnimatedAsset className="occasion-silk" src="/assets/florals/silk-ribbon.png" from="left" delay={0.2} drift={14} rotate={0.6} duration={10} />
      <motion.div className="section-heading" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        <p>He has made everything beautiful in his time.</p>
        <h2 id="occasion-heading">Ecclesiastes 3:11</h2>
      </motion.div>

      <div className="occasion-grid">
        {OCCASIONS.map((occasion, index) => (
          <motion.article
            className="occasion"
            key={occasion.id}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: index * 0.12 }}
          >
            <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.085 } } }} initial={reduceMotion ? 'visible' : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
              <motion.span variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="occasion-index">0{index + 1}</motion.span>
              <motion.h3 variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>{occasion.label}</motion.h3>
              <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="occasion-date">{occasion.date}</motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="occasion-time">{occasion.time}</motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="occasion-place"><strong>{occasion.venue}</strong><span>{occasion.location}</span></motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="occasion-note">
                {occasion.noteLabel && <span>{occasion.noteLabel}</span>}
                <strong>{occasion.note}</strong>
                {occasion.subtitle && <em>{occasion.subtitle}</em>}
              </motion.div>
              <motion.a variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} href={occasion.mapsUrl} target="_blank" rel="noreferrer">View location</motion.a>
            </motion.div>
          </motion.article>
        ))}
      </div>

      <motion.button className="calendar-button" type="button" onClick={generateICS} whileHover={reduceMotion ? undefined : { scale: 1.025 }} whileTap={{ scale: 0.97 }}>Add both events to calendar</motion.button>

      <div className="countdown" aria-label="Countdown to the wedding ceremony">
        {Object.entries(timeLeft).map(([label, value]) => (
          <motion.div key={label} initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Object.keys(timeLeft).indexOf(label) * 0.08 }}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></motion.div>
        ))}
      </div>
      <AnimatedAsset className="occasion-corner" src="/assets/florals/grand-corner.png" from="right" delay={0.2} drift={9} duration={9} />
    </section>
  )
}
