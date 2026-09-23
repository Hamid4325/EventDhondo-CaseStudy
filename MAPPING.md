# EventDhondo — Screen Mapping Report (Task 3)

Extraction method: PyMuPDF rendered every page of `Frame 29_merged.pdf` and
`01 — Cover_merged.pdf` at 150 dpi to `eventdhondo-pdf/{frame|cover}-NNN.png`.
Because this model cannot ingest images, every frame was identified via its PDF
**text layer** (`page.get_text()`) by matching unique UI labels to the screen
descriptions in spec §6/§7.

Status: **all 11 named screens recovered. No NOT FOUND entries.**

## Frame → named screen

| Named screen (public/screens) | Source frame | Distinguishing text |
|---|---|---|
| `splash-screen.png` | `frame-002` | "EventDhondo" splash (9:41) |
| `interest-selection.png` | `frame-010` | "What are you into?" + interest chips |
| `home-dashboard-student.png` | `frame-011` | "Hi, John — Keep Learning, Keep Building" |
| `event-detail-registration.png` | `frame-015` | "Event detail … Register Now", seats left |
| `registration-success.png` | `frame-017` | "You're Registered!" + QR-code card |
| `team-registration.png` | `frame-019` | "Create Your Team", Team Name, Invite Member |
| `achievements-profile.png` | `frame-021` | Achievements, Performance Overview, Skill Tags, profile links |
| `organizer-dashboard.png` | `frame-030` | "Here's what's happening with your events" |
| `attendance-detail-scan.png` | `frame-033` | "Attendance Overview 87/320, 25%", Scan QR Code / Enter Code Manually |
| `edit-event-menu.png` | `frame-040` | "Edit Event" menu list |
| `reviews-ratings-overview.png` | `frame-051` | "Overall Rating 4.0, Based on 728 reviews" + rating breakdown |

## Duplicates / choices
- `frame-002` and `frame-003` are identical splash → used 002.
- `frame-015` and `frame-016` are identical event-detail → used 015.
- `frame-050` and `frame-051` are both Reviews & Ratings; 051 includes the 5→1
  rating breakdown → used 051 (050 is the scrolled variant).
- `frame-001` / `frame-022` are wide banner pages ("…Mobile UI - User/Organizer
  Side"), not screens — unused.
- Unmapped frames are legitimately not among the 11 named screens
  (onboarding, sign-in, event filters, my-events, team rows, edit sub-forms,
  participation list, per-event reviews, settings, profile, …).

## Reference deck (for Tasks 5/7/9)
`showcase/public/_reference/cover-{01..12}.png` — rendered pages of
`01 — Cover_merged.pdf`, never rendered by the app. Text-layer notes:

- `cover-001` — hero headline "Discover. Participate. Achieve." + subhead VERBATIM as in spec §5.
- `cover-003` — problem cards, incl. "70% of relevant events go unnoticed".
- `cover-007` — design-system: Inter primary / Montserrat secondary; Brand Teal `0E8F8A`, Error Red `DC2626`, Gray `64748B`, Background Teal `E7F4F3`, Error Background `FEF2F2`, Background Overlay `FDFDFD` — matches spec tokens.
- `cover-008` — journey: Discover / Register / Team Up / Attend (QR) / Review / Achieve.
- `cover-009` — ecosystem nodes: Students "Discover, register, attend & achieve"; Organizers "Create, manage & analyze events"; Admins "Verify, approve & ensure quality". Topology/arrow direction per user's explicit spec (asymmetric cycle Students→Organizers→Admins→Students), verified at geometry level in Task 9.
- `cover-012` — impact: "70% more events discovered", "40% reduction in manual management for organizers" (both verbatim), plus Team Up / Attendance Accuracy / Student Growth / Trusted Ecosystem cards.
- `cover-010`/`cover-011` — student/organizer highlight reels reference the same frames copied above.

Caveat: geometry of the original ecosystem slide (exact node positions, arrow
glyph shape) could not be visually inspected; Task 9 reproduces the topology the
user specified with cycles, using positions derived from text-layer layout order.