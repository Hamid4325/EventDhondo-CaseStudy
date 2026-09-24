"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import DeviceFrame from "./DeviceFrame";
import { SCREENS } from "@/lib/screens";
import { easeOut } from "@/lib/motion";

const words = ["Discover.", "Participate.", "Achieve."];

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: undefined,
    offset: ["start start", "end start"],
  });

  const fade = useTransform(scrollYProgress, [0, 0.85], reduce ? [1, 1] : [1, 0]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-brand via-[#0b5e5b] to-ink px-4 pt-28 pb-16 text-center"
    >
      <motion.div style={{ opacity: fade }} className="flex w-full flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
          className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-teal-200"
        >
          Case Study
        </motion.p>

        <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">
          {words.map((w, i) => (
            <motion.span
              key={w}
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.2 + i * 0.15 }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.75 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-teal-100/90 sm:text-lg"
        >
          A unified platform that connects university students and organizers, making
          event discovery, registration, attendance, and achievement tracking simple
          and meaningful.
        </motion.p>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="mt-12 flex w-full items-end justify-center gap-2 sm:gap-4"
      >
        <DeviceFrame
          src={SCREENS.splash}
          alt="EventDhondo splash screen with teal branding"
          fallbackLabel="splash-screen.png"
          tilted
          maxH={430}
          className="max-w-36 sm:max-w-44"
        />
        <DeviceFrame
          src={SCREENS.home}
          alt="Student home dashboard"
          fallbackLabel="home-dashboard-student.png"
          maxH={520}
          className="max-w-52 sm:max-w-64"
        />
      </motion.div>

      <motion.a
        href="#problem"
        aria-label="Scroll to problem section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-teal-200"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="animate-bounce motion-reduce:animate-none"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  );
}
