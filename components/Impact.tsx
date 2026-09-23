"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import Reveal from "./Reveal";
import { impactStats, impactBadges } from "@/data/showcase";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <span ref={ref} className="font-display text-6xl font-bold tracking-tight text-white sm:text-8xl">
      {`0${suffix}`}
    </span>
  );
}

export default function Impact() {
  return (
    <section id="impact" className="scroll-mt-24 bg-gradient-to-b from-ink via-[#0b514e] to-brand">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Impact &amp; Outcome
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2">
          {impactStats.map((s) => (
            <Reveal key={s.label}>
              <div className="flex flex-col items-center text-center">
                <CountUp value={s.value} suffix={s.suffix} />
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-teal-100/85">{s.label}</p>
              </div>
            </Reveal>
          ))}

          {impactBadges.map((b) => (
            <Reveal key={b.label}>
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/25">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8 text-teal-200">
                    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="max-w-xs text-sm leading-relaxed text-teal-100/85">{b.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
