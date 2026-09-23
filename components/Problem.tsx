"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { problemCards } from "@/data/showcase";
import { fadeUp, easeOut } from "@/lib/motion";
import { IconOverload, IconRegistration, IconAttendance, IconAchievements } from "./icons";

const iconMap = {
  overload: IconOverload,
  registration: IconRegistration,
  attendance: IconAttendance,
  achievements: IconAchievements,
} as const;

const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Problem() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            Students and organizers face a fragmented, inefficient event experience.
          </h2>
        </Reveal>

        <motion.div
          variants={containerVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {problemCards.map((c) => {
            const Icon = iconMap[c.icon];
            return (
              <motion.div
                key={c.title}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: easeOut }}
                className="rounded-3xl bg-white p-8 shadow-[0_20px_60px_-25px_rgba(10,46,44,0.18)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-error-bg text-error">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-ink">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
