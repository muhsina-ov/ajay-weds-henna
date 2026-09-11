import { motion, useReducedMotion } from 'framer-motion'
import { COUPLE } from '../data'
import HeroDateBadge from './HeroDateBadge'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  return (
    <section className="hero invitation-hero" aria-labelledby="wedding-title">
      <div className="hero-frame" aria-hidden="true" />
      {['tl', 'tr', 'bl', 'br'].map(corner => (
        <img key={corner} className={`invitation-corner invitation-corner-${corner}`} src="/assets/decorations/floral-top-left.webp" alt="" aria-hidden="true" />
      ))}
      <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
        <div className="hero-top-quote">
          <p className="hero-top-quote-text">“I have found the one whom my soul loves.”</p>
          <p className="hero-top-quote-source">Song of Solomon 3:4</p>
          <div className="invitation-divider" aria-hidden="true"><span />❦<span /></div>
        </div>
        <div className="crest-wrap"><img src="/assets/florals/crest-monogram.webp" alt="Ajay and Henna monogram" className="crest-emblem-img" fetchPriority="high" /></div>
        <p className="hero-kicker">With Love &amp; Joy</p>
        <h1 id="wedding-title">
          <span>{COUPLE.groom}</span>
          <span className="hero-names-divider"><i className="sprig" aria-hidden="true" /><em>&amp;</em><i className="sprig" aria-hidden="true" /></span>
          <span>{COUPLE.bride}</span>
        </h1>
        <div className="hero-rings-wrap"><img src="/assets/decorations/wedding-rings.webp" alt="Two intertwined gold wedding rings" className="hero-rings-img" /></div>
        <p className="hero-invitation">
          <span className="hero-invitation-line">Together with our families,</span>
          <span className="hero-invitation-line">we invite you to witness our Sacrament of Matrimony</span>
          <span className="invitation-script">&amp;</span>
          <span className="hero-invitation-line">join us for our Wedding Reception.</span>
        </p>
        <div className="invitation-divider" aria-hidden="true"><span />❦<span /></div>
        <div className="hero-badges-wrapper"><HeroDateBadge /></div>
        <a href="#details" className="invitation-explore"><span aria-hidden="true">◇</span>Kindly scroll to discover<br />the venue, programme, and more<span aria-hidden="true">↓</span></a>
      </motion.div>
    </section>
  )
}
