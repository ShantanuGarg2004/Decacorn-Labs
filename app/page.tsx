"use client";

import { useEffect, useState } from "react";

import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/services/ServicesSection";
import PlatformsSection from "./components/PlatformsSection";
import VisionSection from "./components/VisionSection";
import DecacornEcosystemSection from "./components/DecacornEcosystemSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import GetStartedModal from "./components/GetStartedModal";

export default function Home() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          const yOffset = -80; // navbar offset
          const y =
            el.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;

          window.scrollTo({ top: y, behavior: "smooth" });
        }, 200);
      }
    }
  }, []);

  return (
    <>
      <main className="bg-black text-white">
        <Navbar onGetStarted={() => setOpen(true)} />
        <HeroSection onGetStarted={() => setOpen(true)} />

        {/* ✅ NEW AI MATRIX SERVICES SECTION */}
        <ServicesSection />

        <PlatformsSection />
        <VisionSection />
        <DecacornEcosystemSection />
        <ContactSection />
        <Footer />
      </main>

      {/* Modal must live outside main */}
      <GetStartedModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
