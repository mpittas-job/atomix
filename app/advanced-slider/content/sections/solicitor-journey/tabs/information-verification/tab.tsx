import type { Tab } from "@/app/advanced-slider/content/types";
import InformationVerificationSlide01 from "./steps/01-slide";

export const informationVerificationTab: Tab = {
  id: "information-verification",
  label: "Information Verification",
  color: "#0f766e",
  slides: [
    {
      id: "sj-information-verification-1",
      content: <InformationVerificationSlide01 />,
    },
  ],
};
