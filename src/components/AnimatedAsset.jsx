import { motion, useReducedMotion } from 'framer-motion'

const entrances = {
  left: { opacity: 0, x: -54, scale: 0.92 },
  right: { opacity: 0, x: 54, scale: 0.92 },
  top: { opacity: 0, y: -44, scale: 0.94 },
  bottom: { opacity: 0, y: 44, scale: 0.94 },
  bloom: { opacity: 0, scale: 0.72 },
}

export default function AnimatedAsset({
  className,
  src,
  from = 'bloom',
  delay = 0,
  drift = 7,
  rotate = 1.2,
  duration = 7,
}) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={className} aria-hidden="true">
      <motion.div
        initial={reduceMotion ? false : entrances[from]}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1.15, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={src}
          alt=""
          animate={reduceMotion ? undefined : { y: [0, -drift, 0], rotate: [-rotate, rotate, -rotate], scale: [1, 1.012, 1] }}
          transition={reduceMotion ? undefined : { duration, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.8 }}
        />
      </motion.div>
    </div>
  )
}
