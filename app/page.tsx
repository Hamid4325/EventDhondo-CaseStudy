import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";

export default function Page() {
  return (
    <main>
      <Hero />
      <section id="problem" className="scroll-mt-24">
        <Problem />
      </section>
      <section id="solution" className="scroll-mt-24">
        <Solution />
      </section>
      <section id="student" className="scroll-mt-24" />
      <section id="organizer" className="scroll-mt-24" />
      <section id="design-system" className="scroll-mt-24" />
      <section id="impact" className="scroll-mt-24" />
      <section id="closing" className="scroll-mt-24" />
    </main>
  );
}