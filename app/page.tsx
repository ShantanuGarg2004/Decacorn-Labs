"use client";

import { useEffect } from "react";

import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import ExpandableServicesSection from "./components/ExpandableServicesSection";
import PlatformsSection from "./components/PlatformsSection";
import VisionSection from "./components/VisionSection";
import DecacornEcosystemSection from "./components/DecacornEcosystemSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          const yOffset = -80; // navbar height offset
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
    <main className="bg-black text-white">
      <Navbar />
      <HeroSection />
      <ExpandableServicesSection />
      <PlatformsSection />
      <VisionSection />
      <DecacornEcosystemSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
