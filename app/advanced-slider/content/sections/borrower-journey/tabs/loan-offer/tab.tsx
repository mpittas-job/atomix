import type { Tab } from "@/app/advanced-slider/content/types";
import LoanOfferSlide01 from "./steps/01-slide";
import LoanOfferSlide02 from "./steps/02-slide";

export const loanOfferTab: Tab = {
  id: "loan-offer",
  label: "Loan Offer",
  color: "#1d4ed8",
  slides: [
    { id: "bj-loan-offer-1", content: <LoanOfferSlide01 /> },
    { id: "bj-loan-offer-2", content: <LoanOfferSlide02 /> },
  ],
};
