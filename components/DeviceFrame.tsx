/* eslint-disable @next/next/no-img-element -- keep raw <img> + onError so a missing screen still shows the labeled fallback in static export */
"use client";

import { useState } from "react";

export default function DeviceFrame({
  src,
  alt,
  fallbackLabel,
  className = "",
  tilted = false,
}: {
  src: string;
  alt: string;
  fallbackLabel: string;
  className?: string;
  tilted?: boolean;
}) {
  const [missing, setMissing] = useState(false);

  return (
    <div
      className={`${className} ${tilted ? "rotate-[8deg]" : ""} transition-transform duration-300`}
    >
      <div className="relative rounded-[3rem] bg-gradient-to-b from-slate-600 via-slate-900 to-black p-[11px] shadow-[0_40px_80px_-20px_rgba(10,46,44,0.55)] ring-1 ring-black/50">
        <div className="absolute -left-[3px] top-24 z-0 h-12 w-[3px] rounded-l bg-slate-800" aria-hidden />
        <div className="absolute -left-[3px] top-40 z-0 h-16 w-[3px] rounded-l bg-slate-800" aria-hidden />
        <div className="absolute -left-[3px] top-64 z-0 h-16 w-[3px] rounded-l bg-slate-800" aria-hidden />
        <div className="absolute -right-[3px] top-36 z-0 h-20 w-[3px] rounded-r bg-slate-800" aria-hidden />
        <div className="relative aspect-[9/19.2] overflow-hidden rounded-[2.55rem] bg-white">
          <div className="absolute left-1/2 top-2 z-20 flex h-6 w-24 -translate-x-1/2 items-center justify-end rounded-full bg-black pr-1.5">
            <div className="h-2 w-2 rounded-full bg-teal-900/80" aria-hidden />
          </div>
          {missing ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-brand-tint to-surface px-6 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                Screen unavailable
              </span>
              <span className="font-mono text-[11px] text-brand">{fallbackLabel}</span>
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="h-full w-full object-cover"
              onError={() => setMissing(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}