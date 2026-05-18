import type { Section } from "@/app/advanced-slider/content/types";
import { acceptInvitationTab } from "./tabs/accept-invitation/tab";
import { capitalProviderOnboardingTab } from "./tabs/capital-provider-onboarding/tab";
import { fundingConfirmedTab } from "./tabs/funding-confirmed/tab";
import { fundsAllocationTab } from "./tabs/funds-allocation/tab";
import { loanCompletionTab } from "./tabs/loan-completion/tab";
import { loanManagementDashboardTab } from "./tabs/loan-management-dashboard/tab";
import { receiveInvitationTab } from "./tabs/receive-invitation/tab";
import { transferFundsTab } from "./tabs/transfer-funds/tab";

export const capitalProvidersSection: Section = {
  id: "capital-providers",
  navLabel: "Capital Providers",
  title: "Capital Providers",
  tabs: [
    capitalProviderOnboardingTab,
    receiveInvitationTab,
    acceptInvitationTab,
    transferFundsTab,
    fundingConfirmedTab,
    loanCompletionTab,
    fundsAllocationTab,
    loanManagementDashboardTab,
  ],
};
