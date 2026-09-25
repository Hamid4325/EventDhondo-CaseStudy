/* eslint-disable @next/next/no-img-element -- keep raw <img> + onError so a missing screen still shows the labeled fallback in static export */
"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

const WINDOW_RATIO = 2.1667; // 19.5 / 9 phone window

export default function DeviceFrame({
  src,
  alt,
  fallbackLabel,
  className = "",
  tilted = false,
  maxH,
  windowed = false,
  progress,
}: {
  src: string;
  alt: string;
  fallbackLabel: string;
  className?: string;
  tilted?: boolean;
  maxH?: number;
  windowed?: boolean;
  progress?: MotionValue<number>;
}) {
  const [missing, setMissing] = useState(false);
  const [imgRatio, setImgRatio] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const windowedActive = windowed && !reduce;

  const travelPct = imgRatio ? Math.max(0, (1 - WINDOW_RATIO / imgRatio) * 100) : 0;
  const fallback = useMotionValue(0);
  const travelY = useTransform(progress ?? fallback, [0, 1], ["0%", `-${travelPct}%`]);

  return (
    <div className={`${className} w-max ${tilted ? "-rotate-3" : ""} transition-transform duration-300`}>
      <div className="relative rounded-[2rem] bg-gradient-to-b from-slate-600 via-slate-900 to-black p-1.5 shadow-[0_40px_80px_-20px_rgba(10,46,44,0.55)] ring-1 ring-black/50">
        <div className="absolute -left-[3px] top-24 z-0 h-12 w-[3px] rounded-l bg-slate-800" aria-hidden />
        <div className="absolute -left-[3px] top-40 z-0 h-16 w-[3px] rounded-l bg-slate-800" aria-hidden />
        <div className="absolute -left-[3px] top-64 z-0 h-16 w-[3px] rounded-l bg-slate-800" aria-hidden />
        <div className="absolute -right-[3px] top-36 z-0 h-20 w-[3px] rounded-r bg-slate-800" aria-hidden />
        <div className="relative overflow-hidden rounded-[1.6rem] bg-white">
          <span className="absolute left-1/2 top-0 z-20 h-3 w-12 -translate-x-1/2 rounded-b-[10px] bg-black" aria-hidden />
          {missing ? (
            <div className="flex min-h-[18rem] w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-brand-tint to-surface px-6 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">Screen unavailable</span>
              <span className="font-mono text-[11px] text-brand">{fallbackLabel}</span>
            </div>
          ) : windowedActive ? (
            <div className="relative aspect-[9/19.5] w-full overflow-hidden">
              <motion.img
                src={src}
                alt={alt}
                loading="lazy"
                className="absolute inset-x-0 top-0 h-auto w-full max-w-none"
                style={{ y: travelY }}
                onLoad={(e) => {
                  const el = e.currentTarget;
                  if (el.naturalHeight > 0) setImgRatio(el.naturalHeight / el.naturalWidth);
                }}
                onError={() => setMissing(true)}
              />
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="block h-auto w-auto max-w-full"
              style={maxH ? { maxHeight: maxH } : undefined}
              onError={() => setMissing(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
