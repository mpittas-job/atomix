import type { Tab } from "@/app/advanced-slider/content/types";
import BorrowerExecutesLoanDocumentSlide01 from "./steps/01-slide";
import BorrowerExecutesLoanDocumentSlide02 from "./steps/02-slide";
import BorrowerExecutesLoanDocumentSlide03 from "./steps/03-slide";

export const borrowerExecutesLoanDocumentTab: Tab = {
  id: "borrower-executes-loan-document",
  label: "Borrower Executes the Loan Document",
  color: "#9a3412",
  slides: [
    {
      id: "de-borrower-executes-1",
      content: <BorrowerExecutesLoanDocumentSlide01 />,
    },
    {
      id: "de-borrower-executes-2",
      content: <BorrowerExecutesLoanDocumentSlide02 />,
    },
    {
      id: "de-borrower-executes-3",
      content: <BorrowerExecutesLoanDocumentSlide03 />,
    },
  ],
};
