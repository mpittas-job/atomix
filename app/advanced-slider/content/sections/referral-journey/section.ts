import type { Section } from "@/app/advanced-slider/content/types";
import { referralCompensationTab } from "./tabs/referral-compensation/tab";
import { referralLeadsTab } from "./tabs/referral-leads/tab";
import { referralOnboardingTab } from "./tabs/referral-onboarding/tab";

export const referralJourneySection: Section = {
  id: "referral-journey",
  navLabel: "Referral Journey",
  title: "Referral Journey",
  tabs: [referralOnboardingTab, referralLeadsTab, referralCompensationTab],
};
