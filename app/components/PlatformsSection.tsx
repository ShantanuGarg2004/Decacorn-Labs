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
      className="relative bg-black text-white py-28 px-6 overflow-hidden"
    >
      {/* Platform Showcase Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Diagonal Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating Platform Cards Effect */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          {[...Array(8)].map((_, i) => (
            <motion.rect
              key={i}
              x={`${10 + i * 12}%`}
              y={`${20 + (i % 3) * 25}%`}
              width="80"
              height="60"
              rx="8"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                y: [20, 0, -20],
              }}
              transition={{
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>

        {/* Gradient Spotlights */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Particle System */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.7) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
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
    </section>
  );
}