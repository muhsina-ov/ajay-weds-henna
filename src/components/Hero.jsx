import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { COUPLE } from '../data'
import AnimatedAsset from './AnimatedAsset'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 45])
  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 } }

  return (
    <section ref={ref} className="hero" aria-labelledby="wedding-title">
      <AnimatedAsset className="hero-floral hero-floral-one" src="/assets/florals/grand-corner.png" from="left" delay={0.05} drift={8} rotate={0.8} duration={8} />
      <AnimatedAsset className="hero-floral hero-floral-two" src="/assets/florals/grand-corner.png" from="right" delay={0.18} drift={10} rotate={1} duration={9} />
      <AnimatedAsset className="hero-spray hero-spray-one" src="/assets/florals/side-spray.png" from="top" delay={0.28} drift={12} rotate={1.5} duration={7.5} />
      <AnimatedAsset className="hero-spray hero-spray-two" src="/assets/florals/side-spray.png" from="bottom" delay={0.36} drift={10} rotate={1.2} duration={8.5} />
      <AnimatedAsset className="hero-silk" src="/assets/florals/silk-ribbon.png" from="bottom" delay={0.42} drift={14} rotate={0.7} duration={10} />

      <motion.div className="hero-copy" style={reduceMotion ? undefined : { y: copyY }}>
        <div className="hero-frame" aria-hidden="true" />
        <motion.div {...reveal} transition={{ duration: 0.8 }} className="crest-wrap">
          <motion.img
            src="/assets/florals/crest-monogram.png"
            alt="Ajay and Henna Monogram"
            className="crest-emblem-img"
            animate={reduceMotion ? undefined : { scale: [1, 1.025, 1] }}
            transition={reduceMotion ? undefined : { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.p {...reveal} transition={{ duration: 0.8, delay: 0.08 }} className="hero-kicker">With Love &amp; Joy</motion.p>
        <motion.h1 {...reveal} transition={{ duration: 0.85, delay: 0.15 }} id="wedding-title">
          <span>{COUPLE.groom}</span>
          <span className="hero-names-divider">
            <i className="sprig sprig-left" aria-hidden="true" />
            <em>&amp;</em>
            <i className="sprig sprig-right" aria-hidden="true" />
          </span>
          <span>{COUPLE.bride}</span>
        </motion.h1>
        <motion.p {...reveal} transition={{ duration: 0.8, delay: 0.25 }} className="hero-invitation">Together with our families,<br />we invite you to celebrate with us</motion.p>
        <motion.div {...reveal} transition={{ duration: 0.8, delay: 0.34 }} className="hero-date">
          <strong>04</strong><span>October</span><strong>2026</strong>
        </motion.div>
        <motion.div {...reveal} transition={{ duration: 0.8, delay: 0.42 }} className="hero-scroll-hint" aria-hidden="true">
          <span>Scroll to explore</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.figure
        className="hero-portrait"
        initial={reduceMotion ? false : { opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={reduceMotion ? undefined : { scale: portraitScale, y: portraitY }}
      >
        <img src="/assets/hero-couple.jpg" alt={`${COUPLE.groom} and ${COUPLE.bride} together`} fetchPriority="high" />
      </motion.figure>
    </section>
  )
}
