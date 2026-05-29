import type { ReactNode } from "react";
import {
  FaChartPie,
  FaHandHoldingDollar,
  FaScaleUnbalanced,
  FaUserCheck,
} from "react-icons/fa6";

export interface JourneyOverviewItem {
  icon: ReactNode;
  title: string;
  description: string;
}

export const JOURNEY_OVERVIEW_ITEMS: JourneyOverviewItem[] = [
  {
    icon: <FaUserCheck className="h-10 w-10" />,
    title: "Borrower journey",
    description:
      "Application, indicative offer, eligibility, onboarding, and data fetch.",
  },
  {
    icon: <FaScaleUnbalanced className="h-10 w-10" />,
    title: "Lawyer journey",
    description:
      "Panel selection, legal tasks, document execution, information verification, and conflict resolution.",
  },
  {
    icon: <FaHandHoldingDollar className="h-10 w-10" />,
    title: "Lender journey",
    description:
      "Referral review, drawdown approval, fund transfer, and capital provider allocation.",
  },
  {
    icon: <FaChartPie className="h-10 w-10" />,
    title: "Loan management",
    description:
      "Borrower self-serve, lender oversight, capital provider dashboards, lawyer access, and loan exit.",
  },
];
