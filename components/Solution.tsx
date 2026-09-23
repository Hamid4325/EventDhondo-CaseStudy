"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { journeySteps } from "@/data/showcase";
import { fadeUp, easeOut } from "@/lib/motion";

export default function Solution() {
  return (
    <section className="bg-brand-tint">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            Create a single, trustworthy platform that centralizes the entire event
            lifecycle while building a digital identity layer for students.
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <svg
            className="pointer-events-none absolute left-[8%] top-7 hidden h-2 w-[84%] lg:block"
            viewBox="0 0 100 1"
            preserveAspectRatio="none"
          >
            <path d="M0 0.5 L100 0.5" stroke="currentColor" strokeWidth="0.35" className="text-brand/40" />
            <motion.path
              d="M0 0.5 L100 0.5"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-brand"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, ease: easeOut }}
            />
          </svg>

          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
            {journeySteps.map((s, i) => (
              <motion.li
                key={s.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: easeOut, delay: i * 0.08 }}
                className="relative flex flex-col items-center gap-3 text-center"
              >
                <span className="z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white font-display text-xl font-bold text-brand shadow-[0_10px_30px_-12px_rgba(10,46,44,0.4)] ring-4 ring-brand/10">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-ink">{s.label}</p>
                  <p className="mt-1 text-xs leading-snug text-muted">{s.note}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
