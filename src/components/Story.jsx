import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { STORY } from '../data'
import AnimatedAsset from './AnimatedAsset'

export default function Story() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [-24, 24])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.1])

  return (
    <section ref={ref} className="story" aria-labelledby="story-heading">
      <AnimatedAsset className="story-floral-corner" src="/assets/florals/grand-corner.png" from="left" drift={8} duration={8.5} />
      <AnimatedAsset className="story-floral-spray" src="/assets/florals/side-spray.png" from="top" delay={0.12} drift={11} duration={9} />
      <AnimatedAsset className="story-silk" src="/assets/florals/silk-ribbon.png" from="right" delay={0.18} drift={12} rotate={0.6} duration={10} />
      <motion.figure className="story-photo" initial={reduceMotion ? false : { opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8 }}>
        <motion.img style={reduceMotion ? undefined : { y: imageY, scale: imageScale }} src="/assets/couple-picnic.jpg" alt="Ajay and Henna sharing a quiet moment together" loading="lazy" />
      </motion.figure>
      <motion.div className="story-copy" initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.75, delay: 0.1 }}>
        <span className="story-monogram"><img src="/assets/florals/open-wreath.png" alt="" />A <i /> H</span>
        <h2 id="story-heading">{STORY.title}</h2>
        {STORY.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </motion.div>
    </section>
  )
}
