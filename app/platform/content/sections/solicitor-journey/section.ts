import type { Section } from "@/app/platform/content/types";
import { acceptInvitationTab } from "./tabs/accept-invitation/tab";
import { solicitorTasksTab } from "./tabs/solicitor-tasks/tab";
import { documentsTab } from "./tabs/documents/tab";
import { informationVerificationTab } from "./tabs/information-verification/tab";
import { resolveConflictsTab } from "./tabs/resolve-conflicts/tab";
import { borrowerModificationsTab } from "./tabs/borrower-modifications/tab";

export const solicitorJourneySection: Section = {
  id: "solicitor-journey",
  navLabel: "Solicitor Journey",
  title: "Solicitor Journey",
  tabs: [
    acceptInvitationTab,
    solicitorTasksTab,
    documentsTab,
    informationVerificationTab,
    resolveConflictsTab,
    borrowerModificationsTab,
  ],
};
