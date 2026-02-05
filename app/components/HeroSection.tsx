"use client";

import { motion } from "framer-motion";
import SectionParticles from "./SectionParticles";

type HeroSectionProps = {
  onGetStarted: () => void;
};

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  const handleExplore = () => {
    const nextSection = document.querySelector("#capabilities");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-screen h-screen bg-black overflow-hidden pt-20"
    >
      {/* 3D Background (Spline) */}
      <motion.iframe
        src="https://my.spline.design/blackanimatedaiblobs-9FG96na3QZKIvfoZqNxdpr12/"
        className="absolute left-1/2 top-[55%] w-[120%] h-[120%] 
                   -translate-x-1/2 -translate-y-1/2 border-0 z-0"
        allow="autoplay; fullscreen"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Particles */}
      <SectionParticles density={65} size={1.6} opacity={0.65} />

      {/* Overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/60 via-black/25 to-black/70" />

      {/* Content */}
      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-white text-center px-6">
        
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight"
        >
          AI that executes.
          <br />
          <span className="text-white/85">From intent to impact.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base md:text-lg text-white/65 max-w-2xl leading-relaxed"
        >
          We design, build, and operate AI-native platforms that turn decisions into real-world results.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex gap-4"
        >
          <motion.button
            onClick={handleExplore}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-sm hover:bg-white/20 transition"
          >
            Explore
          </motion.button>

          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-lg bg-white text-black text-sm hover:bg-gray-200 transition"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
