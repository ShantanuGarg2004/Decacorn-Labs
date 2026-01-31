"use client";

import { motion } from "framer-motion";
import SectionParticles from "./SectionParticles";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative w-screen h-screen bg-black overflow-hidden pt-20"
    >
      {/* 3D Background (Spline) */}
      <motion.iframe
        src="https://my.spline.design/blackanimatedaiblobs-9FG96na3QZKIvfoZqNxdpr12/"
        className="absolute left-1/2 top-[55%] w-[120%] h-[120%] 
                   -translate-x-1/2 -translate-y-1/2 border-0 z-0"
        allow="autoplay; fullscreen"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Section-level particles (NOW ABOVE SPLINE) */}
      <SectionParticles
        density={65}
        size={1.6}
        opacity={0.65}
      />

      {/* Cinematic Overlay (NOW ABOVE PARTICLES) */}
      <div className="absolute inset-0 z-[2] 
                      bg-gradient-to-b 
                      from-black/55 via-black/20 to-black/65" />

      {/* Hero Content */}
      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-white text-center px-6">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-semibold tracking-tight"
        >
          Decacorn Labs
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9, ease: "easeOut" }}
          className="mt-4 text-base md:text-lg text-white/65 max-w-2xl leading-relaxed"
        >
          We design and build AI-powered platforms, digital products, and intelligent systems for the future.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          className="mt-8 flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-sm hover:bg-white/20 transition"
          >
            Explore
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
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
