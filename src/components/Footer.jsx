import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CEREMONY_DATE, CONTACTS, COUPLE, FAMILY, OCCASIONS, generateICS } from '../data'
import AnimatedAsset from './AnimatedAsset'

const GALLERY = [
  '/assets/gallery-1.webp',
  '/assets/gallery-2.webp',
  '/assets/gallery-3.webp',
  '/assets/gallery-4.webp',
  '/assets/gallery-5.webp',
  '/assets/gallery-6.webp',
]

function getTimeLeft() {
  const difference = Math.max(0, CEREMONY_DATE.getTime() - Date.now())
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export default function Footer() {
  const reduceMotion = useReducedMotion()
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <section id="gallery" className="gallery" aria-label="Ajay and Henna photo gallery">
        {GALLERY.map((src, index) => (
          <motion.figure
            key={src}
            className={`gallery-item gallery-item-${index + 1}`}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.06 }}
          >
            <motion.img
              src={src}
              alt={`Ajay and Henna, moment ${index + 1}`}
              loading="lazy"
              whileHover={reduceMotion ? undefined : { scale: 1.055 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.figure>
        ))}
      </section>

      <footer className="closing">
        <AnimatedAsset className="closing-floral closing-floral-left" src="/assets/florals/grand-corner.webp" from="left" drift={10} duration={9} />
        <AnimatedAsset className="closing-floral closing-floral-right" src="/assets/florals/grand-corner.webp" from="right" delay={0.14} drift={8} duration={8} />
        <AnimatedAsset className="closing-wreath" src="/assets/florals/open-wreath.webp" from="bloom" delay={0.2} drift={5} rotate={0.5} duration={10} />
        <AnimatedAsset className="closing-silk" src="/assets/florals/silk-ribbon.webp" from="bottom" delay={0.25} drift={12} rotate={0.5} duration={11} />

        <motion.div
          className="closing-frame"
          initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="crest crest-small" aria-hidden="true">
            <span>A</span><i /><span>H</span>
          </div>
          <p>With Love &amp; Joy</p>
          <h2>{COUPLE.groomShort} <em>&amp;</em> {COUPLE.brideShort}</h2>
          <strong>04 October 2026</strong>

          {/* Royal Highlighted Countdown & Calendar Card */}
          <div className="closing-countdown-card" aria-label="Countdown to the wedding ceremony">
            <span className="closing-countdown-kicker">Counting Down To Our Big Day</span>
            <div className="closing-countdown-divider" aria-hidden="true">
              <span />❦<span />
            </div>

            <div className="closing-countdown-grid">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="closing-countdown-col">
                  <span className="closing-countdown-val">{String(value).padStart(2, '0')}</span>
                  <span className="closing-countdown-lbl">{label}</span>
                </div>
              ))}
            </div>

            <motion.button
              type="button"
              className="closing-countdown-btn"
              onClick={generateICS}
              whileTap={{ scale: 0.97 }}
              whileHover={reduceMotion ? undefined : { scale: 1.03, y: -2 }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Add Both Events to Calendar</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </div>

          <span>{FAMILY.text}</span>
          <div className="family-names">
            {FAMILY.names.map((name) => <small key={name}>{name}</small>)}
          </div>

          <div className="closing-contact-block" aria-label="Contact Information">
            <span className="closing-contact-label">Contact</span>
            <div className="closing-contact-list">
              {CONTACTS.map((contact) => (
                <motion.a
                  key={contact.name}
                  href={`tel:${contact.tel}`}
                  className="closing-contact-item"
                  title={`Call ${contact.name}: ${contact.phone}`}
                  whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span className="contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="contact-name">{contact.name}:</span>
                  <span className="contact-phone">{contact.phone}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="closing-actions">

            <div className="closing-directions-block">
              <div className="closing-directions-heading">
                <span className="closing-divider-line" />
                <span className="closing-directions-title">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Get Directions
                </span>
                <span className="closing-divider-line" />
              </div>

              <div className="closing-directions-grid">
                {OCCASIONS.map((occasion) => (
                  <motion.a
                    key={occasion.id}
                    href={occasion.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="closing-direction-card"
                    whileTap={{ scale: 0.97 }}
                    whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  >
                    <div className="closing-direction-icon" aria-hidden="true">
                      {occasion.id === 'matrimony' ? (
                        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M12 2v6M9 5h6M4 22h16M5 22V11l7-5 7 5v11M10 22v-5a2 2 0 014 0v5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M3 21h18M4 18h16M5 18V9l7-4 7 4v9M9 18v-4a3 3 0 016 0v4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <div className="closing-direction-info">
                      <strong className="closing-direction-type">
                        {occasion.id === 'matrimony' ? 'Church Ceremony' : 'Wedding Reception'}
                      </strong>
                      <span className="closing-direction-place">{occasion.venue}</span>
                      <span className="closing-direction-city">{occasion.location}</span>
                    </div>
                    <div className="closing-direction-arrow-badge" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </footer>
    </>
  )
}
