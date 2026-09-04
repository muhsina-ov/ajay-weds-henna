import { motion } from 'framer-motion'
import { VENUE, generateICS } from '../data'
import { OrnamentHeader } from './Decorations'

export default function Venue() {
  return (
    <section className="relative py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        <OrnamentHeader className="w-36 mx-auto mb-3" />
        <p className="font-display text-[10px] tracking-[0.35em] text-gold uppercase text-center mb-2">
          Join Us At
        </p>
        <h2 className="font-display text-xl tracking-[0.12em] text-navy uppercase text-center mb-8 font-semibold">
          The Venue
        </h2>

        <div className="gold-border rounded-sm overflow-hidden shadow-lg mb-6">
          <div className="relative w-full h-48 bg-sky/30">
            <iframe
              title="Venue location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8476!2d76.386!3d10.196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0812d5e8c8c8c9%3A0xadlux!2sAdlux%20International%20Convention%20Center!5e0!3m2!1sen!2sin!4v1699999999999"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="p-5" style={{ backgroundImage: 'url(/assets/decorations/parchment-texture.webp)', backgroundSize: 'cover' }}>
            <h3 className="font-display text-xs tracking-[0.15em] text-navy uppercase font-semibold mb-1">
              {VENUE.name}
            </h3>
            <p className="font-serif text-sm text-navy/60">{VENUE.location}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <motion.a
            href={VENUE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target flex items-center justify-center gap-2 w-full py-3.5 rounded-sm font-display text-[11px] tracking-[0.2em] uppercase text-cream transition-transform active:scale-[0.97]"
            style={{ background: 'linear-gradient(135deg, #1A365D, #0F2440)' }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1 C5 1 2.5 3.5 2.5 6.5 C2.5 10.5 8 15 8 15 C8 15 13.5 10.5 13.5 6.5 C13.5 3.5 11 1 8 1Z" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="8" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            Open in Google Maps
          </motion.a>

          <motion.button
            onClick={generateICS}
            className="touch-target flex items-center justify-center gap-2 w-full py-3.5 rounded-sm font-display text-[11px] tracking-[0.2em] uppercase text-navy gold-border transition-transform active:scale-[0.97]"
            style={{ backgroundImage: 'url(/assets/decorations/parchment-texture.webp)', backgroundSize: 'cover' }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M2 6 L14 6 M5 1 L5 4 M11 1 L11 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Add to Calendar
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
