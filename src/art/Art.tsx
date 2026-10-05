// The site's illustrations: all inline SVG, so there are no image files to load and they scale
// cleanly. Colors come from CSS variables (see index.css) so they follow the palette.

import type { CSSProperties } from 'react';

// One pine: three overlapping triangles (a wide skirt at the bottom, narrower tiers above) on a short
// trunk, centered on x with its base at y.
function pine(x: number, y: number, height: number) {
  const base = y - height * 0.2; // where the branches end and the trunk begins
  const tiers = [
    { top: y - height, bottom: y - height * 0.66, half: height * 0.2 },
    { top: y - height * 0.8, bottom: y - height * 0.42, half: height * 0.28 },
    { top: y - height * 0.58, bottom: base, half: height * 0.36 },
  ];
  const branches = tiers
    .map((t) => `M${x} ${t.top} L${x + t.half} ${t.bottom} L${x - t.half} ${t.bottom} Z`)
    .join(' ');
  const t = height * 0.035;
  return `${branches} M${x - t} ${base} L${x + t} ${base} L${x + t} ${y} L${x - t} ${y} Z`;
}

const FRONT_PINES: [number, number][] = [
  [30, 150], [95, 120], [160, 165], [235, 130], [300, 175], [380, 125], [455, 160], [540, 140],
  [620, 180], [705, 130], [790, 165], [870, 125], [950, 175], [1030, 135], [1105, 165], [1170, 130],
];

const MID_PINES: [number, number][] = [
  [55, 95], [150, 80], [250, 100], [345, 78], [440, 98], [560, 82], [670, 100], [760, 80], [880, 98], [990, 82], [1090, 100],
];

// The wide ridge-and-forest scene behind the hero title.
export function ForestScene({ style }: { style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label="Layered mountain ridges and pine trees at dusk"
      style={style}
    >
      <defs>
        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ember)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--ember)" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <rect x="0" y="180" width="1200" height="240" fill="url(#glow)" />
      <path
        d="M0 260 L90 190 L170 235 L270 150 L360 225 L450 175 L560 245 L660 160 L760 230 L860 170 L960 240 L1060 185 L1200 250 L1200 420 L0 420 Z"
        fill="var(--ridge-far)"
      />
      <path
        d="M0 300 L120 235 L210 280 L330 215 L430 285 L540 230 L650 295 L770 225 L880 290 L1000 235 L1110 285 L1200 255 L1200 420 L0 420 Z"
        fill="var(--ridge-mid)"
      />
      <g fill="var(--pine-mid)" transform="translate(0 270)">
        <path d={MID_PINES.map(([x, h]) => pine(x, 150, h)).join(' ')} />
      </g>
      <g fill="var(--pine-front)" transform="translate(0 270)">
        <path d={FRONT_PINES.map(([x, h]) => pine(x, 150, h)).join(' ')} />
      </g>
      <rect x="0" y="405" width="1200" height="15" fill="var(--pine-front)" />
    </svg>
  );
}

// A single small pine, for the logo and the section ornaments.
export function PineIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2 L18 10 H15 L20 17 H13.5 V22 H10.5 V17 H4 L9 10 H6 Z" />
    </svg>
  );
}

// A cold brew bottle with a label, on each product card.
export function Bottle({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 120 220" aria-hidden="true" className="bottle">
      <rect x="44" y="6" width="32" height="20" rx="4" fill="var(--bark)" />
      <rect x="48" y="24" width="24" height="14" fill="var(--glass)" />
      <path d="M48 38 H72 C72 52 92 58 92 84 V196 C92 208 86 214 74 214 H46 C34 214 28 208 28 196 V84 C28 58 48 52 48 38 Z" fill="var(--brew)" />
      <path d="M36 90 V196 C36 202 38 206 44 206" stroke="rgba(255,255,255,0.18)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="34" y="104" width="52" height="70" rx="3" fill="var(--paper)" />
      <rect x="38" y="108" width="44" height="62" rx="2" fill="none" stroke={accent} strokeWidth="1.5" />
      <g transform="translate(48 116) scale(1)" fill={accent}>
        <path d="M12 0 L19 9 H15.5 L21 17 H13.5 V22 H10.5 V17 H3 L8.5 9 H5 Z" />
      </g>
      <rect x="44" y="144" width="32" height="2" fill={accent} opacity="0.7" />
      <rect x="48" y="152" width="24" height="2" fill={accent} opacity="0.45" />
      <rect x="50" y="159" width="20" height="2" fill={accent} opacity="0.45" />
    </svg>
  );
}

// A coffee bean, for the feedback rating.
export function Bean({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
      <ellipse
        cx="12"
        cy="12"
        rx="7"
        ry="10"
        transform="rotate(35 12 12)"
        fill={filled ? 'var(--ember)' : 'none'}
        stroke={filled ? 'var(--ember)' : 'var(--bark-light)'}
        strokeWidth="1.6"
      />
      <path
        d="M8.5 5.5 C13 9 11 14 15.5 18.5"
        stroke={filled ? 'var(--bark)' : 'var(--bark-light)'}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// A small ornamental divider under section titles: a line, a pine, a line.
export function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span />
      <PineIcon size={18} />
      <span />
    </div>
  );
}
