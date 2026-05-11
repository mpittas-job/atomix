import type { Tab } from "@/app/advanced-slider/content/types";
import slide01 from "./steps/01-accruals-payouts";
import slide02 from "./steps/02-performance-views";

export const referralCompensationTab: Tab = {
  id: "referral-compensation",
  label: "Compensation & reporting",
  color: "#5b21b6",
  slides: [slide01, slide02],
};
