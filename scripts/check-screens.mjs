import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const required = [
  "splash-screen.png",
  "home-dashboard-student.png",
  "interest-selection.png",
  "event-detail-registration.png",
  "team-registration.png",
  "achievements-profile.png",
  "registration-success.png",
  "organizer-dashboard.png",
  "attendance-detail-scan.png",
  "edit-event-menu.png",
  "reviews-ratings-overview.png",
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