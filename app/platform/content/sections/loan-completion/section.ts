import type { Section } from "@/app/platform/content/types";
import { loanCompletionMainTab } from "./tabs/loan-completion-main/tab";

export const loanCompletionSection: Section = {
  id: "loan-completion",
  navLabel: "Loan Completion",
  title: "Loan Completion",
  tabs: [loanCompletionMainTab],
};
