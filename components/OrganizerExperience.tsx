import Showcase from "./Showcase";
import { organizerFeatures } from "@/data/showcase";

export default function OrganizerExperience() {
  return (
    <Showcase
      id="organizer"
      eyebrow="Organizer Experience"
      heading="Powerful tools for organizers"
      features={organizerFeatures}
      flip
    />
  );
}
