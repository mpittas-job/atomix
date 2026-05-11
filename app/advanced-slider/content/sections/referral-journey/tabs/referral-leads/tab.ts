import type { Tab } from "@/app/advanced-slider/content/types";
import slide01 from "./steps/01-lead-submission";
import slide02 from "./steps/02-decline-reasons";

export const referralLeadsTab: Tab = {
  id: "referral-leads",
  label: "Lead submission & status",
  color: "#6d28d9",
  slides: [slide01, slide02],
};
