import type { Tab } from "@/app/advanced-slider/content/types";
import slide01 from "./steps/01-lender-instructions";
import slide02 from "./steps/02-standardised-packs";

export const solicitorInstructionTab: Tab = {
  id: "solicitor-instruction",
  label: "Instruction & conflicts",
  color: "#0f766e",
  slides: [slide01, slide02],
};
