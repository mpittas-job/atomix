import type { Section } from "@/app/advanced-slider/content/types";
import { lmPipelineTab } from "./tabs/lm-pipeline/tab";
import { lmReportingTab } from "./tabs/lm-reporting/tab";
import { lmServicingTab } from "./tabs/lm-servicing/tab";

export const loanManagementSection: Section = {
  id: "loan-management",
  navLabel: "Loan Management",
  title: "Loan Management",
  tabs: [lmPipelineTab, lmServicingTab, lmReportingTab],
};
