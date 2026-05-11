import type { Section } from "@/app/advanced-slider/content/types";
import { executionPrepareTab } from "./tabs/execution-prepare/tab";
import { executionSignTab } from "./tabs/execution-sign/tab";
import { executionVaultTab } from "./tabs/execution-vault/tab";

export const documentExecutionSection: Section = {
  id: "document-execution",
  navLabel: "Document Execution",
  title: "Document Execution",
  tabs: [executionPrepareTab, executionSignTab, executionVaultTab],
};
