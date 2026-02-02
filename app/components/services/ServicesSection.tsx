"use client";

import { useState } from "react";
import NeuralMatrix from "./NeuralMatrix";
import ServicePanel from "./ServicePanel";
import { ServiceNode } from "./serviceMap";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const [activeNode, setActiveNode] = useState<ServiceNode | null>(null);

  return (
    <section id="services" className="bg-black text-white py-32 min-h-screen flex items-center">
      <div className="max-w-[1600px] mx-auto px-8 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-semibold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            How intelligence flows through our systems
          </motion.h2>
          <motion.p 
            className="mt-4 text-white/60 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            From raw inputs to real-world execution — powered by AI at the core.
          </motion.p>
        </div>

        {/* Main Content Area - Adaptive Layout */}
        <motion.div 
          className="relative flex items-center justify-center"
          animate={{
            gap: activeNode ? "48px" : "0px",
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Neural Matrix - Scales down when node is active */}
          <div className="flex-shrink-0">
            <NeuralMatrix
              activeNode={activeNode}
              setActiveNode={setActiveNode}
            />
          </div>

          {/* Service Panel - Slides in when node is active */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ 
              opacity: activeNode ? 1 : 0,
              width: activeNode ? "auto" : 0,
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-shrink-0 overflow-hidden"
          >
            <ServicePanel node={activeNode} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}