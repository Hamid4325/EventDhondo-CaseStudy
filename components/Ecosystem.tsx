"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import HexLogo from "./HexLogo";
import { ecosystemNodes } from "@/data/showcase";
import { easeOut } from "@/lib/motion";

const nodes = [
  { ...ecosystemNodes.students, cx: 150, cy: 110 },
  { ...ecosystemNodes.organizers, cx: 460, cy: 400 },
  { ...ecosystemNodes.admins, cx: 340, cy: 420 },
];

const cycleEdges = [
  { id: "cycle-a", from: nodes[0], to: nodes[1] },
  { id: "cycle-b", from: nodes[1], to: nodes[2] },
  { id: "cycle-c", from: nodes[2], to: nodes[0] },
];

export default function Ecosystem() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            Three portals working together to build a trustworthy and engaging platform.
          </h2>
        </Reveal>

        <Reveal className="mt-16" delay={0.1}>
          <div className="relative mx-auto aspect-square w-full max-w-[620px]">
            <svg viewBox="0 0 620 520" className="absolute inset-0 h-full w-full">
              <defs>
                <marker id="ed-arrow" viewBox="0 0 10 10" refX="8" refY="5"
                  markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10 z" fill="#0E8F8A" />
                </marker>
              </defs>

              {cycleEdges.map((e) => {
                const midX = (e.from.cx + e.to.cx) / 2;
                const midY = (e.from.cy + e.to.cy) / 2;
                const path = `M ${e.from.cx} ${e.from.cy} Q ${midX + (midX - 300) * 0.45} ${midY + (midY - 260) * 0.45} ${e.to.cx} ${e.to.cy}`;
                return (
                  <g key={e.id}>
                    <path d={path} fill="none" stroke="#0E8F8A" strokeOpacity="0.25" strokeWidth="2" />
                    <motion.path
                      d={path}
                      fill="none"
                      stroke="#0E8F8A"
                      strokeWidth="2.5"
                      markerEnd="url(#ed-arrow)"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1.3, ease: easeOut, delay: 0.3 }}
                    />
                  </g>
                );
              })}

              <motion.circle
                cx="300" cy="260" r="70"
                fill="#E7F4F3"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
              />
              <motion.foreignObject
                x="242" y="202" width="116" height="116"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
                style={{ transformOrigin: "50% 50%" }}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <HexLogo size={64} />
                </div>
              </motion.foreignObject>
            </svg>

            {nodes.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.25 + i * 0.15 }}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center"
                style={{ left: `${(n.cx / 620) * 100}%`, top: `${(n.cy / 520) * 100}%` }}
              >
                <span className="flex h-28 w-28 items-center justify-center rounded-full bg-white font-display text-lg font-semibold text-ink shadow-[0_20px_50px_-20px_rgba(10,46,44,0.45)] ring-8 ring-brand/10 sm:h-32 sm:w-32">
                  {n.label}
                </span>
                <span className="mt-2 max-w-[9rem] text-xs leading-snug text-muted">{n.detail}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}