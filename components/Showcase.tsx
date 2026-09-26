"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  type MotionValue,
} from "framer-motion";
import DeviceFrame from "./DeviceFrame";
import Reveal from "./Reveal";
import { useCenteredActive } from "@/lib/useCenteredActive";
import type { ShowcaseFeature } from "@/data/showcase";
import { easeOut } from "@/lib/motion";

const WINDOWED_IDS = new Set(["feed", "details", "teams", "portfolio"]);

function DesktopRow({
  f,
  i,
  observeRef,
  registerProgress,
}: {
  f: ShowcaseFeature;
  i: number;
  observeRef: (node: HTMLElement | null, index: number) => void;
  registerProgress: (featureId: string, mv: MotionValue<number>) => void;
}) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  // "start center" puts progress 0 at the exact instant useCenteredActive crossfades
  // this row in (its top crossing the viewport centre), so the window opens on the first
  // pixel of the screenshot instead of partway down it. "start start" lands progress 1
  // 50vh later - 62% of the row's 80vh active window - so the complete screen is reached
  // and then held for the remaining 38% while the text scrolls up.
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start center", "start start"] });

  useEffect(() => {
    if (WINDOWED_IDS.has(f.id)) registerProgress(f.id, scrollYProgress);
  }, [f.id, scrollYProgress, registerProgress]);

  return (
    <div
      ref={(node) => {
        rowRef.current = node;
        observeRef(node, i);
      }}
      className="flex min-h-[80vh] items-center"
    >
      <div>
        <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, "0")}</span>
        <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">{f.title}</h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{f.description}</p>
      </div>
    </div>
  );
}

function MobileCard({ f }: { f: ShowcaseFeature }) {
  const deviceRef = useRef<HTMLDivElement | null>(null);
  // Measured on the device wrapper, not the card: "start end" then puts progress 0 at
  // the instant the screen first enters the viewport (the heading above it would
  // otherwise eat the first fifth of the travel), and "center center" lands progress 1
  // when the device is fully on screen and centred, complete and held from there.
  const { scrollYProgress } = useScroll({ target: deviceRef, offset: ["start end", "center center"] });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="font-display text-2xl font-semibold text-ink">{f.title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{f.description}</p>
      </div>
      {/* w-full is load-bearing: mx-auto on a flex-column child is fit-content sized,
          so the windowed envelope's own w-full would resolve against an indefinite
          width and collapse the device to zero. The cap adds the bezel's 12px so the
          windowed screen lands on the same 224px as the maxH-driven native one. */}
      <div ref={deviceRef} className="mx-auto w-full max-w-[calc(14rem+0.75rem)]">
        <DeviceFrame
          src={f.screen}
          alt={f.title}
          fallbackLabel={`${f.id}.png`}
          maxH={460}
          windowed={WINDOWED_IDS.has(f.id)}
          progress={scrollYProgress}
        />
      </div>
    </div>
  );
}

export default function Showcase({
  id,
  eyebrow,
  heading,
  features,
  flip = false,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  features: ShowcaseFeature[];
  flip?: boolean;
}) {
  const reduce = useReducedMotion();
  const { active, ref } = useCenteredActive(features.length);
  const [progressById, setProgressById] = useState<Record<string, MotionValue<number>>>({});

  const registerProgress = useCallback((featureId: string, mv: MotionValue<number>) => {
    setProgressById((prev) => (prev[featureId] ? prev : { ...prev, [featureId]: mv }));
  }, []);

  return (
    <section id={id} className="scroll-mt-24 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-brand">
            {eyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            {heading}
          </h2>
        </Reveal>

        {/* Mobile: stacked, one device per feature */}
        <div className="mt-16 grid grid-cols-1 gap-20 lg:hidden">
          {features.map((f) => (
            <MobileCard key={f.id} f={f} />
          ))}
        </div>

        {/* Desktop: sticky crossfading device column + scrolling text */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-2 lg:gap-16">
          <div className={`flex flex-col ${flip ? "order-2" : "order-1"}`}>
            {features.map((f, i) => (
              <DesktopRow
                key={f.id}
                f={f}
                i={i}
                observeRef={ref}
                registerProgress={registerProgress}
              />
            ))}
          </div>

          <div className={`${flip ? "order-1" : "order-2"}`}>
            <div className="sticky top-24 relative h-[82vh] max-h-[760px] w-full">
              {features.map((f, i) => (
                <motion.div
                  key={f.id}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    y: i === active ? 0 : reduce ? 0 : 28,
                    scale: i === active ? 1 : reduce ? 1 : 0.97,
                  }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: easeOut }}
                  style={{ pointerEvents: i === active ? "auto" : "none" }}
                  aria-hidden={i !== active}
                >
                  <DeviceFrame
                    src={f.screen}
                    alt={f.title}
                    fallbackLabel={`${f.id}.png`}
                    className="max-w-64"
                    maxH={560}
                    windowed={WINDOWED_IDS.has(f.id)}
                    progress={progressById[f.id]}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
