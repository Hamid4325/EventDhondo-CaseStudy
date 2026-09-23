import Showcase from "./Showcase";
import { studentFeatures, studentMicroMoment } from "@/data/showcase";

export default function StudentExperience() {
  return (
    <Showcase
      id="student"
      eyebrow="Student Experience"
      heading="Built for the student journey"
      features={studentFeatures}
      accent={studentMicroMoment}
    />
  );
}