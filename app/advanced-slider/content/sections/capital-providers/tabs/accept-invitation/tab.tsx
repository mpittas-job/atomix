import type { Tab } from "@/app/advanced-slider/content/types";
import AcceptInvitationSlide01 from "./steps/01-slide";

export const acceptInvitationTab: Tab = {
  id: "accept-invitation",
  label: "Accept Invitation",
  color: "#14b8a6",
  slides: [
    { id: "cp-accept-invitation-1", content: <AcceptInvitationSlide01 /> },
  ],
};
