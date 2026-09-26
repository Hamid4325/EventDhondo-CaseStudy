"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Reveal from "./Reveal";
import { journeySteps } from "@/data/showcase";
import { easeOut } from "@/lib/motion";

const PATH_D =
  "M120 400 C 190 380 220 360 280 326 C 350 292 380 278 440 252 C 510 226 540 212 600 178 C 670 144 700 130 760 104 C 820 80 850 68 900 56";

const NODES = [
  { x: 120, y: 400 },
  { x: 280, y: 326 },
  { x: 440, y: 252 },
  { x: 600, y: 178 },
  { x: 760, y: 104 },
  { x: 900, y: 56 },
] as const;

function Diagram({
  active,
  progress,
  staticMode = false,
}: {
  active: number;
  progress?: MotionValue<number>;
  staticMode?: boolean;
}) {
  return (
    <div className="relative mx-auto mt-16 hidden aspect-[1000/520] w-full max-w-5xl lg:block">
      <svg viewBox="0 0 1000 520" className="absolute inset-0 h-full w-full">
        <path
          d={PATH_D}
          fill="none"
          stroke="#0E8F8A"
          strokeOpacity="0.25"
          strokeWidth={2}
        />
        {staticMode ? (
          <path d={PATH_D} fill="none" stroke="#0E8F8A" strokeWidth={3} />
        ) : (
          <motion.path
            d={PATH_D}
            fill="none"
            stroke="#0E8F8A"
            strokeWidth={3}
            style={{ pathLength: progress }}
          />
        )}
      </svg>
      {NODES.map((node, i) => (
        <DiagramNode
          key={journeySteps[i].label}
          node={node}
          index={i}
          active={active}
          staticMode={staticMode}
        />
      ))}
    </div>
  );
}

function DiagramNode({
  node,
  index,
  active,
  staticMode = false,
}: {
  node: { x: number; y: number };
  index: number;
  active: number;
  staticMode?: boolean;
}) {
  const current = index === active;
  const passed = index < active;
  const showText = staticMode || current;

  const animate = staticMode
    ? undefined
    : current
      ? { opacity: 1, scale: 1.06, filter: "blur(0px)" }
      : passed
        ? { opacity: 0.45, scale: 1, filter: "blur(1px)" }
        : { opacity: 0.6, scale: 1, filter: "blur(0px)" };

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex w-max flex-col items-center"
      style={{
        left: `${(node.x / 1000) * 100}%`,
        top: `${(node.y / 520) * 100}%`,
      }}
      animate={animate}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-white font-display text-xl font-bold text-brand shadow ring-2 ${current && !staticMode ? "ring-brand" : "ring-brand/30"}`}
      >
        {index + 1}
      </span>
      {showText && (
        <div className="absolute left-1/2 top-full mt-3 w-max -translate-x-1/2 text-center">
          <motion.div
            initial={staticMode ? false : { opacity: 0, y: 4 }}
            animate={staticMode ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
          >
            <p className="text-center font-display font-semibold text-ink">
              {journeySteps[index].label}
            </p>
            <p className="text-center text-muted text-sm">
              {journeySteps[index].note}
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function Rail({
  active,
  progress,
  staticMode = false,
}: {
  active: number;
  progress?: MotionValue<number>;
  staticMode?: boolean;
}) {
  return (
    <div className="mt-16 lg:hidden">
      <div className="relative">
        {staticMode ? (
          <div
            aria-hidden
            className="absolute -left-px top-0 h-full w-[2px] bg-brand"
          />
        ) : (
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute -left-px top-0 h-full w-[2px] origin-top bg-brand"
          />
        )}
        <ol className="relative border-l border-brand/20 pl-8">
          {journeySteps.map((s, i) => {
            const current = i === active;
            const passed = i < active;
            const chipClass = staticMode
              ? "bg-white text-brand"
              : current
                ? "bg-brand text-white"
                : passed
                  ? "bg-white text-brand/50"
                  : "bg-white text-brand/30";
            return (
              <li key={s.label} className="mb-8 last:mb-0">
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ring-1 ring-brand/30 ${chipClass}`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-xl text-ink">{s.label}</p>
                    {(staticMode || current) && (
                      <motion.p
                        initial={staticMode ? false : { opacity: 0, y: 4 }}
                        animate={staticMode ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: easeOut }}
                        className="text-muted text-sm"
                      >
                        {s.note}
                      </motion.p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        {!staticMode && (
          <ol aria-label="Journey steps" className="sr-only lg:hidden">
            {journeySteps.map((s, i) => (
              <li key={s.label}>
                {i + 1}. {s.label} — {s.note}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

function ScrollJourney() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  );

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v: number) => {
      setActive(Math.min(5, Math.floor(Math.min(Math.max(v, 0), 0.999) * 6)));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <div ref={ref} className="relative w-full lg:min-h-[220vh]">
      <div className="sticky top-24 hidden h-[calc(100vh-6rem)] items-center lg:flex">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <Diagram active={active} progress={progress} />
        </div>
        <ol aria-label="Journey steps" className="hidden lg:block lg:sr-only">
          {journeySteps.map((s, i) => (
            <li key={s.label}>
              {i + 1}. {s.label} — {s.note}
            </li>
          ))}
        </ol>
      </div>
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <Rail active={active} progress={progress} />
      </div>
    </div>
  );
}

function StaticMarkup() {
  return (
    <div className="relative w-full py-24">
      <Diagram active={5} staticMode />
      <Rail active={5} staticMode />
    </div>
  );
}

export default function Solution() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-brand-tint">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            Create a single, trustworthy platform that centralizes the entire event
            lifecycle while building a digital identity layer for students.
          </h2>
        </Reveal>
        {reduce ? <StaticMarkup /> : <ScrollJourney />}
      </div>
    </section>
  );
}
