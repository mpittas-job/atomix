import type { NavCategory, Section } from "./types";
import { borrowerJourneySection } from "./sections/borrower-journey/section";
import { documentExecutionSection } from "./sections/document-execution/section";
import { loanDrawdownSection } from "./sections/loan-drawdown/section";
import { loanManagementSection } from "./sections/loan-management/section";
import { referralJourneySection } from "./sections/referral-journey/section";
import { solicitorJourneySection } from "./sections/solicitor-journey/section";

export const NAV_CATEGORIES: NavCategory[] = [
  {
    id: "origination",
    label: "Origination",
    sections: [
      borrowerJourneySection,
      solicitorJourneySection,
      referralJourneySection,
      documentExecutionSection,
      loanDrawdownSection,
    ],
  },
  {
    id: "dashboards",
    label: "Dashboards",
    sections: [loanManagementSection],
  },
];

export const SECTIONS: Section[] = NAV_CATEGORIES.flatMap((c) => c.sections);
