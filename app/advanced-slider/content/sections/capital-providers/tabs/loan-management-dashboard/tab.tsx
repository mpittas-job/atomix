import type { Tab } from "@/app/advanced-slider/content/types";
import LoanManagementDashboardSlide01 from "./steps/01-slide";

export const loanManagementDashboardTab: Tab = {
  id: "loan-management-dashboard",
  label: "Loan Management Dashboard",
  color: "#065f46",
  slides: [
    {
      id: "cp-loan-management-dashboard-1",
      content: <LoanManagementDashboardSlide01 />,
    },
  ],
};
