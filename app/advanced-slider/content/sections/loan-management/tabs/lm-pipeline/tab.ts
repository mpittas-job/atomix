import type { Tab } from "@/app/advanced-slider/content/types";
import slide01 from "./steps/01-portfolio-pipeline";
import slide02 from "./steps/02-drill-to-facilities";

export const lmPipelineTab: Tab = {
  id: "lm-pipeline",
  label: "Pipeline & tasks",
  color: "#475569",
  slides: [slide01, slide02],
};
