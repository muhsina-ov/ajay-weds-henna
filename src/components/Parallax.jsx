import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/** Gentle breathing pulse for floral decorations */
export function FloralPulse({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.045, 1],
        opacity: [0.9, 1, 0.9],
      }}
      transition={{
        duration: 3.8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      style={{ transformOrigin: 'center center' }}
    >
      {children}
    </motion.div>
  )
}

/** Scroll parallax wrapper for section-level floral accents */
export function SectionFloral({
  children,
  className = '',
  sectionRef,
  speed = 1,
  xDir = 1,
  pulse = true,
  pulseDelay = 0,
}) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-40 * speed, 40 * speed])
  const x = useTransform(scrollYProgress, [0, 1], [-20 * speed * xDir, 20 * speed * xDir])

  const inner = pulse
    ? <FloralPulse delay={pulseDelay}>{children}</FloralPulse>
    : children

  if (reduce) {
    return <div className={className}>{inner}</div>
  }

  return (
    <motion.div className={className} style={{ y, x, willChange: 'transform' }}>
      {inner}
    </motion.div>
  )
}

/** Hero parallax layer — Y + optional X + scale + floral pulse */
export function HeroParallaxLayer({
  scrollYProgress,
  speedY = 0.3,
  speedX = 0,
  scaleFrom = 1,
  scaleTo = 1,
  pulse = false,
  pulseDelay = 0,
  className,
  children,
}) {
  const reduce = useReducedMotion()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speedY * 70}%`])
  const x = useTransform(scrollYProgress, [0, 1], [`${-speedX}%`, `${speedX}%`])
  const scale = useTransform(scrollYProgress, [0, 1], [scaleFrom, scaleTo])

  const inner = pulse
    ? <FloralPulse delay={pulseDelay}>{children}</FloralPulse>
    : children

  if (reduce) {
    return <div className={className}>{inner}</div>
  }

  return (
    <motion.div
      className={className}
      style={{ y, x, scale, willChange: 'transform' }}
    >
      {inner}
    </motion.div>
  )
}
