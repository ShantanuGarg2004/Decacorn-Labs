"use client";

import { motion } from "framer-motion";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/3d-card";

const platforms = [
  {
    name: "Alumna.ai",
    tagline: "AI-native education intelligence platform.",
    summary:
      "An intelligent digital infrastructure transforming higher education through culturally aligned and ethically grounded AI systems.",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Krivisio.io",
    tagline: "AI-powered execution engine for modern teams.",
    summary:
      "An AI execution engine that converts raw project inputs into structured roadmaps, tasks, and delivery workflows.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function PlatformsSection() {
  return (
    <section
      id="platforms"
      className="relative bg-black text-white py-28 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-120px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Our Platforms
          </h2>
          <p className="mt-4 text-white/60 max-w-3xl mx-auto">
            AI-native platforms designed to redefine how intelligence,
            workflows, and digital systems interact.
          </p>
        </motion.div>

        {/* PLATFORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-3">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ scale: 0.92, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              viewport={{ once: true, margin: "-120px" }}
            >
              <CardContainer containerClassName="py-0">
                <CardBody
                  className="
                    bg-black
                    border border-white/10
                    rounded-2xl
                    p-6
                    w-full
                    sm:w-[30rem]
                    h-auto
                  "
                >
                  {/* TITLE */}
                  <CardItem
                    translateZ={40}
                    className="text-2xl font-semibold text-white"
                  >
                    {platform.name}
                  </CardItem>

                  {/* TAGLINE */}
                  <CardItem
                    as="p"
                    translateZ={50}
                    className="text-white/60 text-sm mt-2"
                  >
                    {platform.tagline}
                  </CardItem>

                  {/* IMAGE */}
                  <CardItem
                    translateZ={90}
                    className="w-full mt-5"
                  >
                    <img
                      src={platform.image}
                      alt={platform.name}
                      className="
                        h-44
                        w-full
                        object-cover
                        rounded-xl
                        group-hover/card:shadow-xl
                      "
                    />
                  </CardItem>

                  {/* SUMMARY */}
                  <CardItem
                    as="p"
                    translateZ={30}
                    className="text-white/70 text-sm leading-relaxed mt-5"
                  >
                    {platform.summary}
                  </CardItem>

                  {/* ACTIONS */}
                  <div className="flex justify-between items-center mt-8">
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="text-sm text-white/60 hover:text-white transition"
                    >
                      Show more →
                    </CardItem>

                    <CardItem
                      translateZ={20}
                      as="button"
                      className="
                        px-4 py-2
                        rounded-lg
                        bg-white
                        text-black
                        text-xs
                        font-medium
                        hover:bg-gray-200
                        transition
                      "
                    >
                      Explore
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>

        {/* FOOTNOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center text-white/50 text-sm"
        >
          More AI-native platforms are currently in development.
        </motion.div>
      </div>

      {/* BACKGROUND FADE */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </section>
  );
}
