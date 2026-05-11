import type { Tab } from "@/app/advanced-slider/content/types";
import slide01 from "./steps/01-assemble-signing-sets";
import slide02 from "./steps/02-version-control";

export const executionPrepareTab: Tab = {
  id: "execution-prepare",
  label: "Package preparation",
  color: "#c2410c",
  slides: [slide01, slide02],
};
