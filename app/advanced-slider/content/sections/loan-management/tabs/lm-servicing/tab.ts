import type { Tab } from "@/app/advanced-slider/content/types";
import slide01 from "./steps/01-covenants-waivers";
import slide02 from "./steps/02-cash-ledger";

export const lmServicingTab: Tab = {
  id: "lm-servicing",
  label: "Servicing & amendments",
  color: "#334155",
  slides: [slide01, slide02],
};
