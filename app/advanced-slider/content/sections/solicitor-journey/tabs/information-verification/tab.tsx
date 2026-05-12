import type { Tab } from "@/app/advanced-slider/content/types";
import InformationVerificationSlide01 from "./steps/01-slide";
import InformationVerificationSlide02 from "./steps/02-slide";
import InformationVerificationSlide03 from "./steps/03-slide";

export const informationVerificationTab: Tab = {
  id: "information-verification",
  label: "Information Verification",
  color: "#0f766e",
  slides: [
    {
      id: "sj-information-verification-1",
      content: <InformationVerificationSlide01 />,
    },
    {
      id: "sj-information-verification-2",
      content: <InformationVerificationSlide02 />,
    },
    {
      id: "sj-information-verification-3",
      content: <InformationVerificationSlide03 />,
    },
  ],
};
