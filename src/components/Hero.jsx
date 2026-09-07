import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { COUPLE } from '../data'
import AnimatedAsset from './AnimatedAsset'
import HeroDateBadge from './HeroDateBadge'

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
      {/* Lush Royal Florals Framing the Card */}
      <AnimatedAsset className="hero-floral hero-floral-tl" src="/assets/florals/grand-corner.webp" from="left" delay={0.05} drift={8} rotate={0.8} duration={8} />
      <AnimatedAsset className="hero-floral hero-floral-tr" src="/assets/florals/grand-corner.webp" from="right" delay={0.12} drift={10} rotate={-0.8} duration={8.5} />
      <AnimatedAsset className="hero-spray hero-spray-ml" src="/assets/florals/side-spray.webp" from="left" delay={0.2} drift={12} rotate={1.2} duration={7.5} />
      <AnimatedAsset className="hero-spray hero-spray-mr" src="/assets/florals/side-spray.webp" from="right" delay={0.25} drift={10} rotate={-1.2} duration={8} />
      <AnimatedAsset className="hero-floral hero-floral-bl" src="/assets/florals/grand-corner.webp" from="left" delay={0.3} drift={9} rotate={-1} duration={9} />
      <AnimatedAsset className="hero-floral hero-floral-br" src="/assets/florals/grand-corner.webp" from="right" delay={0.35} drift={11} rotate={1} duration={9.5} />
      <AnimatedAsset className="hero-silk" src="/assets/florals/silk-ribbon.webp" from="bottom" delay={0.42} drift={14} rotate={0.7} duration={10} />

      <motion.div className="hero-copy" style={reduceMotion ? undefined : { y: copyY }}>
        <div className="hero-frame" aria-hidden="true" />
        {/* Sacred Scripture Quote */}
        <motion.div {...reveal} transition={{ duration: 0.8 }} className="hero-top-quote">
          <p className="hero-top-quote-text">“I have found the one whom my soul loves.”</p>
          <p className="hero-top-quote-source">Song of Solomon 3:4</p>
          <div className="hero-top-quote-divider" aria-hidden="true">
            <span className="quote-line" />
            <span className="quote-flourish">❦</span>
            <span className="quote-line quote-line-right" />
          </div>
        </motion.div>

        <motion.div {...reveal} transition={{ duration: 0.8, delay: 0.06 }} className="crest-wrap">
          <motion.img
            src="/assets/florals/crest-monogram.webp"
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

        {/* 2 Royal Intertwined Wedding Rings */}
        <motion.div
          {...reveal}
          transition={{ duration: 0.85, delay: 0.22 }}
          className="hero-rings-wrap"
        >
          <div className="rings-glow-effect" aria-hidden="true" />
          <motion.img
            src="/assets/decorations/wedding-rings.webp"
            alt="Two Intertwined Gold Wedding Rings"
            className="hero-rings-img"
            animate={reduceMotion ? undefined : {
              y: [0, -5, 0],
              rotate: [0, 1.2, 0, -1.2, 0],
              filter: [
                'drop-shadow(0 8px 18px rgba(212, 175, 55, 0.42)) drop-shadow(0 2px 6px rgba(11, 59, 114, 0.12))',
                'drop-shadow(0 12px 28px rgba(212, 175, 55, 0.62)) drop-shadow(0 4px 10px rgba(11, 59, 114, 0.18))',
                'drop-shadow(0 8px 18px rgba(212, 175, 55, 0.42)) drop-shadow(0 2px 6px rgba(11, 59, 114, 0.12))',
              ]
            }}
            transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.p {...reveal} transition={{ duration: 0.8, delay: 0.28 }} className="hero-invitation">
          <span className="hero-invitation-line">Together with our families, we invite you and your family</span>
          <span className="hero-invitation-line">to grace the Sacrament of Matrimony and join us for the Wedding Reception.</span>
        </motion.p>
        <motion.div {...reveal} transition={{ duration: 0.8, delay: 0.34 }} className="hero-badges-wrapper">
          <HeroDateBadge />
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
        <img src="/assets/hero-couple.webp" alt={`${COUPLE.groom} and ${COUPLE.bride} together`} fetchPriority="high" />
      </motion.figure>
    </section>
  )
}
