import type { Tab } from "@/app/advanced-slider/content/types";
import slide01 from "./steps/01-searches-milestones";
import slide02 from "./steps/02-early-exceptions";

export const solicitorTitleTab: Tab = {
  id: "solicitor-title",
  label: "Title & searches",
  color: "#0d9488",
  slides: [slide01, slide02],
};
