/* eslint-disable @next/next/no-img-element -- static brand mark, no optimization pipeline for PNGs in static export */
export default function Logo({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <img
      src="/Logo.png"
      alt="EventDhondo"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}