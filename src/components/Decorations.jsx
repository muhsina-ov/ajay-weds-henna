const BASE = '/assets/decorations'

export const ASSETS = {
  floralTopLeft: `${BASE}/floral-top-left.webp`,
  floralBottomRight: `${BASE}/floral-bottom-right.webp`,
  ornamentHeader: `${BASE}/ornament-header.webp`,
  ornamentDivider: `${BASE}/ornament-divider.webp`,
  ornamentDate: `${BASE}/ornament-date.webp`,
  heartGold: `${BASE}/heart-gold.webp`,
  cornerFlourish: `${BASE}/corner-flourish.webp`,
  parchmentTexture: `${BASE}/parchment-texture.webp`,
  churchSilhouette: `${BASE}/church-silhouette.webp`,
  churchSilhouettePng: `${BASE}/church-silhouette.png`,
  conventionCentreSilhouette: `${BASE}/convention-centre-silhouette.webp`,
  conventionCentreSilhouettePng: `${BASE}/convention-centre-silhouette.png`,
}

export function ChurchSilhouette({ className = '' }) {
  return (
    <div className={`occasion-church-silhouette ${className}`} aria-hidden="true">
      <picture>
        <source srcSet={ASSETS.churchSilhouette} type="image/webp" />
        <img
          src={ASSETS.churchSilhouettePng}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  )
}

export function ConventionCentreSilhouette({ className = '' }) {
  return (
    <div className={`occasion-convention-silhouette ${className}`} aria-hidden="true">
      <picture>
        <source srcSet={ASSETS.conventionCentreSilhouette} type="image/webp" />
        <img
          src={ASSETS.conventionCentreSilhouettePng}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  )
}

export function FloralTopLeft({ className = '' }) {
  return (
    <img
      src={ASSETS.floralTopLeft}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      loading="eager"
    />
  )
}

export function FloralBottomRight({ className = '' }) {
  return (
    <img
      src={ASSETS.floralBottomRight}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      loading="lazy"
    />
  )
}

export function OrnamentHeader({ className = '' }) {
  return (
    <img
      src={ASSETS.ornamentHeader}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      loading="eager"
    />
  )
}

export function OrnamentDivider({ className = '' }) {
  return (
    <img
      src={ASSETS.ornamentDivider}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      loading="eager"
    />
  )
}

export function OrnamentDate({ className = '' }) {
  return (
    <img
      src={ASSETS.ornamentDate}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      loading="eager"
    />
  )
}

export function HeartGold({ className = '' }) {
  return (
    <img
      src={ASSETS.heartGold}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      loading="eager"
    />
  )
}

export function CornerFlourish({ className = '', flipX = false, flipY = false }) {
  return (
    <img
      src={ASSETS.cornerFlourish}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none ${className} ${flipX ? 'scale-x-[-1]' : ''} ${flipY ? 'scale-y-[-1]' : ''}`}
      loading="eager"
    />
  )
}

export function ParchmentBg({ className = '' }) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: `url(${ASSETS.parchmentTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      aria-hidden="true"
    />
  )
}

export function GoldFrame({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-3 border border-gold-light/60 rounded-sm pointer-events-none" />
      <div className="absolute inset-5 border border-gold-light/40 rounded-sm pointer-events-none" />
      <CornerFlourish className="absolute top-3 left-3 w-10 h-10 opacity-80" />
      <CornerFlourish className="absolute top-3 right-3 w-10 h-10 opacity-80" flipX />
      <CornerFlourish className="absolute bottom-3 left-3 w-10 h-10 opacity-80" flipY />
      <CornerFlourish className="absolute bottom-3 right-3 w-10 h-10 opacity-80" flipX flipY />
      {children}
    </div>
  )
}

export function WaxSeal({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="42" fill="#8B1A1A" />
      <circle cx="50" cy="50" r="38" fill="#A02020" stroke="#6B1010" strokeWidth="1" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#C5A059" strokeWidth="1.5" opacity="0.6" />
      <text x="50" y="46" textAnchor="middle" fill="#C5A059" fontSize="10" fontFamily="Cinzel, serif" fontWeight="600">
        A
      </text>
      <text x="50" y="58" textAnchor="middle" fill="#C5A059" fontSize="8" fontFamily="Cinzel, serif">
        &amp; H
      </text>
    </svg>
  )
}
