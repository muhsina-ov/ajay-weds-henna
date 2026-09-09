import { motion, useReducedMotion } from 'framer-motion'

const TOP_OUTER_PATH =
  'M 45,3 H 585 V 11 H 595 V 19 C 597,34 618,51 626,63 C 618,75 597,92 595,107 V 115 H 585 V 123 H 45 V 115 H 35 V 107 C 33,92 12,75 4,63 C 12,51 33,34 35,19 V 11 H 45 V 3 Z'

const TOP_INNER_PATH =
  'M 49,6 H 581 V 14 H 591 V 22 C 593,36 612,52 620,63 C 612,74 593,90 591,104 V 112 H 581 V 120 H 49 V 112 H 39 V 104 C 37,90 18,74 10,63 C 18,52 37,36 39,22 V 14 H 49 V 6 Z'

export default function HeroDateBadge({ className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={`hero-royal-badges ${className}`}
      role="region"
      aria-label="Wedding Date: Sunday, 04 October 2026 at 3:00 PM. Reception: 6:30 PM Onwards"
    >
      {/* Top Ceremony Plaque */}
      <motion.div
        className="hero-royal-badge hero-royal-badge-top"
        whileHover={reduceMotion ? undefined : { scale: 1.012, y: -2 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <svg
          viewBox="0 0 630 126"
          className="royal-badge-svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="badgeGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8983E" />
              <stop offset="45%" stopColor="#E2BD75" />
              <stop offset="75%" stopColor="#C8983E" />
              <stop offset="100%" stopColor="#9B6C24" />
            </linearGradient>

            <linearGradient id="badgeIvory" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#FBF8F1" stopOpacity="0.92" />
            </linearGradient>

            <filter id="badgeShadow" x="-8%" y="-15%" width="116%" height="135%">
              <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#0b294f" floodOpacity="0.09" />
            </filter>
          </defs>

          {/* Cartouche Frames */}
          <g filter="url(#badgeShadow)">
            <path
              d={TOP_OUTER_PATH}
              fill="url(#badgeIvory)"
              stroke="url(#badgeGold)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d={TOP_INNER_PATH}
              fill="none"
              stroke="url(#badgeGold)"
              strokeWidth="1.2"
              strokeOpacity="0.92"
              strokeLinejoin="round"
            />
          </g>

          {/* Left Column: OCTOBER / 2026 */}
          <g transform="translate(133, 63)">
            <text
              y="-13"
              textAnchor="middle"
              fill="#0F2449"
              fontFamily="Cinzel, Georgia, serif"
              fontSize="17.5"
              fontWeight="600"
              letterSpacing="1.8"
            >
              OCTOBER
            </text>
            <line x1="-50" y1="-2.5" x2="50" y2="-2.5" stroke="#C59338" strokeWidth="1.8" />
            <circle cx="0" cy="-2.5" r="3.5" fill="#C59338" />
            <text
              y="23"
              textAnchor="middle"
              fill="#0F2449"
              fontFamily="Cinzel, Georgia, serif"
              fontSize="22"
              fontWeight="600"
              letterSpacing="1.2"
            >
              2026
            </text>
          </g>

          {/* Vertical Divider 1 */}
          <line x1="216" y1="20" x2="216" y2="106" stroke="#0F2449" strokeWidth="2" opacity="0.95" />

          {/* Center Column: 04 / on Sunday */}
          <g transform="translate(315, 63)">
            {/* Left Floral Accent */}
            <image
              href="/assets/decorations/date-leaf.webp"
              x="-66"
              y="-28"
              width="23"
              height="24"
              preserveAspectRatio="xMidYMid meet"
            />
            {/* Center Number 04 (Playfair Display for authentic thick-serif stems) */}
            <text
              y="-4"
              textAnchor="middle"
              fill="#0F2449"
              fontFamily="'Playfair Display', Cinzel, Georgia, serif"
              fontSize="45"
              fontWeight="800"
              letterSpacing="-0.5"
            >
              04
            </text>
            {/* Right Floral Accent (Mirrored) */}
            <g transform="translate(66, -16) scale(-1, 1)">
              <image
                href="/assets/decorations/date-leaf.webp"
                x="-11"
                y="-12"
                width="23"
                height="24"
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
            {/* Script Text: on Sunday */}
            <text
              y="28"
              textAnchor="middle"
              fill="#C59338"
              fontFamily="'Great Vibes', 'Brush Script MT', cursive"
              fontSize="28"
              fontStyle="italic"
            >
              on Sunday
            </text>
          </g>

          {/* Vertical Divider 2 */}
          <line x1="414" y1="20" x2="414" y2="106" stroke="#0F2449" strokeWidth="2" opacity="0.95" />

          {/* Right Column: 3:00 PM */}
          <g transform="translate(495, 63)">
            <text
              y="9"
              textAnchor="middle"
              fill="#0F2449"
              fontFamily="'Playfair Display', Cinzel, Georgia, serif"
              fontSize="24"
              fontWeight="600"
              letterSpacing="0.6"
            >
              3:00 PM
            </text>
          </g>
        </svg>
      </motion.div>

      <a
        href="https://maps.app.goo.gl/o31Wgju5P2gMGYuu8"
        target="_blank"
        rel="noopener noreferrer"
        className="invitation-reception"
        aria-label="Get directions to Adlux International Convention Center, Angamaly"
      >
        <span className="invitation-reception-label">Reception</span>
        <span className="invitation-reception-time">6:30 PM Onwards</span>
        <span className="invitation-reception-rule" aria-hidden="true">◆</span>
        <span className="invitation-reception-venue">Adlux International<br />Convention Center,</span>
        <span className="invitation-reception-city">Angamaly</span>
      </a>
    </div>
  )
}
