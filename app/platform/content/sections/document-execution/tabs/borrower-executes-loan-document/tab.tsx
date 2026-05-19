import type { Tab } from "@/app/platform/content/types";
import BorrowerExecutesLoanDocumentSlide01 from "./steps/01-slide";

export const borrowerExecutesLoanDocumentTab: Tab = {
  id: "borrower-executes-loan-document",
  label: "Borrower Executes the Loan Document",
  color: "#9a3412",
  slides: [
    {
      id: "de-borrower-executes-1",
      content: <BorrowerExecutesLoanDocumentSlide01 />,
    },
  ],
};
