"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out
      ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

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

export default function VisionSection() {
  return (
    <section
      id="vision"
      className="relative w-full py-28 border-t border-neutral-800 overflow-hidden bg-black"
    >
      {/* ── CIRCUIT-BOARD BACKGROUND ── */}
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
            <linearGradient id="traceGlowVision" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(99,102,241,0)" />
              <stop offset="40%" stopColor="rgba(99,102,241,0.55)" />
              <stop offset="60%" stopColor="rgba(168,85,247,0.55)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0)" />
            </linearGradient>
            <filter id="padGlowVision" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="signalGlowVision" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Trace polylines – staggered fade-in */}
          {TRACES.map((d, i) => {
            const points = d.split(" ").map((pair) => {
              const [x, y] = pair.split(",");
              return `${x}% ${y}%`;
            }).join(", ");
            return (
              <motion.polyline
                key={`tr-${i}`}
                points={points}
                fill="none"
                stroke="url(#traceGlowVision)"
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
              filter="url(#padGlowVision)"
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
                filter="url(#signalGlowVision)"
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

        {/* 3. Dual orbs – indigo + magenta */}
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

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-semibold text-white max-w-3xl">
            Building Intelligence, Not Just Software
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-6 text-neutral-400 max-w-2xl text-lg leading-relaxed">
            At Decacorn Labs, our vision is to transform how humans and systems
            execute work — by replacing fragmented processes with intelligent,
            adaptive, and autonomous execution frameworks.
          </p>
        </Reveal>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <Reveal delay={200}>
            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300">
              <h3 className="text-white font-medium text-lg">
                From Tools to Intelligence
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                We envision a future where software is no longer passive, but
                actively understands goals, context, and constraints to guide
                execution autonomously.
              </p>
            </div>
          </Reveal>

          <Reveal delay={350}>
            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300">
              <h3 className="text-white font-medium text-lg">
                Execution as a System
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                Decacorn aims to redefine execution as a structured intelligence layer —
                where decisions, workflows, and outcomes are orchestrated by AI-driven systems.
              </p>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm hover:-translate-y-1 hover:border-neutral-600 transition-all duration-300">
              <h3 className="text-white font-medium text-lg">
                Human-AI Collaboration
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                Our long-term vision is to amplify human decision-making by using AI systems that learn, adapt over time, and support better, faster, and more informed choices.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={650}>
          <div className="mt-24 p-8 rounded-xl border border-neutral-800 bg-black/40 text-center backdrop-blur-sm">
            <p className="text-xl md:text-2xl font-medium text-white">
              "Decacorn is building the operating system for execution."
            </p>
            <p className="mt-3 text-neutral-500 text-sm">
              Not a product. Not a platform. A new paradigm.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}