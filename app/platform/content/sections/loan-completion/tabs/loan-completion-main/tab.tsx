import type { Tab } from "@/app/platform/content/types";
import LoanCompletionMainSlide01 from "./steps/01-slide";

export const loanCompletionMainTab: Tab = {
  id: "loan-completion-main",
  label: "Loan Completion",
  color: "#059669",
  slides: [{ id: "lc-main-1", content: <LoanCompletionMainSlide01 /> }],
};
