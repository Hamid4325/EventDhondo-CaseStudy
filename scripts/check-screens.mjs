import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const required = [
  "splash-screen.webp",
  "home-dashboard-student.webp",
  "interest-selection.webp",
  "event-detail-registration.webp",
  "team-registration.webp",
  "achievements-profile.webp",
  "registration-success.webp",
  "organizer-dashboard.webp",
  "attendance-detail-scan.webp",
  "edit-event-menu.webp",
  "reviews-ratings-overview.webp",
];

const dir = join(process.cwd(), "public", "screens");
const present = existsSync(dir) ? readdirSync(dir) : [];
const missing = required.filter((f) => !present.includes(f));

if (missing.length) {
  console.log("Missing screens (placeholders will show):");
  for (const f of missing) console.log("  - " + f);
} else {
  console.log("All 11 screens present.");
}