import type { Section } from "@/app/advanced-slider/content/types";
import { solicitorCompletionTab } from "./tabs/solicitor-completion/tab";
import { solicitorInstructionTab } from "./tabs/solicitor-instruction/tab";
import { solicitorTitleTab } from "./tabs/solicitor-title/tab";

export const solicitorJourneySection: Section = {
  id: "solicitor-journey",
  navLabel: "Solicitor Journey",
  title: "Solicitor Journey",
  tabs: [solicitorInstructionTab, solicitorTitleTab, solicitorCompletionTab],
};
