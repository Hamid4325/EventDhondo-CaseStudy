import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Ecosystem from "@/components/Ecosystem";
import StudentExperience from "@/components/StudentExperience";
import OrganizerExperience from "@/components/OrganizerExperience";
import DesignSystem from "@/components/DesignSystem";
import Impact from "@/components/Impact";
import Closing from "@/components/Closing";

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
      <section id="ecosystem" className="scroll-mt-24">
        <Ecosystem />
      </section>
      <StudentExperience />
      <OrganizerExperience />
      <DesignSystem />
      <Impact />
      <Closing />
    </main>
  );
}