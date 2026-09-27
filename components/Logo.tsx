/* eslint-disable @next/next/no-img-element -- static brand mark; a 160px WebP is already the smallest useful form and static export has no image pipeline */
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
      src="/Logo.webp"
      alt={decorative ? "" : "EventDhondo"}
      aria-hidden={decorative ? true : undefined}
      width={size}
      height={size}
      className={className}
      decoding="async"
      style={{ width: size, height: size }}
    />
  );
}
