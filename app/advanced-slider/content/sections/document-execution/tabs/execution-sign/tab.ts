import type { Tab } from "@/app/advanced-slider/content/types";
import slide01 from "./steps/01-ordered-signing";
import slide02 from "./steps/02-witnessing-rules";

export const executionSignTab: Tab = {
  id: "execution-sign",
  label: "E-sign & witnessing",
  color: "#ea580c",
  slides: [slide01, slide02],
};
