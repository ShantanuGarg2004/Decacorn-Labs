"use client";

import { useState } from "react";
import NeuralMatrix from "./NeuralMatrix";
import ServicePanel from "./ServicePanel";
import { ServiceNode } from "./serviceMap";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const [activeNode, setActiveNode] = useState<ServiceNode | null>(null);

  return (
    <section id="services" className="bg-black text-white py-20 md:py-32 min-h-screen flex items-center">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-semibold px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            How intelligence flows through our systems
          </motion.h2>
          <motion.p 
            className="mt-3 md:mt-4 text-white/60 max-w-3xl mx-auto px-4 text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            From raw inputs to real-world execution — powered by AI at the core.
          </motion.p>
        </div>

        {/* Main Content Area - Responsive Layout */}
        <motion.div 
          className="relative flex flex-col md:flex-row items-center justify-center"
          animate={{
            gap: activeNode ? "32px" : "0px",
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Neural Matrix - Always full width on mobile, scales on desktop */}
          <div className="flex-shrink-0 w-full md:w-auto">
            <NeuralMatrix
              activeNode={activeNode}
              setActiveNode={setActiveNode}
            />
          </div>

          {/* Service Panel - Below network on mobile, side-by-side on desktop */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: activeNode ? 1 : 0,
              height: activeNode ? "auto" : 0,
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-shrink-0 overflow-hidden w-full md:w-auto mt-8 md:mt-0"
          >
            <ServicePanel node={activeNode} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}