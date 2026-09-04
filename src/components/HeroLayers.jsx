import { GoldFrame } from './Decorations'
import { HeroParallaxLayer } from './Parallax'

const LAYERS = '/assets/hero-layers'

export const HERO_LAYERS = {
  skyWater: `${LAYERS}/hero-layer-sky-water.png`,
  church: `${LAYERS}/hero-layer-church.png`,
  palmsBirds: `${LAYERS}/hero-layer-palms-birds.png`,
  floralTopLeft: `${LAYERS}/hero-layer-floral-tl.png`,
  floralBottomRight: `${LAYERS}/hero-layer-floral-br.png`,
  floralAccents: `${LAYERS}/hero-layer-floral-accents.png`,
  coupleCutout: `${LAYERS}/couple-hero-cutout.png`,
}

export const LAYER_SPEED = {
  text: 0.08,
}

function LayerImage({ src, className = '' }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none select-none ${className}`}
      loading="eager"
    />
  )
}

export function HeroLayerStack({ scrollYProgress }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0" style={{ backgroundColor: '#F9F7F2' }} />

      {/* Layer 1 — sky/water: slowest, subtle zoom */}
      <HeroParallaxLayer
        scrollYProgress={scrollYProgress}
        speedY={0.12}
        scaleFrom={1}
        scaleTo={1.1}
        className="absolute inset-0"
      >
        <LayerImage src={HERO_LAYERS.skyWater} className="w-full h-full object-cover object-center" />
      </HeroParallaxLayer>

      {/* Layer 2 — church: drifts left on scroll */}
      <HeroParallaxLayer
        scrollYProgress={scrollYProgress}
        speedY={0.22}
        speedX={6}
        className="absolute bottom-[6%] left-[-4%] w-[58%] max-w-[230px]"
      >
        <LayerImage src={HERO_LAYERS.church} className="w-full h-auto opacity-90" />
      </HeroParallaxLayer>

      {/* Layer 3 — palms: drifts right (pushed up to make room for couple) */}
      <HeroParallaxLayer
        scrollYProgress={scrollYProgress}
        speedY={0.2}
        speedX={5}
        className="absolute bottom-[28%] right-[-4%] w-[42%] max-w-[180px] z-[12]"
      >
        <LayerImage src={HERO_LAYERS.palmsBirds} className="w-full h-auto opacity-70" />
      </HeroParallaxLayer>

      {/* Layer 3b — couple cutout: bottom-right, blends into scene */}
      <HeroParallaxLayer
        scrollYProgress={scrollYProgress}
        speedY={0.32}
        speedX={3}
        className="absolute bottom-0 right-[-2%] w-[min(78vw,340px)] z-[18] pointer-events-none"
      >
        <div
          className="relative w-full"
          style={{
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.4) 12%, black 35%, black 100%)',
            maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.4) 12%, black 35%, black 100%)',
          }}
        >
          <img
            src={HERO_LAYERS.coupleCutout}
            alt="Ajay and Henna"
            draggable={false}
            className="w-full h-auto select-none"
            style={{
              opacity: 0.94,
              filter: 'saturate(0.92) brightness(1.04) contrast(1.02)',
            }}
            loading="eager"
          />
          {/* Bottom fade into water/grass */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, #F9F7F2 0%, rgba(249,247,242,0.6) 18%, transparent 50%)',
            }}
          />
        </div>
      </HeroParallaxLayer>

      {/* Layer 4 — top-left florals: fast parallax + pulse */}
      <HeroParallaxLayer
        scrollYProgress={scrollYProgress}
        speedY={0.42}
        speedX={3}
        pulse
        pulseDelay={0}
        className="absolute -top-1 -left-2 w-[min(50vw,205px)] z-20"
      >
        <LayerImage src={HERO_LAYERS.floralTopLeft} className="w-full h-auto" />
      </HeroParallaxLayer>

      {/* Layer 5 — bottom-right florals: frame the couple */}
      <HeroParallaxLayer
        scrollYProgress={scrollYProgress}
        speedY={0.48}
        speedX={4}
        pulse
        pulseDelay={0.9}
        className="absolute -bottom-3 -right-2 w-[min(52vw,215px)] z-[22]"
      >
        <LayerImage src={HERO_LAYERS.floralBottomRight} className="w-full h-auto" />
      </HeroParallaxLayer>

      {/* Layer 6 — accent sprigs: pulse + medium parallax */}
      <HeroParallaxLayer
        scrollYProgress={scrollYProgress}
        speedY={0.35}
        pulse
        pulseDelay={1.6}
        className="absolute inset-0 z-[15] opacity-75"
      >
        <LayerImage src={HERO_LAYERS.floralAccents} className="w-full h-full object-cover" />
      </HeroParallaxLayer>

      <div className="absolute inset-0 z-30 pointer-events-none">
        <GoldFrame className="absolute inset-3 sm:inset-4 h-[calc(100%-1.5rem)] sm:h-[calc(100%-2rem)]" />
      </div>
    </div>
  )
}
