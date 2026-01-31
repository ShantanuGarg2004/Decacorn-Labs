"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

const platforms = [
  {
    name: "Alumna.ai",
    tagline: "AI-native education intelligence platform.",
    summary:
      "An intelligent digital infrastructure transforming higher education through culturally aligned and ethically grounded AI systems.",
    details: `
• AI-driven admission workflows and decision systems
• Student sentiment and behavioral intelligence using affective computing
• Personalized academic journeys powered by large language models
• Institutional analytics and data intelligence
• End-to-end digitization of academic processes

Alumna enables hyper-personalization, intelligent decision-making, and adaptive educational systems that evolve with user needs.

It represents Decacorn Labs’ vision of AI as a foundational layer for the future of education.
    `,
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Krivisio.io",
    tagline: "AI-powered execution engine for modern teams.",
    summary:
      "An AI execution engine that converts raw project inputs into structured roadmaps, tasks, and delivery workflows.",
    details: `
• Automatic roadmap generation from unstructured inputs
• Intelligent task decomposition and prioritization
• AI-assisted project planning and orchestration
• Code-level execution workflows
• Productivity intelligence for teams, agencies, and freelancers

Krivisio acts as an AI copilot for execution — not just planning.

It reflects Decacorn Labs’ vision of AI as an operational layer that accelerates digital product delivery.
    `,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function PlatformsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="platforms" className="relative bg-black text-white py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Our Platforms
          </h2>
          <p className="mt-4 text-white/60 max-w-3xl mx-auto">
            AI-native platforms designed to redefine how intelligence, workflows,
            and digital systems interact.
          </p>
        </motion.div>

        {/* Platform Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-14">
          {platforms.map((platform, index) => {
            const isOpen = expandedIndex === index;

            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <CardContainer className="w-full">
                  <CardBody
                    className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-full flex flex-col transition-all duration-500 ease-out
                    ${isOpen ? "h-auto" : "h-[470px]"}`}
                  >

                    {/* TOP CONTENT */}
                    <div>
                      <CardItem translateZ={40} className="text-2xl font-semibold text-white">
                        {platform.name}
                      </CardItem>

                      <CardItem translateZ={50} as="p" className="text-white/60 text-sm mt-2">
                        {platform.tagline}
                      </CardItem>

                      <CardItem translateZ={90} className="w-full mt-5">
                        <img
                          src={platform.image}
                          alt={platform.name}
                          className="h-40 w-full object-cover rounded-xl"
                        />
                      </CardItem>

                      {/* Summary (fixed height for equal cards) */}
                      <div className="min-h-[72px] mt-4">
                        <CardItem translateZ={30} as="p" className="text-white/70 text-sm leading-relaxed">
                          {platform.summary}
                        </CardItem>
                      </div>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="mt-3"
                          >
                            <p className="text-white/60 text-sm whitespace-pre-line leading-relaxed">
                              {platform.details}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* BOTTOM ACTIONS */}
                    <div className="flex justify-between items-center mt-6">
                      <CardItem
                        translateZ={20}
                        as="button"
                        onClick={() => toggleCard(index)}
                        className="text-sm text-white/70 hover:text-white transition"
                      >
                        {isOpen ? "Show less ↑" : "Show more →"}
                      </CardItem>

                      <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-gray-200 transition"
                      >
                        Explore
                      </CardItem>
                    </div>

                  </CardBody>
                </CardContainer>
              </motion.div>
            );
          })}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center text-white/50 text-sm"
        >
          More AI-native platforms are a work in progress.
        </motion.div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black"></div>
    </section>
  );
}
