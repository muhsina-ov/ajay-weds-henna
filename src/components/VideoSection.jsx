import { motion, useReducedMotion } from 'framer-motion'
import AnimatedAsset from './AnimatedAsset'

export default function VideoSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="film" className="video-section" aria-labelledby="video-title">
      <AnimatedAsset
        className="video-floral video-floral-tl"
        src="/assets/florals/grand-corner.webp"
        from="left"
        delay={0.1}
        drift={6}
        duration={9}
      />
      <AnimatedAsset
        className="video-floral video-floral-br"
        src="/assets/florals/grand-corner.webp"
        from="right"
        delay={0.2}
        drift={6}
        duration={9.5}
      />

      <div className="video-container">
        <motion.div
          className="video-header"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className="video-kicker">Save The Date</span>
          <h2 id="video-title" className="video-heading">
            A Prelude To Forever
          </h2>
          <p className="video-subtitle">The Story of Ajay &amp; Henna</p>
          <div className="invitation-divider" aria-hidden="true">
            <span />❦<span />
          </div>
          <p className="video-description">
            A glimpse into the laughter, love, and beautiful memories that make our story special.
          </p>
        </motion.div>

        <motion.div
          className="video-card"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 26 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="video-card-inner">
            <div className="video-embed-frame">
              <iframe
                src="https://www.youtube-nocookie.com/embed/tH5BRKexSZk?rel=0&modestbranding=1"
                title="Ajay & Henna Wedding Film"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="video-actions"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <motion.a
            href="https://youtu.be/tH5BRKexSZk?si=jnOr_vj2lfyHx4fV"
            target="_blank"
            rel="noopener noreferrer"
            className="video-yt-btn"
            whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Watch Ajay & Henna's video on YouTube"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span>Watch on YouTube</span>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
