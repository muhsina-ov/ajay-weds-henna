import { motion, useReducedMotion } from 'framer-motion'
import { OCCASIONS } from '../data'

const TOP_OUTER_PATH =
  'M 45,3 H 585 V 11 H 595 V 19 C 597,34 618,51 626,63 C 618,75 597,92 595,107 V 115 H 585 V 123 H 45 V 115 H 35 V 107 C 33,92 12,75 4,63 C 12,51 33,34 35,19 V 11 H 45 V 3 Z'

const TOP_INNER_PATH =
  'M 49,6 H 581 V 14 H 591 V 22 C 593,36 612,52 620,63 C 612,74 593,90 591,104 V 112 H 581 V 120 H 49 V 112 H 39 V 104 C 37,90 18,74 10,63 C 18,52 37,36 39,22 V 14 H 49 V 6 Z'

const RECEPTION_OUTER_PATH =
  'M 434,25 H 696 C 709,25 720,33 724,45.5 H 740 C 752,45.5 762,58 762,73.5 H 774 C 785,84 795,98 795,115 V 125 C 800,150 822,182 842.5,200 C 822,218 800,250 795,275 V 285 C 795,302 785,316 774,322.5 H 762 C 762,342 752,354.5 740,354.5 H 724 C 720,367 709,375 696,375 H 434 H 172 C 159,375 148,367 144,354.5 H 128 C 116,354.5 106,342 106,322.5 H 94 C 83,316 73,302 73,285 V 275 C 68,250 46,218 25.5,200 C 46,182 68,150 73,125 V 115 C 73,98 83,84 94,77.5 H 106 C 106,58 116,45.5 128,45.5 H 144 C 148,33 159,25 172,25 Z'

const RECEPTION_INNER_PATH =
  'M 434,34.5 H 689 C 701,34.5 712,42 716,54.5 H 732 C 743,54.5 753,66 753,79.5 H 765 C 775,90 785,102 785,118 V 126 C 790,150 811,182 831.5,199.5 C 811,217 790,249 785,273 V 281 C 785,297 775,309 765,319.5 H 753 C 753,333 743,344.5 732,344.5 H 716 C 712,357 701,364.5 689,364.5 H 434 H 179 C 167,364.5 156,357 152,344.5 H 136 C 125,344.5 115,333 115,319.5 H 103 C 93,309 83,297 83,281 V 273 C 78,249 57,217 36.5,199.5 C 57,182 78,150 83,126 V 118 C 83,102 93,90 103,79.5 H 115 C 115,66 125,54.5 136,54.5 H 152 C 156,42 167,34.5 179,34.5 Z'

function ChurchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2v4M10 4h4" />
      <path d="M18 22H6a1.5 1.5 0 0 1-1.5-1.5V11l7.5-5.5 7.5 5.5v9.5A1.5 1.5 0 0 1 18 22z" />
      <path d="M10 22v-5a2 2 0 0 1 4 0v5" />
    </svg>
  )
}

function ConventionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21h18M3 8h18" />
      <path d="M12 3L2 8h20L12 3z" />
      <line x1="6" y1="8" x2="6" y2="21" />
      <line x1="10" y1="8" x2="10" y2="21" />
      <line x1="14" y1="8" x2="14" y2="21" />
      <line x1="18" y1="8" x2="18" y2="21" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  )
}

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

      {/* Reception Royal Plaque Card */}
      <motion.div
        className="hero-royal-badge hero-royal-badge-reception"
        whileHover={reduceMotion ? undefined : { scale: 1.012, y: -2 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <svg
          viewBox="0 0 868 400"
          className="royal-badge-svg royal-badge-reception-svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="receptionGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8983E" />
              <stop offset="35%" stopColor="#E5C17B" />
              <stop offset="70%" stopColor="#C8983E" />
              <stop offset="100%" stopColor="#9B6C24" />
            </linearGradient>

            <linearGradient id="receptionIvory" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
              <stop offset="50%" stopColor="#FAF5E8" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#F5EFE0" stopOpacity="0.94" />
            </linearGradient>

            <filter id="receptionShadow" x="-8%" y="-15%" width="116%" height="135%">
              <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#0b294f" floodOpacity="0.10" />
            </filter>
          </defs>

          {/* Cartouche Frames */}
          <g filter="url(#receptionShadow)">
            <path
              d={RECEPTION_OUTER_PATH}
              fill="url(#receptionIvory)"
              stroke="url(#receptionGold)"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            <path
              d={RECEPTION_INNER_PATH}
              fill="none"
              stroke="url(#receptionGold)"
              strokeWidth="1.4"
              strokeLinejoin="round"
              strokeOpacity="0.92"
            />
          </g>

          {/* RECEPTION */}
          <text
            x="434"
            y="87"
            textAnchor="middle"
            fill="#0F2449"
            fontFamily="'Cinzel', Georgia, serif"
            fontSize="22"
            fontWeight="600"
            letterSpacing="5"
          >
            RECEPTION
          </text>

          {/* 6:30 PM Onwards */}
          <text
            x="434"
            y="143"
            textAnchor="middle"
            fill="#0F2449"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="37"
            fontWeight="600"
            letterSpacing="0.6"
          >
            6:30 PM Onwards
          </text>

          {/* Divider with Center Diamond */}
          <rect x="170" y="173.25" width="244" height="1.5" fill="url(#receptionGold)" />
          <polygon points="434,163 445,174 434,185 423,174" fill="url(#receptionGold)" />
          <rect x="454" y="173.25" width="244" height="1.5" fill="url(#receptionGold)" />

          {/* ADLUX INTERNATIONAL CONVENTION CENTER, */}
          <text
            x="434"
            y="228"
            textAnchor="middle"
            fill="#0F2449"
            fontFamily="'Cinzel', Georgia, serif"
            fontSize="24"
            fontWeight="600"
            letterSpacing="2.6"
          >
            ADLUX INTERNATIONAL
          </text>
          <text
            x="434"
            y="273"
            textAnchor="middle"
            fill="#0F2449"
            fontFamily="'Cinzel', Georgia, serif"
            fontSize="24"
            fontWeight="600"
            letterSpacing="2.6"
          >
            CONVENTION CENTER,
          </text>

          {/* ANGAMALY */}
          <text
            x="434"
            y="323"
            textAnchor="middle"
            fill="#0F2449"
            fontFamily="'Cinzel', Georgia, serif"
            fontSize="17.5"
            fontWeight="600"
            letterSpacing="7"
          >
            ANGAMALY
          </text>
        </svg>

        {/* Accessible screen reader text */}
        <span className="sr-only">
          Reception: 6:30 PM Onwards at Adlux International Convention Center, Angamaly
        </span>
      </motion.div>

      {/* Directions Actions - Two Options: Church & Convention */}
      <div className="hero-directions-group">
        <motion.a
          href={OCCASIONS[0].mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-direction-pill hero-direction-church"
          aria-label="Get direction to Church (Little Flower Syro-Malabar Church, Kurumassery)"
          whileHover={reduceMotion ? undefined : { scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="hero-direction-icon">
            <ChurchIcon />
          </span>
          <span className="hero-direction-text">Get Direction Church</span>
          <span className="hero-direction-arrow">
            <ArrowIcon />
          </span>
        </motion.a>

        <motion.a
          href={OCCASIONS[1].mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-direction-pill hero-direction-convention"
          aria-label="Get direction to Convention Center (Adlux International Convention Centre, Angamaly)"
          whileHover={reduceMotion ? undefined : { scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="hero-direction-icon">
            <ConventionIcon />
          </span>
          <span className="hero-direction-text">Get Direction Convention</span>
          <span className="hero-direction-arrow">
            <ArrowIcon />
          </span>
        </motion.a>
      </div>
    </div>
  )
}
