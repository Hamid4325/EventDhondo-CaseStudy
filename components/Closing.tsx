"use client";

import Reveal from "./Reveal";
import HexLogo from "./HexLogo";

const pills = [
  { label: "LinkedIn", href: "#" },
  { label: "Portfolio", href: "#" },
  { label: "GitHub", href: "#" },
];

export default function Closing() {
  return (
    <section id="closing" className="scroll-mt-24 bg-surface">
      <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 py-24 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            Designed to make campus events effortless.
          </h2>
          <p className="mt-6 text-sm text-muted">[Your Name] — Product Design Intern</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {pills.map((p) => (
              <a
                key={p.label}
                href={p.href}
                className="rounded-full px-5 py-2 text-sm font-medium text-ink ring-1 ring-black/10 transition-colors hover:bg-brand-tint hover:text-brand"
              >
                {p.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <footer className="border-t border-black/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <HexLogo size={20} />
            <span className="font-display text-sm font-semibold text-ink">EventDhondo</span>
          </div>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} EventDhondo · Product design case study
          </p>
        </div>
      </footer>
    </section>
  );
}
