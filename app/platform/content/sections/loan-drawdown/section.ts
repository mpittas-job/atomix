import type { Section } from "@/app/platform/content/types";
import { drawdownRequestTab } from "./tabs/drawdown-request/tab";
import { drawdownStatusTab } from "./tabs/drawdown-status/tab";
import { fundsReleaseTab } from "./tabs/funds-release/tab";
import { preDrawdownConditionsTab } from "./tabs/pre-drawdown-conditions/tab";

export const loanDrawdownSection: Section = {
  id: "loan-drawdown",
  navLabel: "Loan Drawdown",
  title: "Loan Drawdown",
  tabs: [
    preDrawdownConditionsTab,
    drawdownRequestTab,
    drawdownStatusTab,
    fundsReleaseTab,
  ],
};
