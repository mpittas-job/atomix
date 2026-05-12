import type { Section } from "@/app/advanced-slider/content/types";
import { referralJourneyMainTab } from "./tabs/referral-journey-main/tab";

export const referralJourneySection: Section = {
  id: "referral-journey",
  navLabel: "Referral Journey",
  title: "Referral Journey",
  tabs: [referralJourneyMainTab],
};
