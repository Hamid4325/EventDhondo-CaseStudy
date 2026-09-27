export const SCREENS = {
  splash: "/screens/splash-screen.webp",
  home: "/screens/home-dashboard-student.webp",
  interest: "/screens/interest-selection.webp",
  eventDetail: "/screens/event-detail-registration.webp",
  team: "/screens/team-registration.webp",
  achievements: "/screens/achievements-profile.webp",
  registrationSuccess: "/screens/registration-success.webp",
  organizerDashboard: "/screens/organizer-dashboard.webp",
  attendanceScan: "/screens/attendance-detail-scan.webp",
  editEvent: "/screens/edit-event-menu.webp",
  reviews: "/screens/reviews-ratings-overview.webp",
} as const;

export type ScreenKey = keyof typeof SCREENS;
