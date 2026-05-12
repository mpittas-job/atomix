import type { Section } from "@/app/advanced-slider/content/types";
import { borrowerExecutesLoanDocumentTab } from "./tabs/borrower-executes-loan-document/tab";
import { signatureRequestTab } from "./tabs/signature-request/tab";

export const documentExecutionSection: Section = {
  id: "document-execution",
  navLabel: "Document Execution",
  title: "Document Execution",
  tabs: [signatureRequestTab, borrowerExecutesLoanDocumentTab],
};
