import type { Tab } from "@/app/advanced-slider/content/types";
import AcceptInvitationSlide01 from "./steps/01-slide";
import AcceptInvitationSlide03 from "./steps/03-slide";

export const acceptInvitationTab: Tab = {
  id: "accept-invitation",
  label: "Accept Invitation",
  color: "#0f766e",
  slides: [
    { id: "sj-accept-invitation-1", content: <AcceptInvitationSlide01 /> },
    { id: "sj-accept-invitation-3", content: <AcceptInvitationSlide03 /> },
  ],
};
