"use client";

import { useEffect, useState } from "react";
import DesktopTestPyramidWrapper from "@/main/TestPyramidWrapper";
import MobileTestPyramidWrapper from "@/mobile/pyramid/TestPyramidWrapper";

export default function TestPyramidSection() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  if (isDesktop === null) return null;

  return isDesktop ? (
    <DesktopTestPyramidWrapper />
  ) : (
    <MobileTestPyramidWrapper />
  );
}
