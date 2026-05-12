import type { Tab } from "@/app/advanced-slider/content/types";
import SignatureRequestSlide01 from "./steps/01-slide";
import SignatureRequestSlide02 from "./steps/02-slide";
import SignatureRequestSlide03 from "./steps/03-slide";

export const signatureRequestTab: Tab = {
  id: "signature-request",
  label: "Signature Request",
  color: "#c2410c",
  slides: [
    { id: "de-signature-request-1", content: <SignatureRequestSlide01 /> },
    { id: "de-signature-request-2", content: <SignatureRequestSlide02 /> },
    { id: "de-signature-request-3", content: <SignatureRequestSlide03 /> },
  ],
};
