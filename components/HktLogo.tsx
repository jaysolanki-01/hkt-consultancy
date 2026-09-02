interface HktLogoProps {
  height?: number;
}

export default function HktLogo({ height = 44 }: HktLogoProps) {
  const scale = height / 72;
  const w = Math.round(320 * scale);
  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 320 72"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="HKT Consultancy — Business Growth Architects"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Circle */}
      <circle cx="36" cy="36" r="30" fill="none" stroke="#ffffff" strokeWidth="2.5" />
      {/* H K T monogram */}
      <g fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 24 V48" />
        <path d="M29 24 V48" />
        <path d="M18 36 H29" />
        <path d="M29 36 L40 24" />
        <path d="M29 36 L40 48" />
        <path d="M38 24 H54" />
        <path d="M46 24 V48" />
      </g>
      {/* Brand name */}
      <text x="78" y="30" fontFamily="Georgia,'Times New Roman',serif" fontSize="18" fontWeight="700" fill="#ffffff" letterSpacing="2.5">
        HKT CONSULTANCY
      </text>
      <text x="79" y="48" fontFamily="Arial,Helvetica,sans-serif" fontSize="8.5" fontWeight="400" fill="#c9a84c" letterSpacing="2.2">
        BUSINESS GROWTH ARCHITECTS
      </text>
    </svg>
  );
}
