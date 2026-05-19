import type { Tab } from "@/app/platform/content/types";
import CapitalProviderOnboardingSlide01 from "./steps/01-slide";

export const capitalProviderOnboardingTab: Tab = {
  id: "capital-provider-onboarding",
  label: "Capital Provider Onboarding",
  color: "#0f766e",
  slides: [
    {
      id: "cp-capital-provider-onboarding-1",
      content: <CapitalProviderOnboardingSlide01 />,
    },
  ],
};
