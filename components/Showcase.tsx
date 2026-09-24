"use client";

import { motion, useReducedMotion } from "framer-motion";
import DeviceFrame from "./DeviceFrame";
import Reveal from "./Reveal";
import { useCenteredActive } from "@/lib/useCenteredActive";
import type { ShowcaseFeature } from "@/data/showcase";
import { easeOut } from "@/lib/motion";

export default function Showcase({
  id,
  eyebrow,
  heading,
  features,
  flip = false,
  accent,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  features: ShowcaseFeature[];
  flip?: boolean;
  accent?: ShowcaseFeature;
}) {
  const reduce = useReducedMotion();
  const { active, ref } = useCenteredActive(features.length);

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
            <div key={f.id} className="flex flex-col gap-8">
              <div>
                <h3 className="font-display text-2xl font-semibold text-ink">{f.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{f.description}</p>
              </div>
              <div className="mx-auto w-52">
                <DeviceFrame src={f.screen} alt={f.title} fallbackLabel={`${f.id}.png`} maxH={460} />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: sticky crossfading device column + scrolling text */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-2 lg:gap-16">
          <div className={`flex flex-col ${flip ? "order-2" : "order-1"}`}>
            {features.map((f, i) => (
              <div
                key={f.id}
                ref={(node) => ref(node, i)}
                className="flex min-h-[80vh] items-center"
              >
                <div>
                  <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                    {f.description}
                  </p>
                  {accent && i === 2 && (
                    <div className="mt-8 flex items-center gap-5">
                      <div className="w-36">
                        <DeviceFrame
                          src={accent.screen}
                          alt={accent.title}
                          fallbackLabel={`${accent.id}.png`}
                          maxH={280}
                        />
                      </div>
                      <div className="max-w-[14rem]">
                        <p className="text-sm font-semibold text-ink">{accent.title}</p>
                        <p className="mt-1 text-xs leading-snug text-muted">{accent.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
                    className="w-64"
                    maxH={560}
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
