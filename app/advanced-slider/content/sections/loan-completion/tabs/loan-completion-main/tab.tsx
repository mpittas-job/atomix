import type { Tab } from "@/app/advanced-slider/content/types";
import LoanCompletionMainSlide01 from "./steps/01-slide";

export const loanCompletionMainTab: Tab = {
  id: "loan-completion-main",
  label: "loan-completion-main",
  color: "#059669",
  slides: [{ id: "lc-main-1", content: <LoanCompletionMainSlide01 /> }],
};
