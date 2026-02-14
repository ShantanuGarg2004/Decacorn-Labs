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
    name: "Glip.io",
    tagline: "AI-powered execution engine for modern teams.",
    summary:
      "An AI execution engine that converts raw project inputs into structured roadmaps, tasks, and delivery workflows.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
  },
];

// ─── Circuit-board trace paths (SVG polyline points, percentage-based) ───
const TRACES = [
  // Top-left cluster
  "5,8 18,8 18,18 32,18 32,28",
  "5,14 12,14 12,22 22,22 22,35 38,35",
  "8,30 20,30 20,42 30,42 30,52",
  // Right-side cluster
  "95,10 82,10 82,20 70,20 70,32",
  "92,22 78,22 78,34 65,34 65,45",
  "88,40 75,40 75,50 60,50",
  // Bottom traces
  "10,78 22,78 22,88 35,88 35,95",
  "90,75 78,75 78,85 68,85 68,92",
  "40,90 52,90 52,82 62,82",
  // Mid cross
  "35,55 48,55 48,45 58,45 58,62",
  "20,65 33,65 33,72 45,72",
  "75,60 62,60 62,70 50,70 50,78",
];

// IC pad positions (x%, y%) – the square landing pads at trace ends
const IC_PADS = [
  { x: 32, y: 28 }, { x: 38, y: 35 }, { x: 30, y: 52 },
  { x: 70, y: 32 }, { x: 65, y: 45 }, { x: 60, y: 50 },
  { x: 35, y: 95 }, { x: 68, y: 92 }, { x: 62, y: 82 },
  { x: 58, y: 62 }, { x: 45, y: 72 }, { x: 50, y: 78 },
];

export default function PlatformsSection() {
  return (
    <section
      id="platforms"
      className="relative bg-black text-white py-28 px-6 overflow-hidden"
    >
      {/* ─── CIRCUIT-BOARD / TECH-LAUNCH BACKGROUND ─── */}
      <div className="absolute inset-0 overflow-hidden">

        {/* 1. Fine diagonal cross-hatch – gives a PCB feel */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255,255,255,0.045) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255,255,255,0.045) 1px, transparent 1px)
            `,
            backgroundSize: "52px 52px",
            opacity: 0.7,
          }}
        />

        {/* 2. SVG: Circuit traces + IC pads + animated signal dots */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="traceGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(99,102,241,0)" />
              <stop offset="40%" stopColor="rgba(99,102,241,0.55)" />
              <stop offset="60%" stopColor="rgba(168,85,247,0.55)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0)" />
            </linearGradient>
            <filter id="padGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="signalGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Trace polylines – staggered fade-in */}
          {TRACES.map((d, i) => {
            // Convert "x1,y1 x2,y2 …" into SVG-friendly percentage points
            const points = d.split(" ").map((pair) => {
              const [x, y] = pair.split(",");
              return `${x}% ${y}%`;
            }).join(", ");
            return (
              <motion.polyline
                key={`tr-${i}`}
                points={points}
                fill="none"
                stroke="url(#traceGlow)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0.45] }}
                transition={{
                  duration: 2.2,
                  delay: 0.2 + i * 0.13,
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* IC Pads – glowing squares */}
          {IC_PADS.map((pad, i) => (
            <motion.rect
              key={`pad-${i}`}
              x={`calc(${pad.x}% - 5px)`}
              y={`calc(${pad.y}% - 5px)`}
              width="10"
              height="10"
              rx="2"
              fill={i % 2 === 0 ? "rgba(99,102,241,0.7)" : "rgba(168,85,247,0.7)"}
              filter="url(#padGlow)"
              style={{ transformOrigin: `${pad.x}% ${pad.y}%` }}
              animate={{
                opacity: [0.4, 0.9, 0.4],
                scale: [0.85, 1.1, 0.85],
              }}
              transition={{
                duration: 2.6,
                delay: (i * 0.22) % 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Signal pulse dots – travel along select traces */}
          {[0, 3, 6, 9].map((traceIdx) => {
            const coords = TRACES[traceIdx].split(" ").map((pair) => {
              const [x, y] = pair.split(",");
              return { x: Number(x), y: Number(y) };
            });
            const start = coords[0];
            const end = coords[coords.length - 1];
            return (
              <motion.circle
                key={`sig-${traceIdx}`}
                r="3"
                fill="rgba(255,255,255,0.85)"
                filter="url(#signalGlow)"
                animate={{
                  cx: [`${start.x}%`, `${end.x}%`],
                  cy: [`${start.y}%`, `${end.y}%`],
                  opacity: [0.9, 0.9, 0],
                }}
                transition={{
                  duration: 2.8,
                  delay: traceIdx * 0.55,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>

        {/* 3. Dual platform orbs – indigo (Alumna) + magenta (Krivisio) */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "15%", left: "12%",
            width: "420px", height: "420px",
            background: "radial-gradient(circle, rgba(99,102,241,0.42) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.14, 1], x: [0, 22, 0], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            bottom: "10%", right: "8%",
            width: "380px", height: "380px",
            background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
            filter: "blur(75px)",
          }}
          animate={{ scale: [1, 1.16, 1], y: [0, -20, 0], opacity: [0.55, 0.8, 0.55] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Subtle centre accent */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "40%", left: "42%",
            width: "280px", height: "280px",
            background: "radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 4. Floating micro-particles */}
        {[...Array(24)].map((_, i) => {
          const colors = ["rgba(99,102,241,0.7)", "rgba(168,85,247,0.65)", "rgba(56,189,248,0.6)"];
          return (
            <motion.div
              key={`pfp-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${1.2 + (i % 3) * 0.8}px`,
                height: `${1.2 + (i % 3) * 0.8}px`,
                left: `${(i * 43 + 2) % 100}%`,
                top: `${(i * 37 + 5) % 100}%`,
                background: colors[i % 3],
              }}
              animate={{
                y: [0, -(22 + (i % 22)), 0],
                x: [0, (i % 2 === 0 ? 10 : -10), 0],
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: (i * 0.21) % 3,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* 5. Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, transparent 18%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      {/* ─── CONTENT (unchanged) ─── */}
      <div className="relative z-10 max-w-7xl mx-auto">
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
                  <CardItem
                    translateZ={40}
                    className="text-2xl font-semibold text-white"
                  >
                    {platform.name}
                  </CardItem>

                  <CardItem
                    as="p"
                    translateZ={50}
                    className="text-white/60 text-sm mt-2"
                  >
                    {platform.tagline}
                  </CardItem>

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

                  <CardItem
                    as="p"
                    translateZ={30}
                    className="text-white/70 text-sm leading-relaxed mt-5"
                  >
                    {platform.summary}
                  </CardItem>

                  {/* <div className="flex justify-between items-center mt-8">
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
                  </div> */}
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>

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