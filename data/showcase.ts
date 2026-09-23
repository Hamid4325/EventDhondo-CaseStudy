import { SCREENS } from "@/lib/screens";

export type ShowcaseFeature = {
  id: string;
  title: string;
  description: string;
  screen: string;
};

export const problemCards = [
  {
    icon: "overload",
    title: "Information Overload",
    description:
      "Events are scattered across WhatsApp, Instagram, LinkedIn and notice boards. 70% of relevant events go unnoticed.",
  },
  {
    icon: "registration",
    title: "Chaotic Registration",
    description:
      "Google Forms and manual lists lead to duplicates, no confirmations, and zero capacity control.",
  },
  {
    icon: "attendance",
    title: "No Attendance System",
    description:
      "Manual check-ins are slow, error-prone, and impossible to verify in real time.",
  },
  {
    icon: "achievements",
    title: "No Record of Achievements",
    description:
      "Students have no structured way to track participation, wins, or skills earned for their future.",
  },
] as const;

export const journeySteps = [
  { label: "Discover", note: "Find relevant events easily" },
  { label: "Register", note: "Simple, reliable, real-time" },
  { label: "Team Up", note: "Form teams and collaborate" },
  { label: "Attend", note: "QR-based secure check-in" },
  { label: "Review", note: "Share feedback & rate events" },
  { label: "Achieve", note: "Build portfolio & showcase growth" },
] as const;

export const ecosystemNodes = {
  students: { label: "Students", detail: "Discover, register, attend & achieve" },
  organizers: { label: "Organizers", detail: "Create, manage & analyze events" },
  admins: { label: "Admins", detail: "Verify, approve & ensure quality" },
} as const;

export const studentFeatures: ShowcaseFeature[] = [
  {
    id: "interests",
    title: "Personalized from day one",
    description:
      "Students pick their interests so the app can recommend events that actually match their vibe.",
    screen: SCREENS.interest,
  },
  {
    id: "feed",
    title: "Everything, in one feed",
    description:
      "Featured, recommended, and upcoming events surface automatically — no more scattered WhatsApp groups.",
    screen: SCREENS.home,
  },
  {
    id: "details",
    title: "Details that matter",
    description:
      "Full event details, required skills, perks, and real-time seat availability before committing.",
    screen: SCREENS.eventDetail,
  },
  {
    id: "teams",
    title: "Built for teams",
    description:
      "For competitions and hackathons, students can form and manage teams directly inside the registration flow.",
    screen: SCREENS.team,
  },
  {
    id: "portfolio",
    title: "A record that follows you",
    description:
      "Every event attended, every win, every skill gained — compiled into a shareable portfolio.",
    screen: SCREENS.achievements,
  },
];

export const studentMicroMoment = {
  id: "registration-success",
  title: "Instant confirmation",
  description: "Registration, QR, and a spot secured — in one tap.",
  screen: SCREENS.registrationSuccess,
};

export const organizerFeatures: ShowcaseFeature[] = [
  {
    id: "command-center",
    title: "Command center",
    description:
      "A daily snapshot of registrations, pending check-ins, and events that need attention.",
    screen: SCREENS.organizerDashboard,
  },
  {
    id: "attendance",
    title: "Live attendance, zero guesswork",
    description:
      "QR-based check-in gives organizers real-time, verifiable attendance — no more manual clipboard lists.",
    screen: SCREENS.attendanceScan,
  },
  {
    id: "control",
    title: "Full control over every event",
    description:
      "Every detail of an event — from capacity to custom registration fields — editable in one structured flow.",
    screen: SCREENS.editEvent,
  },
  {
    id: "reputation",
    title: "Feedback that builds reputation",
    description:
      "Organizers collect ratings and reply to reviews, building measurable trust over time.",
    screen: SCREENS.reviews,
  },
];

export const colorSwatches = [
  { name: "Brand Teal", hex: "#0E8F8A" },
  { name: "Background Teal", hex: "#E7F4F3" },
  { name: "Gray", hex: "#64748B" },
  { name: "Error Red", hex: "#DC2626" },
  { name: "Error Background", hex: "#FEF2F2" },
  { name: "Background Overlay", hex: "#FDFDFD" },
] as const;

export const impactStats = [
  { value: 70, suffix: "%", label: "more events discovered by students" },
  { value: 40, suffix: "%", label: "reduction in manual management for organizers" },
] as const;

export const impactBadges = [
  { icon: "accuracy", label: "Real-time tracking ensures high accuracy" },
  { icon: "trust", label: "Quality events and organizers build real trust" },
] as const;
