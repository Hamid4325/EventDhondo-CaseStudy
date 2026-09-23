"use client";

import { useEffect, useState } from "react";
import HexLogo from "./HexLogo";

const links = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Student", href: "#student" },
  { label: "Organizer", href: "#organizer" },
  { label: "Design System", href: "#design-system" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const text = scrolled ? "text-ink" : "text-white";
  const sub = scrolled ? "text-muted" : "text-white/75";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-black/5 bg-white/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <HexLogo size={26} />
          <span className={`font-display text-lg font-semibold tracking-tight ${text} transition-colors`}>
            EventDhondo
          </span>
        </a>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-brand ${sub}`}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#"
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            scrolled
              ? "bg-brand text-white hover:bg-ink"
              : "bg-white text-ink hover:bg-brand-tint"
          }`}
        >
          View Full Case Study
        </a>
      </nav>
    </header>
  );
}
