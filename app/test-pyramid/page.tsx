"use client";

import Header from "@/components/header";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import TestPyramidWrapper from "@/main/TestPyramidWrapper";

export default function TestPyramidPage() {
  return (
    <div className="overflow-x-hidden bg-white">
      <Header />

      <section className="min-h-screen" aria-hidden />

      <div className="px-6 py-6">
        <TestPyramidWrapper />
      </div>

      <section className="min-h-screen" aria-hidden />

      <DefCta title="Build the Future of Asset-Backed Lending" />

      <Footer />
    </div>
  );
}
