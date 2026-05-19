import type { Section } from "@/app/platform/content/types";
import { eligibilityTab } from "./tabs/eligibility/tab";
import { fetchAutomationDataTab } from "./tabs/fetch-automation-data/tab";
import { getStartedTab } from "./tabs/get-started/tab";
import { inviteSolicitorTab } from "./tabs/invite-solicitor/tab";
import { loanOfferTab } from "./tabs/loan-offer/tab";
import { offerConfirmedTab } from "./tabs/offer-confirmed/tab";
import { onboardingTab } from "./tabs/onboarding/tab";
import { refineOfferTab } from "./tabs/refine-offer/tab";

export const borrowerJourneySection: Section = {
  id: "borrower-journey",
  navLabel: "Borrower Journey",
  title: "Borrower Journey",
  tabs: [
    getStartedTab,
    loanOfferTab,
    refineOfferTab,
    eligibilityTab,
    onboardingTab,
    fetchAutomationDataTab,
    offerConfirmedTab,
    inviteSolicitorTab,
  ],
};
