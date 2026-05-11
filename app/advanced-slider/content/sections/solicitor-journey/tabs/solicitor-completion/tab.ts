import type { Tab } from "@/app/advanced-slider/content/types";
import slide01 from "./steps/01-completion-flow";
import slide02 from "./steps/02-post-close-reporting";

export const solicitorCompletionTab: Tab = {
  id: "solicitor-completion",
  label: "Completion & reporting",
  color: "#115e59",
  slides: [slide01, slide02],
};
