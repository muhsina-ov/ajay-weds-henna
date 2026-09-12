import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { STORY } from '../data'
import AnimatedAsset from './AnimatedAsset'

export default function Story() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)

  return (
    <section ref={ref} className="story" aria-labelledby="story-heading">
      <AnimatedAsset className="story-floral-corner" src="/assets/florals/grand-corner.webp" from="left" drift={8} duration={8.5} />
      <AnimatedAsset className="story-floral-spray" src="/assets/florals/side-spray.webp" from="top" delay={0.12} drift={11} duration={9} />
      <AnimatedAsset className="story-silk" src="/assets/florals/silk-ribbon.webp" from="right" delay={0.18} drift={12} rotate={0.6} duration={10} />
      <motion.div className="story-copy" initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, delay: 0.1 }}>
        <h2 id="story-heading">{STORY.title}</h2>
        {STORY.subtitle && <p className="story-subtitle">{STORY.subtitle}</p>}

        <div className="story-profile story-profile-henna">
          <div className="story-profile-header">
            <span className="story-profile-role">{STORY.bride.role}</span>
            <h3 className="story-profile-name">{STORY.bride.name}</h3>
          </div>
          <p className="story-profile-bio">{STORY.bride.bio}</p>
        </div>

        <div className="story-interlude">
          <span className="story-interlude-flourish">✦</span>
          <p className="story-interlude-text">“{STORY.interlude}”</p>
          <span className="story-interlude-flourish">✦</span>
        </div>

        <div className="story-profile story-profile-ajay">
          <div className="story-profile-header">
            <span className="story-profile-role">{STORY.groom.role}</span>
            <h3 className="story-profile-name">{STORY.groom.name}</h3>
          </div>
          <p className="story-profile-bio">{STORY.groom.bio}</p>
        </div>

        <div className="story-conclusion">
          <p>{STORY.conclusion}</p>
        </div>
      </motion.div>
    </section>
  )
}
