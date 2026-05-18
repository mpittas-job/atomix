import type { Section } from "@/app/advanced-slider/content/types";
import { completedTasksTab } from "./tabs/completed-tasks/tab";
import { legalOpinionTab } from "./tabs/legal-opinion/tab";
import { reviewTasksTab } from "./tabs/review-tasks/tab";

export const referralJourneySection: Section = {
  id: "referral-journey",
  navLabel: "Referral Journey",
  title: "Referral Journey",
  tabs: [legalOpinionTab, completedTasksTab, reviewTasksTab],
};
