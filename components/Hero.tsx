"use client";

import { useRef } from "react";
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
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const frontY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const backY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 170]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-brand via-[#0b5e5b] to-ink px-4 text-center"
    >
      <motion.div style={{ opacity: fade }} className="flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
          className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-teal-200"
        >
          Case Study
        </motion.p>

        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">
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
          className="mt-8 max-w-2xl text-base leading-relaxed text-teal-100/90 sm:text-lg"
        >
          A unified platform that connects university students and organizers, making
          event discovery, registration, attendance, and achievement tracking simple
          and meaningful.
        </motion.p>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative mt-16 flex items-end justify-center pb-16"
      >
        <motion.div style={{ y: backY }} className="absolute left-1/2 top-1/2 -translate-x-[120%]">
          <DeviceFrame
            src={SCREENS.splash}
            alt="EventDhondo splash screen"
            fallbackLabel="splash-screen.png"
            tilted
            className="w-36 opacity-80 sm:w-44"
          />
        </motion.div>
        <motion.div style={{ y: frontY }} className="relative z-10">
          <DeviceFrame
            src={SCREENS.home}
            alt="Student home dashboard"
            fallbackLabel="home-dashboard-student.png"
            className="w-56 sm:w-64"
          />
        </motion.div>
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
