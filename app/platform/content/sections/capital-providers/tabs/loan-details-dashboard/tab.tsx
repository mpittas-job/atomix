import type { Tab } from "@/app/platform/content/types";
import LoanDetailsDashboardSlide01 from "./steps/01-slide";

export const loanDetailsDashboardTab: Tab = {
  id: "loan-details-dashboard",
  label: "Loan Details Dashboard",
  color: "#047857",
  slides: [
    {
      id: "cp-loan-details-dashboard-1",
      content: <LoanDetailsDashboardSlide01 />,
    },
  ],
};
