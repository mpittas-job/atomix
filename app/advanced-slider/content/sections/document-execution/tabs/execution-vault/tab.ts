import type { Tab } from "@/app/advanced-slider/content/types";
import slide01 from "./steps/01-indexed-documents";
import slide02 from "./steps/02-tamper-evident-storage";

export const executionVaultTab: Tab = {
  id: "execution-vault",
  label: "Vault & retrieval",
  color: "#9a3412",
  slides: [slide01, slide02],
};
