// The site's illustrations: all inline SVG, so there are no image files to load and they scale
// cleanly. Colors come from CSS variables (see index.css) so they follow the palette.

// The brand icon: an iced glass, drawn in the current text color. The ice cubes use
// --logo-ice (white by default) so the icon also works on dark backgrounds.
export function LogoIcon({ height = 32 }: { height?: number }) {
  return (
    <svg height={height} viewBox="4 16 72 84" aria-hidden="true" className="logo-icon">
      <path d="M10 22 H70 L64 90 Q63.6 96 57 96 H23 Q16.4 96 16 90 Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <path d="M11.8 44 H68.2 L64 90 Q63.6 96 57 96 H23 Q16.4 96 16 90 Z" fill="currentColor" />
      <g fill="var(--logo-ice, var(--white))">
        <rect x="19" y="33" width="15" height="15" rx="3" transform="rotate(-10 26 40)" />
        <rect x="40" y="36" width="14" height="14" rx="3" transform="rotate(10 47 43)" />
        <rect x="28" y="54" width="13" height="13" rx="3" transform="rotate(6 34 60)" />
      </g>
    </svg>
  );
}

const GLASS = 'M20 36 H100 L92 200 Q91.4 212 80 212 H40 Q28.6 212 28 200 Z';

// A tall glass of cold brew over ice with a colored straw, used on the product cards and in the hero.
export function Glass({ accent, className = 'drink' }: { accent: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 220" aria-hidden="true" className={className}>
      <path d={GLASS} fill="var(--white)" fillOpacity="0.45" />
      <path d="M21.7 70 H98.3 L92 200 Q91.4 212 80 212 H40 Q28.6 212 28 200 Z" fill="var(--brown)" />
      <rect x="62" y="4" width="9" height="150" rx="4" fill={accent} transform="rotate(9 66 80)" />
      <g fill="var(--white)" fillOpacity="0.85">
        <rect x="30" y="58" width="26" height="26" rx="5" transform="rotate(-12 43 71)" />
        <rect x="70" y="64" width="24" height="24" rx="5" transform="rotate(10 82 76)" />
        <rect x="44" y="92" width="22" height="22" rx="5" transform="rotate(6 55 103)" />
      </g>
      <path d={GLASS} fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

// Three small dots under section titles, one in each brand color.
export function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span style={{ background: 'var(--coral)' }} />
      <span style={{ background: 'var(--teal)' }} />
      <span style={{ background: 'var(--yellow)' }} />
    </div>
  );
}
