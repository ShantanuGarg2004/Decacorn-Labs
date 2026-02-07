"use client";

import Navbar from "../components/navbar";
import MethodologySection from "../components/MethodologySection";

export default function MethodologyPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar onGetStarted={() => {}} />
      <MethodologySection />
    </main>
  );
}
