export type JourneyFlowChartTarget = {
  sectionId: string;
  tabId: string;
};

/** Maps flow-chart hotspot ids (`journey-*`) to platform section/tab. */
export const JOURNEY_FLOW_CHART_TARGETS: Record<string, JourneyFlowChartTarget> = {
  "journey-row-3-stage-1": {
    sectionId: "borrower-journey",
    tabId: "get-started",
  },
  "journey-row-3-stage-2": {
    sectionId: "solicitor-journey",
    tabId: "accept-invitation",
  },
  "journey-row-3-stage-3": {
    sectionId: "referral-journey",
    tabId: "legal-opinion",
  },
  "journey-row-3-stage-4": {
    sectionId: "document-execution",
    tabId: "signature-request",
  },
  "journey-row-3-stage-5": {
    sectionId: "loan-drawdown",
    tabId: "pre-drawdown-conditions",
  },
  "journey-loan-servicing": {
    sectionId: "loan-management",
    tabId: "borrower-view",
  },
  "journey-pipeline": {
    sectionId: "borrower-journey",
    tabId: "get-started",
  },
  "journey-top-pipeline": {
    sectionId: "borrower-journey",
    tabId: "get-started",
  },
  "journey-portfolio-transfer": {
    sectionId: "loan-management",
    tabId: "lender-view",
  },
  "journey-instrument-issuance": {
    sectionId: "capital-providers",
    tabId: "funds-allocation",
  },
  "journey-servicer": {
    sectionId: "loan-management",
    tabId: "lender-view",
  },
  "journey-servicer-chevron": {
    sectionId: "loan-management",
    tabId: "lender-view",
  },
  "journey-fund-source": {
    sectionId: "capital-providers",
    tabId: "receive-invitation",
  },
  "journey-capital-markets-block": {
    sectionId: "capital-providers",
    tabId: "capital-provider-onboarding",
  },
  "journey-right-chevron": {
    sectionId: "capital-providers",
    tabId: "loan-management-dashboard",
  },
  "journey-top-highlights": {
    sectionId: "capital-providers",
    tabId: "funding-confirmed",
  },
  "journey-row-3-connector": {
    sectionId: "loan-completion",
    tabId: "loan-completion-main",
  },
  "journey-mid-connector": {
    sectionId: "loan-management",
    tabId: "capital-provider-view",
  },
  "journey-mid-row": {
    sectionId: "loan-management",
    tabId: "solicitor-view",
  },
};
