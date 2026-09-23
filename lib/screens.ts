export const SCREENS = {
  splash: "/screens/splash-screen.png",
  home: "/screens/home-dashboard-student.png",
  interest: "/screens/interest-selection.png",
  eventDetail: "/screens/event-detail-registration.png",
  team: "/screens/team-registration.png",
  achievements: "/screens/achievements-profile.png",
  registrationSuccess: "/screens/registration-success.png",
  organizerDashboard: "/screens/organizer-dashboard.png",
  attendanceScan: "/screens/attendance-detail-scan.png",
  editEvent: "/screens/edit-event-menu.png",
  reviews: "/screens/reviews-ratings-overview.png",
} as const;

export type ScreenKey = keyof typeof SCREENS;
