"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NeuralMatrix from "./NeuralMatrix";
import ServicePanel from "./ServicePanel";
import { ServiceNode } from "./serviceMap";

/**
 * ServicesSection
 * --------------------------------------------------
 * Orchestrates the full service neural system:
 *
 * - Owns active node state (signal)
 * - Renders the neural matrix (structure)
 * - Projects service intelligence (panel)
 * - Provides atmospheric storytelling
 *
 * This component coordinates — it does not compute.
 */
export default function ServicesSection() {
  const [activeNode, setActiveNode] = useState<ServiceNode | null>(null);

  return (
    <section
      id="services"
      className="relative bg-black text-white py-20 md:py-32 min-h-screen flex items-center overflow-hidden"
    >
      {/* =================================================
          ATMOSPHERIC BACKGROUND (DECORATIVE ONLY)
         ================================================= */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Center Glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
          }}
        />

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
          }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
          }}
          animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Scanline Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.01) 2px, rgba(255, 255, 255, 0.01) 4px)",
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
          }}
        />
      </div>

      {/* =================================================
          CONTENT
         ================================================= */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            How intelligence flows through our systems
          </motion.h2>

          <motion.p
            className="mt-3 md:mt-4 text-white/60 max-w-3xl mx-auto px-4 text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From raw inputs to real-world execution — powered by AI at the core.
          </motion.p>
        </div>

        {/* =================================================
            NEURAL SYSTEM COMPOSITION
           ================================================= */}
        <motion.div
          className="relative flex flex-col md:flex-row items-center justify-center"
          animate={{ gap: activeNode ? "32px" : "0px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Neural Matrix */}
          <div className="flex-shrink-0 w-full md:w-auto">
            <NeuralMatrix
              activeNode={activeNode}
              setActiveNode={setActiveNode}
            />
          </div>

          {/* Service Intelligence Panel */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: activeNode ? 1 : 0,
              height: activeNode ? "auto" : 0,
            }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 overflow-hidden w-full md:w-auto mt-8 md:mt-0"
          >
            <ServicePanel node={activeNode} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
