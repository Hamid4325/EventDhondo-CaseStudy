/* eslint-disable @next/next/no-img-element -- static brand mark, no optimization pipeline for PNGs in static export */
export default function Logo({
  size = 28,
  className = "",
  decorative = false,
}: {
  size?: number;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <img
      src="/Logo.png"
      alt={decorative ? "" : "EventDhondo"}
      aria-hidden={decorative ? true : undefined}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
