import type { Tab } from "@/app/advanced-slider/content/types";
import slide01 from "./steps/01-register-introducers";
import slide02 from "./steps/02-role-based-access";

export const referralOnboardingTab: Tab = {
  id: "referral-onboarding",
  label: "Partner onboarding",
  color: "#7c3aed",
  slides: [slide01, slide02],
};
