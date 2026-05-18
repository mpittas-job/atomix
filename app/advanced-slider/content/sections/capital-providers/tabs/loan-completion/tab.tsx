import type { Tab } from "@/app/advanced-slider/content/types";
import LoanCompletionSlide01 from "./steps/01-slide";

export const loanCompletionTab: Tab = {
  id: "loan-completion",
  label: "Loan Completion",
  color: "#059669",
  slides: [{ id: "cp-loan-completion-1", content: <LoanCompletionSlide01 /> }],
};
