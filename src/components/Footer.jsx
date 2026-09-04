import { motion, useReducedMotion } from 'framer-motion'
import { COUPLE, FAMILY } from '../data'
import AnimatedAsset from './AnimatedAsset'

const GALLERY = ['/assets/gallery-1.jpg', '/assets/gallery-2.jpg', '/assets/gallery-3.jpg', '/assets/gallery-4.jpg', '/assets/gallery-5.jpg']

export default function Footer() {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <section className="gallery" aria-label="Ajay and Henna photo gallery">
        {GALLERY.map((src, index) => (
          <motion.figure key={src} className={`gallery-item gallery-item-${index + 1}`} initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: index * 0.06 }}>
            <motion.img src={src} alt={`Ajay and Henna, moment ${index + 1}`} loading="lazy" whileHover={reduceMotion ? undefined : { scale: 1.055 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          </motion.figure>
        ))}
      </section>

      <footer className="closing">
        <AnimatedAsset className="closing-floral closing-floral-left" src="/assets/florals/grand-corner.png" from="left" drift={10} duration={9} />
        <AnimatedAsset className="closing-floral closing-floral-right" src="/assets/florals/grand-corner.png" from="right" delay={0.14} drift={8} duration={8} />
        <AnimatedAsset className="closing-wreath" src="/assets/florals/open-wreath.png" from="bloom" delay={0.2} drift={5} rotate={0.5} duration={10} />
        <AnimatedAsset className="closing-silk" src="/assets/florals/silk-ribbon.png" from="bottom" delay={0.25} drift={12} rotate={0.5} duration={11} />
        <motion.div className="closing-frame" initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <div className="crest crest-small" aria-hidden="true"><span>A</span><i /><span>H</span></div>
          <p>With Love &amp; Joy</p>
          <h2>{COUPLE.groomShort} <em>and</em> {COUPLE.brideShort}</h2>
          <strong>04 October 2026</strong>
          <span>{FAMILY.text}</span>
          <div className="family-names">{FAMILY.names.map((name) => <small key={name}>{name}</small>)}</div>
        </motion.div>
      </footer>
    </>
  )
}
