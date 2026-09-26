"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import Logo from "./Logo";
import { ecosystemNodes } from "@/data/showcase";
import { easeOut } from "@/lib/motion";

const nodes = [
  { ...ecosystemNodes.students, cx: 320, cy: 110, labelAbove: true },
  { ...ecosystemNodes.organizers, cx: 172.8, cy: 365 },
  { ...ecosystemNodes.admins, cx: 467.2, cy: 365 },
] as const;

const cycleEdges = [
  { id: "cycle-a", d: "M320 110 A170 170 0 0 0 172.8 365" },
  { id: "cycle-b", d: "M172.8 365 A170 170 0 0 0 467.2 365" },
  { id: "cycle-c", d: "M467.2 365 A170 170 0 0 0 320 110" },
] as const;

export default function Ecosystem() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            Three portals working together to build a trustworthy and engaging platform.
          </h2>
        </Reveal>

        <Reveal className="mt-16" delay={0.1}>
          <div className="relative mx-auto aspect-[640/560] w-full max-w-[640px]">
            <svg viewBox="0 0 640 560" className="absolute inset-0 h-full w-full">
              <defs>
                <marker id="ed-arrow" viewBox="0 0 10 10" refX="8.5" refY="5"
                  markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10 z" fill="#0E8F8A" />
                </marker>
              </defs>

              <circle cx="320" cy="280" r="170" fill="none" stroke="#0E8F8A" strokeOpacity="0.25" strokeWidth="2.5" />

              {cycleEdges.map((e) => (
                <motion.path
                  key={e.id}
                  d={e.d}
                  fill="none"
                  stroke="#0E8F8A"
                  strokeWidth="3"
                  markerEnd="url(#ed-arrow)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: reduce ? 0 : 1.1, ease: easeOut, delay: reduce ? 0 : 0.3 }}
                />
              ))}

              <circle cx="320" cy="280" r="46" fill="#E7F4F3" />
              <motion.foreignObject
                x="296" y="256" width="48" height="48"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: reduce ? 0 : 0.6, ease: easeOut, delay: reduce ? 0 : 0.2 }}
                style={{ transformOrigin: "50% 50%" }}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <Logo size={44} decorative className="drop-shadow-[0_4px_10px_rgba(10,46,44,0.25)]" />
                </div>
              </motion.foreignObject>
            </svg>

            {nodes.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: reduce ? 0 : 0.6, ease: easeOut, delay: reduce ? 0 : 0.25 + i * 0.15 }}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center"
                style={{ left: `${(n.cx / 640) * 100}%`, top: `${(n.cy / 560) * 100}%` }}
              >
                {"labelAbove" in n && n.labelAbove ? (
                  <>
                    <span className="mb-2 max-w-[9.5rem] text-xs leading-snug text-muted">{n.detail}</span>
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white font-display text-base font-semibold text-ink shadow-[0_20px_50px_-20px_rgba(10,46,44,0.45)] ring-[5px] ring-brand/10 sm:h-20 sm:w-20 sm:text-lg">
                      {n.label}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white font-display text-base font-semibold text-ink shadow-[0_20px_50px_-20px_rgba(10,46,44,0.45)] ring-[5px] ring-brand/10 sm:h-20 sm:w-20 sm:text-lg">
                      {n.label}
                    </span>
                    <span className="mt-2 max-w-[9.5rem] text-xs leading-snug text-muted">{n.detail}</span>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
