import type { Section } from "@/app/platform/content/types";
import { borrowerViewTab } from "./tabs/borrower-view/tab";
import { capitalProviderViewTab } from "./tabs/capital-provider-view/tab";
import { lenderViewTab } from "./tabs/lender-view/tab";
import { solicitorViewTab } from "./tabs/solicitor-view/tab";

export const loanManagementSection: Section = {
  id: "loan-management",
  navLabel: "Loan Management",
  title: "Loan Management",
  tabs: [
    borrowerViewTab,
    lenderViewTab,
    capitalProviderViewTab,
    solicitorViewTab,
  ],
};
