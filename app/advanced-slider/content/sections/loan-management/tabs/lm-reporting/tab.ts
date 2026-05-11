import type { Tab } from "@/app/advanced-slider/content/types";
import slide01 from "./steps/01-scheduled-packs";
import slide02 from "./steps/02-api-bulk-export";

export const lmReportingTab: Tab = {
  id: "lm-reporting",
  label: "Reporting & exports",
  color: "#1e293b",
  slides: [slide01, slide02],
};
