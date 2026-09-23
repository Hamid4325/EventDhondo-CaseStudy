export default function HexLogo({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="ed-hex" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0E8F8A" />
          <stop offset="1" stopColor="#0A2E2C" />
        </linearGradient>
      </defs>
      <path d="M20 2.5 35.5 11V29L20 37.5 4.5 29V11Z" fill="url(#ed-hex)" />
      <path
        d="M14.5 27V13h11.5M14.5 20h7"
        stroke="#fff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}