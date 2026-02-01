"use client";

import Navbar from "../components/navbar";
import MethodologySection from "../components/MethodologySection";
import Footer from "../components/Footer";

export default function MethodologyPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar onGetStarted={() => {}} />
      <MethodologySection />
      <Footer />
    </main>
  );
}
