"use client";

import Reveal from "./Reveal";
import { colorSwatches } from "@/data/showcase";

export default function DesignSystem() {
  return (
    <section id="design-system" className="bg-brand-tint scroll-mt-24">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:py-28">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            A consistent design language
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-[0_16px_50px_-25px_rgba(10,46,44,0.25)]">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">Primary Font — Inter</p>
              <p className="mt-4 text-7xl font-medium text-ink" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                Aa
              </p>
              <p className="mt-4 text-sm text-muted">Inter · body & UI</p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-[0_16px_50px_-25px_rgba(10,46,44,0.25)]">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">Secondary Font — Montserrat</p>
              <p className="mt-4 text-7xl font-bold text-ink" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
                Aa
              </p>
              <p className="mt-4 text-sm text-muted">Montserrat · display & headlines</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 sm:grid-cols-6">
            {colorSwatches.map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-16 rounded-2xl shadow-inner ring-1 ring-black/5"
                  style={{ backgroundColor: c.hex }}
                />
                <p className="text-[11px] font-medium text-ink">{c.name}</p>
                <p className="font-mono text-[10px] uppercase text-muted">{c.hex}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}