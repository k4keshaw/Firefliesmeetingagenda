import { createBrowserRouter } from "react-router";
import { PreMeetingBuilder } from "./components/PreMeetingBuilder";
import { LiveMeetingOverlay } from "./components/LiveMeetingOverlay";
import { PostMeetingSummary } from "./components/PostMeetingSummary";
import { MeetingHistory } from "./components/MeetingHistory";
import { Analytics } from "./components/Analytics";
import { TeamDetails } from "./components/TeamDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PreMeetingBuilder,
  },
  {
    path: "/meetings",
    Component: MeetingHistory,
  },
  {
    path: "/analytics",
    Component: Analytics,
  },
  {
    path: "/team",
    Component: TeamDetails,
  },
  {
    path: "/live",
    Component: LiveMeetingOverlay,
  },
  {
    path: "/summary",
    Component: PostMeetingSummary,
  },
]);