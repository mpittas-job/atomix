import type { Tab } from "@/app/advanced-slider/content/types";
import SignatureRequestSlide01 from "./steps/01-slide";

export const signatureRequestTab: Tab = {
  id: "signature-request",
  label: "Signature Request",
  color: "#c2410c",
  slides: [{ id: "de-signature-request-1", content: <SignatureRequestSlide01 /> }],
};
